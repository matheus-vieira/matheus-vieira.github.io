---
layout: post
title: ".NET Pro tips Extension Methods"
date: 2020-08-14 08:20:00
image: https://th.bing.com/th/id/OIP.NsHm5JKrYYAwtKPx1xEF7QHaFj?w=243&h=182&c=7&o=5&pid=1.7
description: "Introduction to pro tips for .NET projects"
tags: .net-core .net tips
categories: pt-br dotnet-pro-tips
twitter_text: ".NET Pro tips"
username: "Matheus Costa Vieira"
user_description: Sênior Developer
email: matheus.costa.vieira@gmail.com
photo: mvieira.jpg
---

Esse artigo faz parte de uma série de artigos sobre como utilizar o EFCore com múltiplos providers de banco de dados que pode ser encontrado em [.NET Pro tips Multiple Databases Providers Introduction]({{ '/blog/pt-br/dotnet-pro-tips/intro/'  | prepend: site.baseurl }})

## O que isso quer dizer?

> [Métodos de extensão](https://docs.microsoft.com/pt-br/dotnet/csharp/programming-guide/classes-and-structs/extension-methods), como o próprio nome diz, adiciona extensões a objetos existentes, evitando alterar códigos existentes (o que facilmente leva a introdução de bugs e complexidade na escrita e leitura de novos códigos)

Perceba a contribução para os princípios Single Responsibility e Open/Closed do SOLID e com isso atingimos um bom Clean Code.

Um exemplo simples de utilização seria transformar um texto para algumas convenções de nomenclatura como o CamelCase.

Nesse exemplo não temos acesso direto à classe [`string`](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1) o que já nos impediria de adicionar um método novo a essa classe.

Um exemplo de implementação seria:

```c#
var myText = "Hello World";
var myTextCamelCase = (char.ToLowerInvariant(str[0]) + str.Substring(1))
                      .Replace(" ", string.Empty);
_logger.LogInformation(myText + " ToCamelCase -> " + myText.ToCamelCase());
// Output -> Hello World ToCamelCase -> helloWorld
```
\
Porém isso nos leva a ter que repetir a implementação em qualquer lugar (o que fere o conceito [DRY](https://pt.wikipedia.org/wiki/Don%27t_repeat_yourself)). Além de ferir conceitos e princípios temos o problema de falta de clareza no código dificultando a leitura.

Os métodos de extensão nos ajuda da seguinte forma:

```c#
 public static class StringExtension
 {
     public static string ToCamelCase(this string str)
     {
         if(!string.IsNullOrEmpty(str) && str.Length > 1)
         {
             return (char.ToLowerInvariant(str[0]) + str.Substring(1)).Replace(" ", string.Empty);
         }
         return str;
     }
 }
```

> O que indica ser um método de extensão não é o suffixo `Extension` no nome da classe e sim a palavra reservada `this` antes do primeiro parâmetro e a característica estática.

Assim podemos reutilizar em diversos lugares, apenas utilizando a chamada de um método.

```c#
var myText = "Hello World";
var myTextCamelCase = myText.ToCamelCase();
Console.WriteLn(myTextCamelCase);
```

> Note que na chamada do método não existe parâmetro. O parâmtro é a própria variável do tipo string.
> Note também que a leitura é facilitada.

Com a utilização de métodos de extensão podemos reaproveitar código e organizar de forma lógica dentro da nossa aplicação.

Seguindo nessa mesma lógica podemos alterar no ssa classe e atribuir outras convenções de nomes, nesse caso irei renomear a classe e adicionar métodos para snake case e pascal case

```c#
using System.Linq;

namespace Helpers.Extensions.String
{
    public static class NamingConventionExtension
    {
        public static string ToCamelCase(this string str)
        {
            if (!string.IsNullOrEmpty(str) && str.Length > 1)
                return (char.ToLowerInvariant(str[0]) + str.Substring(1)).Replace(" ", string.Empty);
            return str;
        }

        public static string ToSnakeCase(this string str)
        {
            return str?.ToLower().Replace(" ", "_");
        }

        public static string ToPascalCase(this string str)
        {
            return string.Join("", str.Split('_')
                    .Select(w => w.Trim())
                    .Where(w => w.Length > 0)
                    .Select(w => w.Substring(0, 1).ToUpper() + w.Substring(1).ToLower()));
        }
    }
}
```
\
Utilização:

```c#
var myText = "Hello World";
_logger.LogInformation(myText + " ToCamelCase -> " + myText.ToCamelCase());
// Output -> Hello World ToCamelCase -> helloWorld
_logger.LogInformation(myText + " ToPascalCase -> " + myText.ToPascalCase());
// Output -> Hello World ToPascalCase -> HelloWorld
_logger.LogInformation(myText + " ToSnakeCase -> " + myText.ToSnakeCase());
// Output -> Hello World ToSnakeCase -> hello_world
```
\
Nesse caso a implementação do método está em um projeto auxiliar denomidado Helpers. Isso nos obriga a adicionar `using Helpers.Extensions.String;`

Minha prioridade aqui não foi mostrar uma implentação perfeita dos métodos, apenas de como utilizar os métodos de extensão.

Os métodos de extensão nos ajudam a organizar nosso código por toda a nossa solução. Agrupando responsabilidades ao projeto apropriado.

Agora com nosso código encapsulado podemos melhorar sem precisar alterar a chamada.

Fique a vontade para implementar a sua versão.

{% include posts/pro-tips-multiple-db-providers/related-pt-br.md %}