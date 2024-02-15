# app/controllers/products_controller.rb
class ProductsController < ApplicationController
    def index
      if params[:creator].present?
        @products = Product.where('creator' => params[:creator]).select(:name, :ratings, :price, :thumbnail_url, :is_template_bundle)
      else
        @products = Product.all.select(:name, :ratings, :price, :thumbnail_url, :is_template_bundle)
      end
  
      render json: @products
    end
  end
  