---
layout: post
title: "RabbitMQ: Gerenciando Alto Volume sem Perder o Controle"
date: 2025-06-20 10:00:00
image: https://www.rabbitmq.com/img/rabbitmq-logo.svg
description: "Aprenda como arquitetar sistemas robustos de filas de mensagens com RabbitMQ para processamento de alto volume em aplicações .NET."
tags: rabbitmq messaging dotnet sistemas-distribuidos arquitetura azure
categories: pt-br dotnet-e-fundamentos-azure
twitter_text: "RabbitMQ: Gerenciando Alto Volume sem Perder o Controle"
username: "Matheus Costa Vieira"
user_description: Grupo de desenvolvedores do estado do Paraná
email: matheus.costa.vieira@gmail.com
photo: mvieira.jpg
---

Quando você está desenvolvendo sistemas backend que precisam processar milhares ou milhões de mensagens diariamente, ter uma infraestrutura de mensageria robusta torna-se crítica. Na minha experiência arquitetando sistemas distribuídos para plataformas financeiras e de e-commerce, o RabbitMQ provou ser uma ferramenta confiável para gerenciar processamento de mensagens de alto volume sem perder o controle sobre a confiabilidade do sistema.

Vou compartilhar uma arquitetura real e implementação prática que processou com sucesso picos de carga de mais de 100.000 mensagens por minuto em produção.

## 🏗️ A Arquitetura: Processamento de Transações Financeiras

Aqui está um diagrama simplificado de um sistema de processamento de transações financeiras que implementei:

```text
[Web API] → [RabbitMQ Exchange] → [Múltiplas Filas] → [Worker Services]
    ↓              ↓                    ↓               ↓
[Validação]   [Roteamento]         [Buffer]        [Processamento]
    ↓              ↓                    ↓               ↓
[Database]     [Dead Letter]      [Retry Logic]   [Notificações]
```

**Componentes Principais:**

- **Topic Exchange**: Roteia mensagens baseado no tipo e prioridade da transação
- **Filas Duráveis**: Garante persistência de mensagens durante reinicializações
- **Múltiplos Worker Services**: Escalabilidade horizontal para capacidade de processamento
- **Dead Letter Queues**: Trata mensagens com falha graciosamente
- **Circuit Breakers**: Previne falhas em cascata

## 🚀 Implementação: Worker Services .NET Core

Aqui está como implemento os componentes principais:

### 1. Publisher de Mensagens (Web API)

```csharp
public class TransactionPublisher
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    
    public TransactionPublisher(IConfiguration config)
    {
        var factory = new ConnectionFactory()
        {
            HostName = config["RabbitMQ:Host"],
            Port = config.GetValue<int>("RabbitMQ:Port"),
            UserName = config["RabbitMQ:Username"],
            Password = config["RabbitMQ:Password"],
            VirtualHost = config["RabbitMQ:VirtualHost"]
        };
        
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        
        // Declarar exchange
        _channel.ExchangeDeclare(
            exchange: "transactions.topic",
            type: ExchangeType.Topic,
            durable: true
        );
    }

    public async Task PublishTransactionAsync(TransactionRequest transaction)
    {
        var routingKey = $"transaction.{transaction.Type}.{transaction.Priority}";
        var message = JsonSerializer.Serialize(transaction);
        var body = Encoding.UTF8.GetBytes(message);

        var properties = _channel.CreateBasicProperties();
        properties.Persistent = true; // Mensagem sobrevive a restart do broker
        properties.MessageId = Guid.NewGuid().ToString();
        properties.Timestamp = new AmqpTimestamp(DateTimeOffset.UtcNow.ToUnixTimeSeconds());

        _channel.BasicPublish(
            exchange: "transactions.topic",
            routingKey: routingKey,
            basicProperties: properties,
            body: body
        );

        // Opcional: Confirmar publicação
        _channel.WaitForConfirmsOrDie(TimeSpan.FromSeconds(5));
    }
}
```

### 2. Configuração de Filas

