Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  root to: "products#index"
  get 'products' => 'products#index'
end
