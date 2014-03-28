Saferide::Application.routes.draw do

root to: 'rides#index'

#indexing rides: passengers and drivers
get "drivers", to: 'users#get_drivers'
get "passengers", to: 'users#get_passengers'
get "avail_rides", to: 'rides#get_avail_rides'
get "init_role", to: 'users#init_role'

#rider to passenger handshake
get "confirm_ride", to: 'rides#confirm_ride'

#switching roles
get "switch_to_driver", to: 'users#switch_to_driver'
get "switch_to_passenger", to: 'users#switch_to_passenger'


#authorizing sessions
get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'

resources :rides

end
