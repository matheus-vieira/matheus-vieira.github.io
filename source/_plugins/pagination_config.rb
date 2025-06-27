# Plugin para configurar paginação do blog usando variáveis de ambiente
require 'dotenv'

Dotenv.load

# Configure pagination settings early in the Jekyll build process
Jekyll::Hooks.register :site, :after_init do |site|
  # Blog pagination configuration from environment variables
  if ENV['BLOG_PAGINATE']
    site.config['paginate'] = ENV['BLOG_PAGINATE'].to_i
  end
  
  if ENV['BLOG_PAGINATE_PATH']
    site.config['paginate_path'] = ENV['BLOG_PAGINATE_PATH']
  end
  
  if ENV['BLOG_COMMENTS']
    site.config['comments'] = ENV['BLOG_COMMENTS'] == 'true'
  end
  
  # Debug: mostrar configurações de paginação
  Jekyll.logger.info "Pagination Config:", "paginate: #{site.config['paginate']}, paginate_path: #{site.config['paginate_path']}"
end
