Saferide::Application.routes.draw do

root to: 'rides#index'

#indexing rides: passengers and drivers
get "drivers", to: 'users#get_drivers'
get "passengers", to: 'users#get_passengers'
get "avail_rides", to: 'rides#get_avail_rides'
get "init_role", to: 'users#init_role'

#ride statuses
get "cancel_ride", to: 'rides#cancel_ride'
get "start_ride", to: 'rides#start_ride'
get "complete_ride", to: 'rides#complete_ride'
get "confirm_ride", to: 'rides#confirm_ride'

#switching roles
get "switch_to_driver", to: 'users#switch_to_driver'
get "switch_to_passenger", to: 'users#switch_to_passenger'


#authorizing sessions
get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'
get 'sign_in', to: 'users#sign_in', as: 'signin'
get 'phone', to: 'users#check_phone', as: 'phone'

#updating user's phone
patch 'update_phone', to: 'users#update_phone', as: 'user'

resources :rides

end
