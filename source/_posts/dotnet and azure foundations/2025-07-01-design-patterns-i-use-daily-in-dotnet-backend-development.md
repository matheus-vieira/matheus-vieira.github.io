---
layout: post
title: "Design Patterns I Use Daily in .NET Backend Development"
date: 2025-07-01
categories: [dotnet, design-patterns, backend]
tags: [csharp, architecture, repository-pattern, strategy-pattern, mediator-pattern]
lang: en
ref: design-patterns-daily-dotnet
author: Matheus Vieira
excerpt: "Exploring three essential design patterns that make .NET backend development more maintainable and scalable: Repository, Strategy, and Mediator patterns."
image: /images/posts/design-patterns-dotnet.svg
---

As a .NET backend developer, I've discovered that certain design patterns consistently prove their worth in real-world applications. Today, I want to share three patterns that have become essential tools in my development arsenal: **Repository**, **Strategy**, and **Mediator** patterns.

These aren't just theoretical concepts—they're practical solutions that I implement daily to create more maintainable, testable, and scalable applications.

## 1. Repository Pattern: Clean Data Access

The Repository pattern creates a uniform interface for accessing data, regardless of the underlying storage mechanism.

### Why Repository Pattern Works

- **Testability**: Easy to mock for unit tests
- **Separation of Concerns**: Business logic stays independent of data access
- **Flexibility**: Switch between different data sources without breaking business logic

### Repository Implementation Example

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

    // Other methods...
}
```

### Repository Pattern Benefits

In a recent project, we needed to migrate from SQL Server to CosmosDB. Thanks to the Repository pattern, we only had to implement a new repository class—zero changes to business logic.

## 2. Strategy Pattern: Flexible Business Logic

The Strategy pattern allows you to define a family of algorithms, encapsulate them, and make them interchangeable at runtime.

### Why Strategy Pattern Excels

- **Open/Closed Principle**: Add new strategies without modifying existing code
- **Runtime Flexibility**: Choose algorithms based on context
- **Testability**: Test each strategy in isolation

### Strategy Implementation Example

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
        // Credit card processing logic
        return await ProcessCreditCardAsync(request);
    }

    public bool CanProcess(PaymentMethod method)
        => method == PaymentMethod.CreditCard;
}

public class PixProcessor : IPaymentProcessor
{
    public async Task<PaymentResult> ProcessAsync(PaymentRequest request)
    {
        // PIX processing logic
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
            throw new NotSupportedException($"Payment method {request.Method} not supported");

        return await processor.ProcessAsync(request);
    }
}
```

### Strategy Pattern Benefits

When we needed to add new payment methods, we simply created new processor classes. The existing code remained untouched, and testing was straightforward since each processor is independent.

## 3. Mediator Pattern: Decoupled Communication

The Mediator pattern defines how a set of objects interact with each other, promoting loose coupling by preventing objects from referring to each other explicitly.

### Why Mediator Pattern Works

- **Decoupling**: Components don't need to know about each other
- **Single Responsibility**: Each handler focuses on one specific task
- **Cross-cutting Concerns**: Easy to add validation, logging, caching through behaviors

### Implementation with MediatR

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

// In your controller
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

### Adding Cross-Cutting Concerns

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
        _logger.LogInformation("Handling {RequestName}", typeof(TRequest).Name);
        var response = await next();
        _logger.LogInformation("Handled {RequestName}", typeof(TRequest).Name);
        return response;
    }
}
```

### Mediator Pattern Benefits

The Mediator pattern transformed our controllers from fat, complex classes into thin coordinators. Adding logging, validation, and caching became trivial through pipeline behaviors.

## Dependency Injection Setup

Here's how I typically register these patterns in `Program.cs`:

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

## When NOT to Use These Patterns

**Repository Pattern**: Skip it if you're using Entity Framework with a simple CRUD application. EF already provides abstraction.

**Strategy Pattern**: Don't overcomplicate simple if/else scenarios. Use it when you have complex algorithms or expect frequent changes.

**Mediator Pattern**: Avoid it for very simple applications. The overhead might not be worth it if you don't have complex business logic.

## Key Takeaways

1. **Repository Pattern** provides clean data access abstraction
2. **Strategy Pattern** enables flexible, runtime-configurable algorithms
3. **Mediator Pattern** decouples components and centralizes business logic

These patterns have consistently made my .NET applications more maintainable, testable, and adaptable to changing requirements. They're not silver bullets, but when applied appropriately, they can significantly improve your codebase quality.

## What's Next?

In my next post, I'll dive deeper into building event-driven ingestion pipelines in .NET, showing how these patterns work together in a real-world architecture.

Have you used these patterns in your projects? What other patterns do you find essential in .NET development? Let me know in the comments!

---

*This post is part of my ".NET & Azure Foundations" series. Follow along as I share practical insights from building scalable backend systems.*
