json.extract! product, :id, :slug, :name, :description, :price, :available_on
json.has_variants product.has_variants?
json.master do
  json.partial! 'spree/products/master.json', locals: { master: product.master }
end
json.product_properties(product.product_properties) do |prop|
  json.extract! prop, :id, :property_id, :value, :property_name
end
