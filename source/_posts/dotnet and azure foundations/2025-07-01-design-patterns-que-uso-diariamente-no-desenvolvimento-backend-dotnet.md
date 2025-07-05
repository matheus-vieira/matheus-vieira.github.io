---
layout: post
title: "Design Patterns que Uso Diariamente no Desenvolvimento Backend .NET"
date: 2025-07-01
categories: [dotnet, design-patterns, backend]
tags: [csharp, arquitetura, repository-pattern, strategy-pattern, mediator-pattern]
lang: pt-br
ref: design-patterns-daily-dotnet
author: Matheus Vieira
excerpt: "Explorando três design patterns essenciais que tornam o desenvolvimento backend .NET mais sustentável e escalável: Repository, Strategy e Mediator patterns."
image: /images/posts/design-patterns-dotnet.svg
---

Como desenvolvedor backend .NET, descobri que certos design patterns consistentemente provam seu valor em aplicações do mundo real. Hoje, quero compartilhar três patterns que se tornaram ferramentas essenciais no meu arsenal de desenvolvimento: **Repository**, **Strategy** e **Mediator** patterns.

Estes não são apenas conceitos teóricos—são soluções práticas que implemento diariamente para criar aplicações mais sustentáveis, testáveis e escaláveis.

## 1. Repository Pattern: Simplificando o Acesso aos Dados

O Repository pattern cria uma interface uniforme para acessar dados, independentemente do mecanismo de armazenamento subjacente.

### Por que o Repository Pattern Funciona

- **Testabilidade**: Fácil de mockar para testes unitários
- **Separação de Responsabilidades**: Lógica de negócio fica independente do acesso a dados
- **Flexibilidade**: Trocar entre diferentes fontes de dados sem quebrar a lógica de negócio

### Exemplo de Implementação do Repository

```csharp
public interface IUserRepository
{
    Task<User> GetByIdAsync(int id);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> CreateAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(int id);
}

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetByIdAsync(int id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .ToListAsync();
    }

    // Outros métodos...
}
```

### Benefícios do Repository Pattern

Em um projeto recente, precisamos migrar do SQL Server para CosmosDB. Graças ao Repository pattern, só precisamos implementar uma nova classe repository—zero mudanças na lógica de negócio.

## 2. Strategy Pattern: Algoritmos Intercambiáveis e Flexíveis

O Strategy pattern permite definir uma família de algoritmos, encapsulá-los e torná-los intercambiáveis em tempo de execução.

### Por que o Strategy Pattern se Destaca

- **Princípio Aberto/Fechado**: Adicionar novas estratégias sem modificar código existente
- **Flexibilidade em Runtime**: Escolher algoritmos baseado no contexto
- **Testabilidade**: Testar cada estratégia isoladamente

### Exemplo de Implementação do Strategy

```csharp
public interface IPaymentProcessor
{
    Task<PaymentResult> ProcessAsync(PaymentRequest request);
    bool CanProcess(PaymentMethod method);
}

public class CreditCardProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessAsync(PaymentRequest request)
    {
        // Lógica de processamento de cartão de crédito
        return await ProcessCreditCardAsync(request);
    }

    public bool CanProcess(PaymentMethod method)
        => method == PaymentMethod.CreditCard;
}

public class PixProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessAsync(PaymentRequest request)
    {
        // Lógica de processamento PIX
        return await ProcessPixAsync(request);
    }

    public bool CanProcess(PaymentMethod method)
        => method == PaymentMethod.Pix;
}

public class PaymentService
{
    private readonly IEnumerable<IPaymentProcessor> _processors;

    public PaymentService(IEnumerable<IPaymentProcessor> processors)
    {
        _processors = processors;
    }

    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        var processor = _processors
            .FirstOrDefault(p => p.CanProcess(request.Method));

        if (processor == null)
            throw new NotSupportedException($"Método de pagamento {request.Method} não suportado");

        return await processor.ProcessAsync(request);
    }
}
```

### Benefícios do Strategy Pattern

Quando precisamos adicionar novos métodos de pagamento, simplesmente criamos novas classes processor. O código existente permaneceu intocado, e os testes foram diretos já que cada processor é independente.

## 3. Mediator Pattern: Centralizando a Comunicação Entre Componentes

O Mediator pattern define como um conjunto de objetos interagem entre si, promovendo baixo acoplamento ao prevenir que objetos se refiram uns aos outros explicitamente.

### Por que o Mediator Pattern Funciona

- **Desacoplamento**: Componentes não precisam conhecer uns aos outros
- **Responsabilidade Única**: Cada handler foca em uma tarefa específica
- **Cross-cutting Concerns**: Fácil adicionar validação, logging, cache através de behaviors

### Implementação do Mediator com MediatR

```csharp
public class CreateUserCommand : IRequest<UserDto>
{
    public string Name { get; set; }
    public string Email { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public CreateUserCommandHandler(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow
        };

        var createdUser = await _userRepository.CreateAsync(user);
        return _mapper.Map<UserDto>(createdUser);
    }
}

// No seu controller
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
}
```

### Adicionando Cross-Cutting Concerns

```csharp
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Processando {RequestName}", typeof(TRequest).Name);
        var response = await next();
        _logger.LogInformation("Processado {RequestName}", typeof(TRequest).Name);
        return response;
    }
}
```

### Benefícios do Mediator Pattern

O Mediator pattern transformou nossos controllers de classes gordas e complexas em coordenadores leves. Adicionar logging, validação e cache se tornou trivial através de pipeline behaviors.

## Configuração da Injeção de Dependência

Aqui está como normalmente registro esses patterns no `Program.cs`:

```csharp
// Repository Pattern
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Strategy Pattern
builder.Services.AddScoped<IPaymentProcessor, CreditCardProcessor>();
builder.Services.AddScoped<IPaymentProcessor, PixProcessor>();
builder.Services.AddScoped<PaymentService>();

// Mediator Pattern
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
```

## Quando NÃO Usar Esses Patterns

**Repository Pattern**: Pule se você estiver usando Entity Framework com uma aplicação CRUD simples. O EF já fornece abstração.

**Strategy Pattern**: Não complique cenários simples de if/else. Use quando tiver algoritmos complexos ou esperar mudanças frequentes.

**Mediator Pattern**: Evite para aplicações muito simples. O overhead pode não valer a pena se você não tem lógica de negócio complexa.

## Principais Aprendizados

1. **Repository Pattern** fornece abstração limpa de acesso a dados
2. **Strategy Pattern** permite algoritmos flexíveis e configuráveis em runtime
3. **Mediator Pattern** desacopla componentes e centraliza lógica de negócio

Esses patterns consistentemente tornaram minhas aplicações .NET mais sustentáveis, testáveis e adaptáveis a requisitos em mudança. Não são balas de prata, mas quando aplicados apropriadamente, podem melhorar significativamente a qualidade do seu código.

## O que Vem a Seguir?

No meu próximo post, vou mergulhar mais fundo na construção de pipelines de ingestão orientados a eventos em .NET, mostrando como esses patterns trabalham juntos em uma arquitetura do mundo real.

Você já usou esses patterns em seus projetos? Que outros patterns considera essenciais no desenvolvimento .NET? Me conte nos comentários!

---

*Este post faz parte da minha série ".NET & Azure Foundations". Acompanhe enquanto compartilho insights práticos da construção de sistemas backend escaláveis.*
