require 'json'
require 'mongoid'

# Adjust the relative path as necessary to point to your Rails application's environment file
require_relative '../config/environment.rb'

# Load Mongoid config (ensure this points to your Mongoid config file)
mongoid_path = File.expand_path('../config/mongoid.yml', __dir__)
Mongoid.load!(mongoid_path, :development)

# Create product name to tags map
products_by_tags_file_path = File.join(File.dirname(__FILE__), 'products_by_tags.json')
products_by_tags = JSON.parse(File.read(products_by_tags_file_path))

product_tags = Hash.new { |h, k| h[k] = [] }

products_by_tags.each do |tag, products|
    products.each do |product|
        product_tags[product["name"]] << tag
    end
end


# Read JSON data from file
file_path = File.join(File.dirname(__FILE__), 'products.json')
products_data = JSON.parse(File.read(file_path))

count = 0
# Iterate over the products and create them in the database
products_data.each do |product_data|
    puts "Creating product: #{product_data['name']}"
    count += 1
    product_data['creator'] = 'easlo'
    product_data['tags'] = product_tags[product_data['name']]
    # print product_name and tags
    puts "Product: #{product_data['name']}, Tags: #{product_data['tags']}"
    # drop these fields: id, remaining, is_sales_limited, duration_in_months, recurrence
    product_data.delete('id')
    product_data.delete('remaining')
    product_data.delete('is_sales_limited')
    product_data.delete('duration_in_months')
    product_data.delete('recurrence')
    Product.create!(product_data)
end

# get count of all products with creator = 'easlo' in db
puts Product.where(creator: 'easlo').count

puts "Created #{count} products"