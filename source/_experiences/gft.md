---
layout: js
jobtitle: "Senior Software Engineer"
admissiondate: 2021-08-16
resignationdate: 2024-08-19
company: GFT Brasil
description: ".NET Core, C#, Azure Functions, Event Grid, Service Bus, Event Hubs, Azure Blob Storage, Azure SQL, Azure AD, Key Vault, AngularJS, xUnit, Azure DevOps Pipelines, Event-Driven Architecture."
languages: [C#, JavaScript, TypeScript, SQL]
frameworks: [.NET, ASP.NET Core, Azure Functions, Azure Service Bus, Azure Event Grid, Azure Event Hubs, Azure Blob Storage, Azure SQL Database, AngularJS, React, xUnit, Moq, FluentAssertions, Azure DevOps]
additionInfo: [Event-Driven Architecture, Cloud Modernization, Financial Services, Batch File Processing, Parallel Ingestion, Identity & Access Management (IAM), Azure Active Directory, Key Vault, Automated Testing, CI/CD Pipelines, Performance Optimization]
en-us:
  jobtitle: Senior Software Engineer
  description: |
    <ul>
      <li>Architected and implemented a high-throughput, event-driven batch file processing platform on Microsoft Azure for enterprise financial clients (Ultimus Fund Solutions and Banco Itaú), migrating monolithic pipelines into scalable microservices.</li>
      <li>Decoupled monolithic financial data ingestion (CSV, Fixed-Width, and XML transactions, balances, and customer positions) using Azure Functions, Service Bus, Event Grid, and Blob Storage, enabling automated parallel execution that slashed validation turnaround times from days to minutes and increased throughput by 50%.</li>
      <li>Designed an extensible schema-management engine allowing operational users to dynamically configure file layouts, column-level transformation rules, and conditional financial validations through an interactive web interface.</li>
      <li>Implemented enterprise-grade Identity and Access Management (IAM) leveraging Azure Active Directory (AAD) and Azure Key Vault for secrets/certificates orchestration, combined with database-backed authorization to validate fine-grained JWT tokens, claims, and policies.</li>
      <li>Attained over 85% automated test coverage across services using xUnit, Moq, and FluentAssertions, embedding automated unit and integration test gates into Azure DevOps Pipelines to eliminate regressions in critical production environments.</li>
      <li>Optimized client-side performance on AngularJS applications interfacing with .NET APIs by consolidating HTTP request lifecycles, adopting virtual scrolling and pagination for heavy financial datasets, and pruning digest cycle watchers to significantly improve interface responsiveness.</li>
    </ul>

pt-br:
  jobtitle: Engenheiro de Software Sênior
  description: |
    <ul>
      <li>Arquitetei e implementei uma plataforma corporativa orientada a eventos na nuvem Azure para processamento de arquivos financeiros de grande porte para clientes do setor financeiro (Ultimus Fund Solutions e Banco Itaú), migrando rotinas monolíticas para microsserviços escaláveis.</li>
      <li>Desacoplei pipelines monolíticos de ingestão de dados de fundos de investimento (arquivos CSV, Largura Fixa e XML com transações, saldos e posições) utilizando Azure Functions, Service Bus, Event Grid e Blob Storage, viabilizando processamento paralelo automático que reduziu o tempo de validação de dias para minutos e elevou o throughput em 50%.</li>
      <li>Desenvolvi um motor extensível de gerenciamento de layouts que permitiu aos analistas operacionais criar e configurar dinamicamente layouts de arquivos, regras de transformação por coluna e validações financeiras condicionais via interface web responsiva.</li>
      <li>Implementei gestão corporativa de identidade e acesso (IAM) com Azure Active Directory (AAD) e Azure Key Vault para gestão de segredos e certificados, combinada a validação em banco de dados para checagem refinada de tokens JWT, claims e políticas de permissão.</li>
      <li>Assegurei cobertura de testes automatizados superior a 85% utilizando xUnit, Moq e FluentAssertions, integrando testes unitários e de integração automatizados em pipelines de CI/CD no Azure DevOps para prevenir falhas em produção.</li>
      <li>Otimizei a performance de aplicações AngularJS integradas a APIs .NET por meio da consolidação de chamadas HTTP, implementação de paginação e virtual scrolling para grandes volumes de dados e eliminação de watchers desnecessários no ciclo digest do AngularJS.</li>
    </ul>

---
# Job Description
At GFT Brasil, I operated as a Senior Software Engineer delivering high-impact cloud modernization and distributed software engineering initiatives for major financial institutions, notably Ultimus Fund Solutions (US investment fund services) and Banco Itaú (Latin America's largest private bank).

### Key Responsibilities & Technical Contributions
- **Event-Driven Cloud Migration:** Spearheaded the decomposition of slow, monolithic batch-processing pipelines into distributed, event-driven Azure microservices. Leveraged Azure Functions, Azure Service Bus queues/topics, Event Grid, Event Hubs, and Azure Blob Storage to ingest, transform, and validate transactional investment fund datasets in parallel.
- **Dynamic Ingestion & Rules Engine:** Architected a dynamic file parsing and transformation engine supporting complex CSV, fixed-width, and XML formats. The solution empowered business users to define file definitions, data mappings, conditional constraints, and calculation rules through a dedicated configuration portal.
- **Security & Identity Architecture (IAM):** Built secure authentication and authorization mechanisms connecting Azure Active Directory (AAD) and Azure Key Vault with internal application datastores, enforcing robust claim-based authorization and cryptographic signature checks on JWT tokens across microservice boundaries.
- **Quality Assurance & CI/CD Pipelines:** Established high standards for software reliability by institutionalizing comprehensive test coverage (>85%) with xUnit, Moq, and FluentAssertions. Configured end-to-end continuous integration and deployment pipelines using Azure DevOps Pipelines with automated regression test suites.
- **Frontend Performance Engineering:** Refactored complex administrative frontends built with AngularJS connecting to .NET Core APIs. Resolved critical client-side bottlenecks by throttling digest cycles, optimizing REST payloads, and implementing virtual scrolling to render dense financial grids without browser degradation.