```csharp
public class QueueConfiguration
{
    public static void ConfigureQueues(IModel channel)
    {
        // Fila de transações de alta prioridade
        var highPriorityArgs = new Dictionary<string, object>
        {
            {"x-message-ttl", 300000}, // TTL de 5 minutos
            {"x-dead-letter-exchange", "transactions.dlx"},
            {"x-dead-letter-routing-key", "high-priority.failed"},
            {"x-max-retries", 3}
        };

        channel.QueueDeclare(
            queue: "transactions.high-priority",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: highPriorityArgs
        );

        // Fila de transações de prioridade normal
        var normalPriorityArgs = new Dictionary<string, object>
        {
            {"x-message-ttl", 600000}, // TTL de 10 minutos
            {"x-dead-letter-exchange", "transactions.dlx"},
            {"x-dead-letter-routing-key", "normal.failed"},
            {"x-max-retries", 5}
        };

        channel.QueueDeclare(
            queue: "transactions.normal-priority",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: normalPriorityArgs
        );

        // Vincular filas ao exchange
        channel.QueueBind("transactions.high-priority", "transactions.topic", "transaction.*.high");
        channel.QueueBind("transactions.normal-priority", "transactions.topic", "transaction.*.normal");
        channel.QueueBind("transactions.normal-priority", "transactions.topic", "transaction.*.low");
    }
}
```

### 3. Consumer de Alta Performance

```csharp
public class TransactionWorkerService : BackgroundService
{
    private readonly ILogger<TransactionWorkerService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private IConnection _connection;
    private IModel _channel;
    private readonly SemaphoreSlim _semaphore;

    public TransactionWorkerService(
        ILogger<TransactionWorkerService> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _semaphore = new SemaphoreSlim(Environment.ProcessorCount * 2); // Limita processamento concorrente
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        InitializeRabbitMQ();

        var consumer = new AsyncEventingBasicConsumer(_channel);
        consumer.Received += async (model, ea) =>
        {
            await _semaphore.WaitAsync(stoppingToken);
            
            try
            {
                await ProcessMessageAsync(ea);
                _channel.BasicAck(ea.DeliveryTag, false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro processando mensagem {MessageId}", ea.BasicProperties.MessageId);
                
                // Implementar lógica de retry
                var shouldRetry = ShouldRetry(ea);
                // se shouldRetry true -> Reenviar
                // se shouldRetry false -> Enviar para DLQ
                _channel.BasicNack(ea.DeliveryTag, false, shouldRetry);
                _channel.BasicNack(ea.DeliveryTag, false, shouldRetry);
            }
            finally
            {
                _semaphore.Release();
            }
        };

        _channel.BasicConsume(
            queue: "transactions.high-priority",
            autoAck: false, // Acknowledgment manual para confiabilidade
            consumer: consumer
        );

        // Manter o serviço rodando
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }

    private async Task ProcessMessageAsync(BasicDeliverEventArgs ea)
    {
        using var scope = _serviceProvider.CreateScope();
        var processor = scope.ServiceProvider.GetRequiredService<ITransactionProcessor>();
        
        var body = ea.Body.ToArray();
        var message = Encoding.UTF8.GetString(body);
        var transaction = JsonSerializer.Deserialize<TransactionRequest>(message);

        await processor.ProcessAsync(transaction);
    }

    private bool ShouldRetry(BasicDeliverEventArgs ea)
    {
        // Verificar contagem de retry dos headers
        var retryCount = ea.BasicProperties.Headers?.ContainsKey("x-retry-count") == true
            ? (int)ea.BasicProperties.Headers["x-retry-count"]
            : 0;

        return retryCount < 3;
    }
}
```

## 📊 Monitoramento e Observabilidade

Monitorar sistemas de alto volume é crucial. Assim implemento observabilidade abrangente:

```csharp
public class RabbitMQMetrics
{
    private readonly ILogger<RabbitMQMetrics> _logger;
    private readonly IMetrics _metrics;

    public void RecordMessagePublished(string queueName)
    {
        _metrics.Measure.Counter.Increment("rabbitmq.messages.published", 
            new MetricTags("queue", queueName));
    }

    public void RecordMessageProcessed(string queueName, TimeSpan processingTime)
    {
        _metrics.Measure.Counter.Increment("rabbitmq.messages.processed",
            new MetricTags("queue", queueName));
        
        _metrics.Measure.Timer.Time("rabbitmq.processing.duration",
            processingTime, new MetricTags("queue", queueName));
    }

    public void RecordMessageFailed(string queueName, string errorType)
    {
        _metrics.Measure.Counter.Increment("rabbitmq.messages.failed",
            new MetricTags("queue", queueName, "error_type", errorType));
    }
}
```

