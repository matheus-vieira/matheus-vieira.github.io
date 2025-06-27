# Configuração de Ambiente com Dotenv

Este projeto utiliza o **Dotenv** para gerenciar variáveis de ambiente durante o desenvolvimento.

## 📁 Arquivos de Ambiente

- **`.env`** - Arquivo principal com suas configurações locais (não commitado)
- **`.env.example`** - Template com exemplos de variáveis disponíveis (commitado)

## 🚀 Como Usar

### 1. Configuração Inicial

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 2. Edite suas Configurações

Abra o arquivo `.env` e ajuste os valores conforme necessário:

```bash
# Exemplo de configurações personalizadas
JEKYLL_ENV=development
GOOGLE_ANALYTICS_ID=seu-id-analytics
DISQUS_SHORTNAME=seu-shortname
ENABLE_COMMENTS=true
DEBUG=true
```

### 3. Uso no Jekyll

As variáveis de ambiente podem ser usadas em:

#### Liquid Templates:
```liquid
{% if site.env.ENABLE_COMMENTS == 'true' %}
  <!-- Código de comentários -->
{% endif %}
```

#### Configuração Jekyll (_config.yml):
```yaml
google_analytics: <%= ENV['GOOGLE_ANALYTICS_ID'] %>
```

#### Plugins e Scripts:
```ruby
if ENV['DEBUG'] == 'true'
  puts "Modo debug ativo"
end
```

## 🔒 Segurança

### ⚠️ IMPORTANTE:
- **NUNCA** commite o arquivo `.env` com informações sensíveis
- Use `.env.example` para documentar variáveis necessárias
- Informações sensíveis incluem:
  - Chaves de API
  - Tokens de acesso
  - Senhas
  - URLs de webhook

### ✅ Boas Práticas:
- Mantenha `.env` no `.gitignore`
- Use valores padrão seguros no código
- Documente variáveis necessárias no `.env.example`
- Use prefixos para organizar (`JEKYLL_`, `API_`, etc.)

## 📋 Variáveis Disponíveis

### Jekyll Core:
- `JEKYLL_ENV` - Ambiente (development/production)
- `JEKYLL_HOST` - Host do servidor
- `JEKYLL_PORT` - Porta do servidor
- `JEKYLL_INCREMENTAL` - Build incremental
- `JEKYLL_LIVERELOAD` - Live reload ativo

### Analytics & Tracking:
- `GOOGLE_ANALYTICS_ID` - ID do Google Analytics
- `GOOGLE_TAG_MANAGER_ID` - ID do Google Tag Manager

### Comentários:
- `DISQUS_SHORTNAME` - Nome do site no Disqus

### GitHub:
- `GITHUB_REPOSITORY` - Repositório GitHub
- `GITHUB_USERNAME` - Usuário GitHub

### Feature Flags:
- `ENABLE_COMMENTS` - Habilitar comentários
- `ENABLE_ANALYTICS` - Habilitar analytics
- `ENABLE_SEARCH` - Habilitar busca
- `ENABLE_PWA` - Habilitar PWA

### Debug & Logging:
- `DEBUG` - Modo debug
- `LOG_LEVEL` - Nível de log
- `VERBOSE` - Output verboso

## 🛠️ Comandos Úteis

### Verificar variáveis carregadas:
```bash
bundle exec ruby -e "require 'dotenv'; Dotenv.load; puts ENV.select { |k,v| !k.start_with?('_', 'PATH', 'HOME') }.sort"
```

### Build com ambiente específico:
```bash
JEKYLL_ENV=production bundle exec jekyll build
```

### Servidor com debug:
```bash
DEBUG=true bundle exec jekyll serve
```

## 📚 Exemplos de Uso

### Condicional por Ambiente:
```liquid
{% if jekyll.environment == "development" %}
  <p>Modo de desenvolvimento ativo</p>
{% endif %}
```

### Analytics Condicionais:
```liquid
{% if site.google_analytics and jekyll.environment == "production" %}
  <!-- Google Analytics -->
{% endif %}
```

### Feature Flags:
```liquid
{% assign enable_comments = site.env.ENABLE_COMMENTS | default: "false" %}
{% if enable_comments == "true" %}
  <!-- Sistema de comentários -->
{% endif %}
```

## 🐛 Troubleshooting

### Variáveis não carregam:
1. Verifique se o arquivo `.env` existe
2. Confirme que `gem 'dotenv'` está no Gemfile
3. Execute `bundle install`
4. Reinicie o servidor Jekyll

### Valores não aparecem:
1. Verifique a sintaxe: `VARIAVEL=valor` (sem espaços)
2. Não use aspas a menos que necessário
3. Reinicie o servidor após mudanças

### GitHub Pages:
- GitHub Pages não carrega arquivos `.env`
- Use **GitHub Secrets** para variáveis em produção
- Configure através de **Settings > Secrets and variables > Actions**

---

🎯 **Agora seu projeto Jekyll tem um sistema robusto de configuração de ambiente!**
