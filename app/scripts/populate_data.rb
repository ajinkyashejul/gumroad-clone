require 'json'
require 'mongoid'

# Adjust the relative path as necessary to point to your Rails application's environment file
require_relative '../../config/environment.rb'

# Load Mongoid config (ensure this points to your Mongoid config file)
Mongoid.load!('/Users/ajinkyashejul/Documents/dev/gumroad-clone/config/mongoid.yml', :development)

# Define your Product model here if not already defined

# Read JSON data from file
file_path = File.join(File.dirname(__FILE__), 'products.json')
products_data = JSON.parse(File.read(file_path))

count = 0
# Iterate over the products and create them in the database
products_data.each do |product_data|
    puts "Creating product: #{product_data['name']}"
    count += 1
    product_data['creator'] = 'easlo'
    # drop these fields: id, remaining, is_sales_limited, duration_in_months, recurrence
    product_data.delete('id')
    product_data.delete('remaining')
    product_data.delete('is_sales_limited')
    product_data.delete('duration_in_months')
    product_data.delete('recurrence')
    Product.create!(product_data)
end

puts "Created #{count} products"