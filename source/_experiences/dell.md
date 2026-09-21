---
layout: js
jobtitle: "Senior Software Engineer"
admissiondate: 2022-10-01
resignationdate: 2025-06-30
company: Dell Computadores do Brasil LTDA
description: ".NET 8, C#, REST APIs, Microservices, Oracle, Elasticsearch, Redis, OpenShift, ELK Stack, Serilog, NuGet, SOLID Principles, International Teams."
languages: [C#, SQL]
frameworks: [.NET 8, ASP.NET Core, Elasticsearch, Redis, Oracle, OpenShift, ELK Stack, Serilog, Kibana]
additionInfo: [Software Architecture, Microservices, Multi-Country Systems, Rule Engines, NuGet Packaging, Code Duplication Reduction, In-Memory Caching, Reverse Address Lookup, Structured Logging, Distributed Global Teams]
en-us:
  jobtitle: Senior Software Engineer
  description: |
    <ul>
      <li>Architected and developed a mission-critical global address validation and standardization RESTful API platform in .NET 8, handling high-throughput daily requests 24/7 across Dell's internal and customer-facing enterprise systems.</li>
      <li>Spearheaded the complete re-architecture of a 10+ year legacy codebase using SOLID principles, introducing a dynamic, extensible design that enables rapid onboarding of new country-specific address specifications without altering core service logic.</li>
      <li>Engineered reusable enterprise NuGet packages encapsulating country rule engines and validation algorithms, reducing code duplication by 40% across microservices and ensuring uniform compliance across geographies.</li>
      <li>Implemented an optimized hybrid data architecture combining Oracle for enterprise validation rule storage, Elasticsearch for fast reverse address indexing partitioned by country codes, and Redis caching to serve recurrent lookups with sub-200ms latency.</li>
      <li>Established comprehensive application observability using Serilog for structured logging across containerized OpenShift environments, feeding the ELK Stack (Elasticsearch, Logstash, Kibana) with real-time error-tracking and API latency dashboards.</li>
      <li>Collaborated daily in an international engineering team spanning the US, India, Malaysia, and Brazil, participating in architectural reviews, agile ceremonies, and cross-team design alignments.</li>
    </ul>

pt-br:
  jobtitle: Engenheiro de Software Sênior
  description: |
    <ul>
      <li>Arquitetei e desenvolvi uma plataforma corporativa global de APIs RESTful em .NET 8 para validação e padronização de endereços, atendendo sistemas críticos da Dell com alta disponibilidade 24/7 e milhares de requisições diárias.</li>
      <li>Liderei a reescrita completa de um legado de mais de 10 anos aplicando princípios SOLID, estruturando uma arquitetura dinâmica e extensível que permitiu incorporar regras de novos países sem alterar a lógica central do serviço.</li>
      <li>Projetei e mantive pacotes NuGet corporativos reutilizáveis com motores de regras de validação por país, reduzindo a duplicação de código em 40% entre microsserviços e garantindo padronização regulatória entre localidades.</li>
      <li>Implementei arquitetura de dados híbrida e de alta performance integrando Oracle para regras corporativas, Elasticsearch para indexação reversa particionada por país e Redis para cache de consultas frequentes com tempo de resposta sub-200ms.</li>
      <li>Estruturei observabilidade e rastreabilidade de ponta a ponta com Serilog para logs estruturados em ambiente de contêineres OpenShift, alimentando dashboards de latência e monitoramento de falhas no ELK Stack (Kibana).</li>
      <li>Atuei ativamente em equipe global multidisciplinar com engenheiros nos EUA, Índia, Malásia e Brasil, participando de revisões semanais de arquitetura, code reviews e ritos ágeis em inglês.</li>
    </ul>

---
# Job Description
At Dell Computadores do Brasil LTDA, I worked as a Senior Software Engineer responsible for architecting, building, and maintaining the enterprise multi-country address validation platform. The platform serves as a central backbone for order processing, logistics, and customer data verification worldwide.

### Key Responsibilities & Technical Contributions
- **Legacy Modernization & Core API Development:** Re-engineered a decade-old legacy system into modern, decoupled RESTful APIs using modern C# and .NET 8, applying Domain-Driven Design (DDD) principles and SOLID to decouple country-specific validation logic from the processing pipeline.
- **Rule Engine & Reusable Packaging:** Designed and distributed reusable NuGet packages housing configurable rule engines. This abstracted address sanitization and postal verification logic, eliminating code duplication by 40% across consumer microservices and providing graceful fallback and rejection handling for unsupported regions.
- **Search, Caching & Performance:** Optimized data access patterns by leveraging Oracle for transactional business rules, Elasticsearch for high-speed reverse address indexing (filtered dynamically by requested country index), and Redis distributed caching for hot lookup paths, consistently maintaining sub-200ms response SLAs.
- **Observability & Containerized Operations:** Integrated structured application logging with Serilog deployed onto Red Hat OpenShift container clusters. Configured monitoring dashboards in Kibana (ELK Stack) to analyze request trends, trace errors across service boundaries, and troubleshoot operational bottlenecks.
- **Global Collaboration:** Acted within cross-functional distributed teams alongside colleagues in the United States, India, Malaysia, and Brazil, conducting technical design reviews, aligning API contracts, and upholding engineering quality standards.
