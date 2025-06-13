---
layout: post
title: "Azure Functions vs Durable Functions — A Real-World Use Case"
date: 2025-06-12 17:01:00
image: https://raw.githubusercontent.com/dotnet/brand/c7d0f51b8ec59531332d05fb27a5b758a7a3d689/logo/dotnet-logo.svg
description: "Azure Functions vs Durable Functions — A Real-World Use Case."
tags: dotnet dotnet core .net .net-core azure
categories: en-us dotnet-and-azure-foundations
twitter_text: "Azure Functions vs Durable Functions — A Real-World Use Case"
username: "Matheus Costa Vieira"
user_description: 
email: matheus.costa.vieira@gmail.com
photo: mvieira.jpg
---

As a senior software engineer, I’ve often faced the decision of choosing between **Azure Functions** and **Durable Functions** for cloud-native solutions. While both are powerful, understanding their strengths is crucial—especially when your requirements go beyond simple event processing.

## The Use Case: Order Processing Workflow

Let’s consider a real-world scenario: processing customer orders in an e-commerce system. The workflow involves several steps:

1. **Receive the order** (HTTP trigger)
2. **Validate payment** (external API call)
3. **Check inventory** (database query)
4. **Reserve stock**
5. **Initiate shipping**
6. **Send confirmation to the customer**

Each step may take time, depend on external systems, or require retries.

## Why Not Just Use Azure Functions?

At first glance, you might try to implement this with a single Azure Function or a chain of functions triggered by events (e.g., queues or HTTP requests). However, this approach quickly runs into limitations:

- **State Management:** Azure Functions are stateless. You’d need to persist state externally (e.g., in a database) and manage workflow progress yourself.
- **Long-Running Operations:** Azure Functions have execution timeouts (typically 5-10 minutes). If payment validation or shipping takes longer, the function fails.
- **Error Handling:** Implementing retries, compensation, and recovery logic across multiple functions becomes complex and error-prone.
- **Orchestration:** Chaining functions and handling dependencies (e.g., don’t ship before payment is confirmed) requires manual coordination, often leading to “spaghetti code.”

## Why Durable Functions Are the Right Fit

**Durable Functions** solve these challenges by providing:

- **Built-in Orchestration:** Define the workflow as code using orchestrator functions. Each step is a separate activity function, and dependencies are explicit.
- **Stateful Execution:** The framework manages state, checkpoints, and restarts automatically—even across failures or restarts.
- **Long-Running Support:** Workflows can run for hours or days, waiting for external events (e.g., payment confirmation) without holding resources.
- **Robust Error Handling:** Built-in support for retries, compensation, and error propagation.

**Example Orchestrator (C#):**

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

## Key Differences

| Feature                | Azure Functions         | Durable Functions                |
|------------------------|------------------------|----------------------------------|
| State Management       | Stateless              | Stateful (managed by framework)  |
| Workflow Orchestration | Manual                 | Built-in (orchestrator functions)|
| Long-running Support   | Limited (timeout)      | Yes (can run for days)           |
| Error Handling         | Basic                  | Advanced (retries, checkpoints)  |
| Fan-out/Fan-in         | Manual                 | Built-in patterns                |

## Conclusion

For simple, stateless, and short-lived tasks, **Azure Functions** are ideal. But when your workflow involves multiple steps, external dependencies, and long-running operations—like our order processing example—**Durable Functions** provide the orchestration, reliability, and maintainability you need. Choosing the right tool ensures your cloud solutions are robust and scalable.
