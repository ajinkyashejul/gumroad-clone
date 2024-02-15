class ProductsController < ApplicationController
  def index
    if params[:creator].present?
      puts :creator
      product_data = Product.where(creator: params[:creator])
    else
      product_data = Product.all
    end

    columns_to_pluck = [:name, :price, :ratings, :thumbnail_url, :is_template_bundle]
    plucked_data = product_data.pluck(*columns_to_pluck)
    # Convert plucked data into an array of hashes
    @products = plucked_data.map do |data|
      columns_to_pluck.zip(data).to_h
    end

    render json: @products
  end
end
