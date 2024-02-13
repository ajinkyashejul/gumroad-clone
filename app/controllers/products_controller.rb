# app/controllers/products_controller.rb
class ProductsController < ApplicationController
    def index
      if params[:creator].present?
        @products = Product.where('creator' => params[:creator])
      else
        @products = Product.all
      end
  
      render json: @products
    end
  end
  