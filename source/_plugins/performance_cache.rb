# Performance Cache Plugin
# Este plugin implementa cache para melhorar performance do Jekyll

Jekyll::Hooks.register :site, :pre_render do |site|
  # Cache de posts por categoria
  site.data['posts_by_category'] ||= {}
  
  site.posts.docs.each do |post|
    categories = post.data['categories'] || []
    categories.each do |category|
      site.data['posts_by_category'][category] ||= []
      site.data['posts_by_category'][category] << post
    end
  end
  
  # Cache de posts por ano
  site.data['posts_by_year'] ||= {}
  site.posts.docs.each do |post|
    year = post.date.year
    site.data['posts_by_year'][year] ||= []
    site.data['posts_by_year'][year] << post
  end
  
  # Cache de estatísticas
  site.data['site_stats'] = {
    'total_posts' => site.posts.docs.size,
    'total_categories' => site.data['posts_by_category'].keys.size,
    'last_updated' => Time.now
  }
  
  Jekyll.logger.info "Performance Cache:", "Cached #{site.posts.docs.size} posts"
end

# Otimização de geração de páginas
Jekyll::Hooks.register :site, :post_write do |site|
  # Limpar cache temporário se necessário
  site.data.delete('temp_cache') if site.data['temp_cache']
  
  Jekyll.logger.info "Performance Cache:", "Build completed - cache cleared"
end
