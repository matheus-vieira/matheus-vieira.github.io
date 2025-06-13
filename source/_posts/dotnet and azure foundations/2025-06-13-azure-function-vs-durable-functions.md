---
layout: post
title: "Azure Functions vs Durable Functions — Um caso de uso real"
date: 2025-06-13 17:01:00
image: https://raw.githubusercontent.com/dotnet/brand/c7d0f51b8ec59531332d05fb27a5b758a7a3d689/logo/dotnet-logo.svg
description: "Azure Functions vs Durable Functions — Um caso de uso real."
tags: dotnet dotnet core .net .net-core azure
categories: pt-br dotnet-and-azure-foundations
twitter_text: "Azure Functions vs Durable Functions — Um caso de uso real"
username: "Matheus Costa Vieira"
user_description: 
email: matheus.costa.vieira@gmail.com
photo: mvieira.jpg
---

Como engenheiro de software sênior, frequentemente enfrento a decisão de escolher entre **Azure Functions** e **Durable Functions** para soluções cloud-native. Embora ambas sejam poderosas, entender seus pontos fortes é crucial — especialmente quando os requisitos vão além do simples processamento de eventos.

## O Caso de Uso: Fluxo de Processamento de Pedidos

Vamos considerar um cenário real: processar pedidos de clientes em um sistema de e-commerce. O fluxo envolve várias etapas:

1. **Receber o pedido** (gatilho HTTP)
2. **Validar pagamento** (chamada de API externa)
3. **Verificar estoque** (consulta ao banco de dados)
4. **Reservar estoque**
5. **Iniciar envio**
6. **Enviar confirmação ao cliente**

Cada etapa pode levar tempo, depender de sistemas externos ou exigir tentativas de repetição.

## Por que não usar apenas Azure Functions?

À primeira vista, você pode tentar implementar isso com uma única Azure Function ou uma cadeia de funções acionadas por eventos (por exemplo, filas ou requisições HTTP). No entanto, essa abordagem rapidamente encontra limitações:

- **Gerenciamento de Estado:** Azure Functions são stateless. Você precisaria persistir o estado externamente (por exemplo, em um banco de dados) e gerenciar o progresso do fluxo manualmente.
- **Operações de Longa Duração:** Azure Functions possuem timeouts de execução (normalmente 5-10 minutos). Se a validação de pagamento ou envio demorar mais, a função falha.
- **Tratamento de Erros:** Implementar tentativas, compensações e lógica de recuperação entre várias funções se torna complexo e propenso a erros.
- **Orquestração:** Encadear funções e lidar com dependências (por exemplo, não enviar antes de confirmar o pagamento) exige coordenação manual, frequentemente levando a um “código espaguete”.

## Por que Durable Functions são a escolha certa

**Durable Functions** resolvem esses desafios oferecendo:

- **Orquestração integrada:** Defina o fluxo como código usando funções orquestradoras. Cada etapa é uma função de atividade separada, e as dependências são explícitas.
- **Execução com estado:** O framework gerencia estado, checkpoints e reinicializações automaticamente — mesmo em caso de falhas ou reinícios.
- **Suporte a operações longas:** Os fluxos podem durar horas ou dias, aguardando eventos externos (por exemplo, confirmação de pagamento) sem consumir recursos.
- **Tratamento robusto de erros:** Suporte nativo para tentativas, compensações e propagação de erros.

**Exemplo de Orquestrador (C#):**

```csharp
[FunctionName("OrderProcessingOrchestrator")]
public async Task RunOrchestrator(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var order = context.GetInput<Order>();
    await context.CallActivityAsync("ValidatePayment", order);
    await context.CallActivityAsync("CheckInventory", order);
    await context.CallActivityAsync("ReserveStock", order);
    await context.CallActivityAsync("InitiateShipping", order);
    await context.CallActivityAsync("SendConfirmation", order);
}
```

## Principais Diferenças

| Recurso                | Azure Functions         | Durable Functions                    |
|------------------------|-------------------------|--------------------------------------|
| Gerenciamento de Estado| Stateless               | Stateful (gerenciado pelo framework) |
| Orquestração de Fluxo  | Manual                  | Integrada (funções orquestradoras)   |
| Suporte a Longa Duração| Limitado (timeout)      | Sim (pode durar dias)                |
| Tratamento de Erros    | Básico                  | Avançado (tentativas, checkpoints)   |
| Fan-out/Fan-in         | Manual                  | Padrões integrados                   |

## Conclusão

Para tarefas simples, sem estado e de curta duração, **Azure Functions** são ideais. Mas quando o fluxo envolve múltiplas etapas, dependências externas e operações longas — como no exemplo de processamento de pedidos — **Durable Functions** oferecem a orquestração, confiabilidade e manutenção que você precisa. Escolher a ferramenta certa garante que suas soluções em nuvem sejam robustas e escaláveis.
