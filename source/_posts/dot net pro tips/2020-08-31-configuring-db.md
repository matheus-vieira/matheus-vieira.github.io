---
layout: post
title: ".NET Pro tips - Configurando banco de Dados"
date: 2020-08-31 10:20:00
image: https://th.bing.com/th/id/OIP.NsHm5JKrYYAwtKPx1xEF7QHaFj?w=243&h=182&c=7&o=5&pid=1.7
description: "Configurando banco de dados"
tags: .net-core .net tips
categories: pt-br dotnet-pro-tips
twitter_text: ".NET Pro tips - Configurando banco de Dados"
username: "Matheus Costa Vieira"
user_description: Senior .NET Backend Engineer
email: matheus.costa.vieira@gmail.com
photo: mvieira.jpg
---

{% include posts/pro-tips-multiple-db-providers/intro.md %}

## Configurando banco de dados em um projeto .NET Core

Neste ponto assumo que você já é familiarizado com projetos .NET e/ou .NET Core e portanto sabe implementar ou se necessário ler o site [AS.NET Documentation](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1) para saber como iniciar a configuração de um banco de dados.

Aqui mostrarei uma possível ideia de implementação de um projeto de acesso a banco de dados.

Algo que acaba me incomodando é as pessoas utilizarem exemplos da própria documentação e manter isso por toda a vida do projeto.

Primeiro exemplo que quero apresentar é sobre como utilizar o princípio de responsabilidade única ao criarmos um projeto de banco de dados.

Sabemos que no método `ConfigureServices` da classe `Startup` precisamos, como o nome propõe, configurar nossos serviços, e nosso banco de dados é um serviço de nossa aplicação.

Aqui temos um exemplo da própria [documentação](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-3.1#register-the-schoolcontext)

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

    services.AddDbContext<SchoolContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

    services.AddMvc();
}
```
\
O projeto que possui a classe `Startup` deve basicamente, se por exemplo o projeto for de uma API:

* Carregar o(s) arquivo(s) de configuração
* Configurar as rotas
* E solicitar aos serviços para que eles configurem o que for necessário.

O ponto chave do `ConfigureServices` é a chamada ao método (de extensão) `AddDbContext`, ao meu ver isso é algo que o próprio projeto de banco de dados deve ser o responsável pela sua configuração.

Para isso podemos utilizar um [métodos de extensão]({{ '/blog/pt-br/dotnet-pro-tips/extension-methods'  | prepend: site.baseurl }}) no projeto que faz sentido.

> Caso seu sistema possua uma camada de serviço entre a controller e o banco de dados então a classe `Startup` deve conhecer apenas o a camada de serviço.

Um exemplo de método de extensão:

```csharp
namespace ContosoUniversity.Data.Extension
{
    public static class RepositoryExtension
    {
        public static void UseDataRepository(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SchoolContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
```

> Eu acho interessante utilizar o prefixo `Use`, mas é gosto pessoal, pode usar o nome que desejar.
> 
> O foco aqui é extender a interface `IServiceCollection` recebendo a interface `IConfiguration`

Agora podemos ver que a responsabilidade da `Startup` é pedir para o serviço se configurar:

```csharp
// código omitido
using ContosoUniversity.Data.Extension; // não esqueça de adicionar o using para o método de extensã

// código omitido

public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

    services.UseDataRepository(Configuration);

    services.AddMvc();
}
```
\
Toda a complexidade foi removida da classe de inicialização e encapsulada dentro do projeto responsável.

Como comentado acima, caso o seu sistema possua uma camada de serviço a implementação deve seguir a mesma ideia.


```csharp
namespace ContosoUniversity.ServiceLayer.Extension
{
    public static class ServiceLayerExtension
    {
        public static void UseServiceLayer(this IServiceCollection services, IConfiguration configuration)
        {
            // qualquer configuraçãp necessária
            
            // configurar o acesso ao banco
            services.UseDataRepository(Configuration);
        }
    }
}
```
\
Com isso devemos apenas mudar nossa classe de `Startup` de forma a chamar o método que ele conhece

```csharp
// código omitido
using ContosoUniversity.ServiceLayer.Extension; // não esqueça de adicionar o using para o método de extensã

// código omitido

public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

    services.UseServiceLayer(Configuration);

    services.AddMvc();
}
```
\
Perceba agora que temos todas as configurações em seus devidos lugares, portanto se ocorrer a necessidade de se reconfigurar algo (seja da camada de serviço ou de banco de dados) será uma configuração transaparente e somente quem é responsável fica sabendo da alteração.

Em outras palavras, nossa camada de API não sabe se os dados recebidos por ela e repassado à camada de serviço será gravados efetivamente em um banco de dados, ou se chamará outra API externa, isso não é responsabilidade da API.

{% include posts/pro-tips-multiple-db-providers/related-pt-br.md %}