Saferide::Application.routes.draw do

root to: 'rides#index'

get "drivers", to: 'users#get_drivers'
get "passengers", to: 'users#get_passengers'
get "confirm_ride", to: 'rides#confirm_ride'

get "avail_rides", to: 'rides#get_avail_rides'

get "init_role", to: 'users#init_role'

get "switch_role", to: 'users#switch_role'

get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'

resources :rides

end