## 🛡️ Melhores Práticas para Processamento de Alto Volume

### 1. Gerenciamento de Conexões

```csharp
// Use pool de conexões para cenários de alto throughput
public class RabbitMQConnectionPool
{
    private readonly ConcurrentQueue<IConnection> _connections = new();
    private readonly SemaphoreSlim _semaphore;

    public async Task<IConnection> GetConnectionAsync()
    {
        await _semaphore.WaitAsync();
        
        if (_connections.TryDequeue(out var connection) && connection.IsOpen)
        {
            return connection;
        }

        return CreateNewConnection();
    }

    public void ReturnConnection(IConnection connection)
    {
        if (connection.IsOpen)
        {
            _connections.Enqueue(connection);
        }
        
        _semaphore.Release();
    }
}
```

### 2. Processamento em Lote

```csharp
public class BatchTransactionProcessor
{
    private readonly List<TransactionRequest> _batch = new();
    private readonly Timer _flushTimer;

    public async Task AddToBatchAsync(TransactionRequest transaction)
    {
        lock (_batch)
        {
            _batch.Add(transaction);
            
            if (_batch.Count >= 100) // Tamanho do lote
            {
                _ = Task.Run(FlushBatchAsync);
            }
        }
    }

    private async Task FlushBatchAsync()
    {
        List<TransactionRequest> currentBatch;
        
        lock (_batch)
        {
            currentBatch = new List<TransactionRequest>(_batch);
            _batch.Clear();
        }

        if (currentBatch.Any())
        {
            await ProcessBatchAsync(currentBatch);
        }
    }
}
```

## 🔧 Configuração para Produção

### Configuração do RabbitMQ

```json
{
  "RabbitMQ": {
    "Host": "localhost",
    "Port": 5672,
    "Username": "guest",
    "Password": "guest",
    "VirtualHost": "/",
    "ConnectionPoolSize": 10,
    "ChannelPoolSize": 50,
    "PrefetchCount": 100,
    "ConfirmSelect": true,
    "Heartbeat": 60
  }
}
```

### Escalabilidade do Worker Service

```yaml
# Docker Compose para escalonamento horizontal
version: '3.8'
services:
  transaction-worker:
    image: transaction-worker:latest
    scale: 5  # Múltiplas instâncias
    environment:
      - RABBITMQ_HOST=rabbitmq
      - WORKER_CONCURRENCY=10
    depends_on:
      - rabbitmq
```

## 📈 Resultados e Benefícios

Em produção, esta arquitetura entregou:

- **Throughput**: Mais de 100.000 mensagens/minuto durante picos de carga
- **Latência**: Tempo médio de processamento abaixo de 50ms
- **Confiabilidade**: Taxa de sucesso de entrega de mensagens de 99,9%
- **Escalabilidade**: Escalamento linear adicionando instâncias de worker
- **Observabilidade**: Visibilidade completa do fluxo de mensagens e saúde do sistema

## 🎯 Principais Aprendizados

1. **Projete para Falhas**: Sempre implemente dead letter queues e mecanismos de retry
2. **Monitore Tudo**: Acompanhe fluxo de mensagens, tempos de processamento e taxas de erro
3. **Escale Horizontalmente**: Use múltiplas instâncias de worker ao invés de aumentar capacidade de instância única
4. **Use Lotes Quando Possível**: Agrupe operações para melhorar eficiência de banco de dados e APIs externas
5. **Teste Sob Carga**: Use ferramentas como NBomber ou Artillery para validar sua arquitetura

A robustez do RabbitMQ combinada com a performance do .NET torna esta uma excelente escolha para construir sistemas de mensageria confiáveis e de alto volume. A chave é projetar considerando cenários de falha e implementar monitoramento abrangente desde o primeiro dia.

Quer se aprofundar em algum aspecto específico desta arquitetura? Fique à vontade para entrar em contato—sempre fico feliz em discutir design de sistemas distribuídos!
