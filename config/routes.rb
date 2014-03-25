Saferide::Application.routes.draw do

root to: 'passenger#index'

get "driver/index"


get 'auth/:provider/callback', to: 'sessions#create'
get 'auth/failure', to: redirect('/')
get 'signout', to: 'sessions#destroy', as: 'signout'

resources :rides

resources :passengers do
  resources :drivers
end

end
