class ProductsController < ApplicationController
  def index
    product_data = Product.all

    page = params[:page].to_i || 1
    limit = params[:limit].to_i || 10

    if page == 1
      @popular_products = Product.where(is_popular: true)
      @template_products = Product.where(is_template_bundle: true)
      @bundle_products = Product.where(:name => /bundle/i)
    end

    product_data = filter_products(product_data)

    if page == 1
      @total_products = product_data.count
      @tags_data = count_array_field(product_data, :tags)
      @file_types_data = count_array_field(product_data, :file_types)
    end

    product_data = product_data.offset((page - 1) * limit).limit(limit)

    @products = pluck_product_data(product_data)

    puts "Final query: #{product_data.selector}, Total products: #{@total_products}"

    render_products(page)
  end

  private

  def filter_products(product_data)
    product_data = product_data.where(:is_hidden.ne => true)
    product_data = filter_by_creator(product_data)
    product_data = filter_by_query(product_data)
    product_data = filter_by_price(product_data)
    product_data = sort_products(product_data)
    product_data = filter_by_rating(product_data)
    product_data = filter_by_tags(product_data)
    product_data = filter_by_filetypes(product_data)
    product_data
  end

  def filter_by_creator(product_data)
    if params[:creator].present?
      puts "Filtering by creator: #{params[:creator]}"
      product_data.where(creator: params[:creator])
    else
      product_data
    end
  end

  def filter_by_query(product_data)
    if params[:query].present?
      puts "Filtering by query: #{params[:query]}"
      product_data.where(:name => /#{params[:query]}/i)
    else
      product_data
    end
  end

  def filter_by_price(product_data)
    if params[:min_price].present?
      puts "Filtering by min_price: #{params[:min_price]}"
      product_data = product_data.where(:price.gte => (params[:min_price].to_i*100))
    end

    if params[:max_price].present?
      puts "Filtering by max_price: #{params[:max_price]}"
      product_data = product_data.where(:price.lte => (params[:max_price].to_i*100))
    end

    product_data
  end

  def sort_products(product_data)
    sort_options = {
      'newest' => { created_at: :desc },
      'highest_rated' => { 'ratings.average' => :desc },
      'most_reviewed' => { 'ratings.count' => :desc },
      'price_asc' => { price: :asc },
      'price_desc' => { price: :desc }
    }

    if params[:sort].present? && sort_options.key?(params[:sort])
      puts "Sorting by: #{params[:sort]}"
      product_data.order_by(sort_options[params[:sort]])
    else
      product_data
    end
  end

  def filter_by_rating(product_data)
    if params[:rating].present?
      puts "Filtering by rating: #{params[:rating]}"
      product_data.where('ratings.average' => { '$gt' => params[:rating].to_i })
    else
      product_data
    end
  end

  def filter_by_tags(product_data)
    filter_by_array_field(product_data, :tags, params[:tags])
  end

  def filter_by_filetypes(product_data)
    filter_by_array_field(product_data, :file_types, params[:filetypes])
  end

  def filter_by_array_field(product_data, field, param)
    if param.present?
      puts "Filtering by #{field}: #{param}"
      product_data.where(field.in => param.split(','))
    else
      product_data
    end
  end

  def count_array_field(product_data, field)
    all_values = product_data.pluck(field).flatten.compact.reject(&:empty?)
    counts = all_values.each_with_object(Hash.new(0)) { |value, counts| counts[value] += 1 }
    counts.sort_by { |value, count| -count }.to_h
  end

  def pluck_product_data(product_data)
    columns_to_pluck = [:name, :price, :ratings, :thumbnail_url, :is_template_bundle]
    plucked_data = product_data.pluck(*columns_to_pluck)
    plucked_data.map { |data| columns_to_pluck.zip(data).to_h }
  end

  def render_products(page)
    if page == 1
      render json: { products: @products, total_products: @total_products, tags_data: @tags_data, file_types_data: @file_types_data, popular_products: @popular_products, template_products: @template_products, bundle_products: @bundle_products}
    else
      render json: { products: @products }
    end  
  end
end