require 'dotenv'

require 'dotenv'

# Carrega as variáveis de ambiente do arquivo .env
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  # Sobrescreve configurações do site com variáveis de ambiente se disponíveis
  
  # Configurações principais do site
  site.config['title'] = ENV['SITE_TITLE'] if ENV['SITE_TITLE']
  site.config['description'] = ENV['SITE_DESCRIPTION'] if ENV['SITE_DESCRIPTION']
  site.config['keywords'] = ENV['SITE_KEYWORDS'] if ENV['SITE_KEYWORDS']
  site.config['url'] = ENV['SITE_URL'] if ENV['SITE_URL']
  site.config['baseurl'] = ENV['SITE_BASEURL'] if ENV['SITE_BASEURL']
  
  # Configurações de build do Jekyll
  site.config['permalink'] = ENV['JEKYLL_PERMALINK'] if ENV['JEKYLL_PERMALINK']
  site.config['markdown'] = ENV['JEKYLL_MARKDOWN'] if ENV['JEKYLL_MARKDOWN']
  site.config['highlighter'] = ENV['JEKYLL_HIGHLIGHTER'] if ENV['JEKYLL_HIGHLIGHTER']
  site.config['incremental'] = ENV['JEKYLL_INCREMENTAL'] == 'true' if ENV['JEKYLL_INCREMENTAL']
  site.config['livereload'] = ENV['JEKYLL_LIVERELOAD'] == 'true' if ENV['JEKYLL_LIVERELOAD']
  site.config['host'] = ENV['JEKYLL_HOST'] if ENV['JEKYLL_HOST']
  site.config['source'] = ENV['JEKYLL_SOURCE'] if ENV['JEKYLL_SOURCE']
  site.config['destination'] = ENV['JEKYLL_DESTINATION'] if ENV['JEKYLL_DESTINATION']
  
  # Configurações SASS
  if ENV['SASS_STYLE']
    site.config['sass'] ||= {}
    site.config['sass']['style'] = ENV['SASS_STYLE']
  end
  
  # Analytics
  site.config['google_analytics'] = ENV['GOOGLE_ANALYTICS_ID'] if ENV['GOOGLE_ANALYTICS_ID']
  site.config['site.google_analytics_container'] = ENV['GOOGLE_TAG_MANAGER_ID'] if ENV['GOOGLE_TAG_MANAGER_ID']
  
  # Comentários
  site.config['disqus_shortname'] = ENV['DISQUS_SHORTNAME'] if ENV['DISQUS_SHORTNAME']
  site.config['disqus_site_shortname'] = ENV['DISQUS_SHORTNAME'] if ENV['DISQUS_SHORTNAME']
  
  # Repositório
  site.config['repo'] = ENV['SITE_REPO'] if ENV['SITE_REPO']
  
  # IMPORTANTE: Configurações de paginação devem ser definidas ANTES dos geradores rodarem
  # Para isso, vamos usar um hook anterior
  
  # Experiências
  site.config['max_experiences'] = ENV['MAX_EXPERIENCES'].to_i if ENV['MAX_EXPERIENCES']
  
  # Compressão HTML
  if ENV['COMPRESS_HTML_PROFILE']
    site.config['compress_html'] ||= {}
    site.config['compress_html']['profile'] = ENV['COMPRESS_HTML_PROFILE'] == 'true'
  end
  
  # Configurações do autor
  if site.config['author']
    site.config['author']['name'] = ENV['AUTHOR_NAME'] if ENV['AUTHOR_NAME']
    site.config['author']['full-name'] = ENV['AUTHOR_FULL_NAME'] if ENV['AUTHOR_FULL_NAME']
    site.config['author']['job'] = ENV['AUTHOR_JOB'] if ENV['AUTHOR_JOB']
    site.config['author']['bio'] = ENV['AUTHOR_BIO'] if ENV['AUTHOR_BIO']
    site.config['author']['email'] = ENV['AUTHOR_EMAIL'] if ENV['AUTHOR_EMAIL']
    site.config['author']['phone'] = ENV['AUTHOR_PHONE'] if ENV['AUTHOR_PHONE']
    site.config['author']['cellphone'] = ENV['AUTHOR_CELLPHONE'] if ENV['AUTHOR_CELLPHONE']
    site.config['author']['thumb'] = ENV['AUTHOR_THUMB'] if ENV['AUTHOR_THUMB']
    site.config['author']['url'] = ENV['SITE_URL'] if ENV['SITE_URL']
    site.config['author']['github'] = ENV['AUTHOR_GITHUB'] if ENV['AUTHOR_GITHUB']
    site.config['author']['twitter'] = ENV['AUTHOR_TWITTER'] if ENV['AUTHOR_TWITTER']
    site.config['author']['facebook'] = ENV['AUTHOR_FACEBOOK'] if ENV['AUTHOR_FACEBOOK']
    site.config['author']['linkedin'] = ENV['AUTHOR_LINKEDIN'] if ENV['AUTHOR_LINKEDIN']
    site.config['author']['gplus'] = ENV['AUTHOR_GPLUS'] if ENV['AUTHOR_GPLUS']
    site.config['author']['instagram'] = ENV['AUTHOR_INSTAGRAM'] if ENV['AUTHOR_INSTAGRAM']
    site.config['author']['whatsapp'] = ENV['AUTHOR_WHATSAPP'] if ENV['AUTHOR_WHATSAPP']
  end
  
  # Localização do currículo
  if ENV['RESUME_LOCATION']
    if site.config['messages'] && site.config['messages']['pt-br'] && site.config['messages']['pt-br']['print-resume']
      site.config['messages']['pt-br']['print-resume']['location'] = ENV['RESUME_LOCATION']
    end
    if site.config['messages'] && site.config['messages']['en-us'] && site.config['messages']['en-us']['print-resume']
      site.config['messages']['en-us']['print-resume']['location'] = ENV['RESUME_LOCATION']
    end
  end
  
  # Torna as variáveis de ambiente disponíveis globalmente nos templates
  site.config['env'] = ENV.to_h.select { |k, v| k.match(/^(ENABLE_|DEBUG|LOG_LEVEL|VERBOSE|FEATURE_)/) }
end
