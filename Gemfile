source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.4'

# adding postgres for heroku
gem 'pg'

# for angular to rails
gem "angularjs-rails", "~> 1.0.8"



# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# This makes it so the app logs in a way that Heroku likes.
gem 'rails_12factor', :group => :production

group :test, :development do 
  gem 'dotenv-rails' 
end

group :development do
    gem 'better_errors'
    gem 'binding_of_caller'
    gem 'meta_request'
    gem 'pry'
    gem 'pry-byebug'
    gem 'pry-rails'
    gem 'awesome_print'
    gem 'quiet_assets'
end

gem 'omniauth-facebook'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.2'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

gem 'jquery-turbolinks'

gem 'handlebars_assets'

gem 's3_direct_upload'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :production do
  gem 'rails_12factor'
end

group :development, :test do
  gem 'pry'
  gem 'pry-byebug'
  # adds show model, and some object navigation (and some other stuff)
  gem 'pry-rails'
  # suppresses assets messages in console
  gem 'quiet_assets'
  # gem 'better_errors'
  # adds console access in browser, at point of error
  gem 'binding_of_caller'
  # adds better formatting / printing of objects/variables
  gem 'awesome_print'

  gem 'rspec-rails'
  gem 'unicorn-rails'
  gem 'dotenv-rails'
end
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
