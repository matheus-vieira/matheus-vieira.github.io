# encoding: UTF-8
require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
require "bourbon"
require "fileutils"

# Change your GitHub reponame
GITHUB_REPONAME = "matheus-vieira/matheus-vieira.github.io"
GITHUB_REPO_BRANCH = "master"

SOURCE = "source/"
DEST = "_site"
CONFIG = {
  'layouts'   => File.join(SOURCE, "_layouts"),
  'posts'     => File.join(SOURCE, "_posts"),
  'post_ext'  => "md",
  'categories'=> File.join(SOURCE, "categories"),
  'tags'      => File.join(SOURCE, "tags")
}

# 🔄 Task de backup antes de publicar
desc "Faz backup local sobrescrevendo o diretório com sufixo ' - backup'"
task :backup do
  current_dir = Dir.pwd
  dir_name = File.basename(current_dir)
  parent_dir = File.dirname(current_dir)
  backup_dir = File.join(parent_dir, "#{dir_name} - backup")

  puts "🔄 Iniciando backup em: #{backup_dir}"

  if Dir.exist?(backup_dir)
    puts "🧹 Removendo backup anterior..."
    FileUtils.rm_rf(backup_dir)
  end

  FileUtils.mkdir_p(backup_dir)
  Dir.glob("#{current_dir}/*", File::FNM_DOTMATCH).each do |path|
    next if ['.', '..'].include?(File.basename(path))
    FileUtils.cp_r(path, backup_dir)
  end

  puts "✅ Backup concluído com sucesso."
end

task default: %w[publish]

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => "source/",
    "destination" => "_site",
    "config"      => "_config.yml"
  })).process
end

desc "Generate and publish blog to gh-pages"
task :publish => [:backup, :generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git checkout --orphan #{GITHUB_REPO_BRANCH}"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push -f origin #{GITHUB_REPO_BRANCH}"

    Dir.chdir pwd
  end
end