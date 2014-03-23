Saferide::Application.routes.draw do
  get "driver/index"
root to: 'passenger#index'

get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'

resources :passengers do
  resources :drivers
end

end
