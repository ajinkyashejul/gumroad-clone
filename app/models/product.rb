class Product
    include Mongoid::Document 
    field :external_id, type: String
    field :permalink, type: String
    field :name, type: String
    field :is_template_bundle, type: Mongoid::Boolean
    field :is_popular, type: Mongoid::Boolean
    field :is_hidden, type: Mongoid::Boolean
    field :creator, type: String
    field :ratings, type: Hash
    field :price, type: Integer
    field :currency_code, type: String
    field :thumbnail_url, type: String
    field :native_type, type: String
    field :is_pay_what_you_want, type: Mongoid::Boolean
    field :url, type: String
    field :covers, type: Array
    field :main_cover_id, type: String
    field :tags, type: Array
    field :file_types, type: Array
  end
  
  