# Plugin para configurar paginação do blog usando variáveis de ambiente - PERFORMANCE OPTIMIZED
require 'dotenv'

Dotenv.load

# Configure pagination settings early in the Jekyll build process
Jekyll::Hooks.register :site, :after_init do |site|
  # Blog pagination configuration from environment variables with performance defaults
  paginate_count = ENV['BLOG_PAGINATE']&.to_i || 10  # Default 10 instead of 5
  site.config['paginate'] = paginate_count
  
  if ENV['BLOG_PAGINATE_PATH']
    site.config['paginate_path'] = ENV['BLOG_PAGINATE_PATH']
  end
  
  if ENV['BLOG_COMMENTS']
    site.config['comments'] = ENV['BLOG_COMMENTS'] == 'true'
  end
  
  # Performance optimizations
  site.config['lsi'] = false  # Disable LSI for faster builds
  site.config['related_posts_limit'] = 5
  
  Jekyll.logger.info "Pagination Config:", "Optimized pagination: #{paginate_count} posts per page"
  
  # Debug: mostrar configurações de paginação
  Jekyll.logger.info "Pagination Config:", "paginate: #{site.config['paginate']}, paginate_path: #{site.config['paginate_path']}"
end
