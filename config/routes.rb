Saferide::Application.routes.draw do

root to: 'passenger#index'

get "drivers", to: 'users#get_drivers'
get "passengers", to: 'users#get_passengers'

get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'

resources :rides

end
