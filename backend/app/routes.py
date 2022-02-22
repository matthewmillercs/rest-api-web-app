from flask import request
from app import app
from app.models import create_product, get_products

# create a product
@app.route('/create-product', methods = ['POST'])
def create():
    product_name = request.json['product_name']
    if not product_name: 
        return {}, 400
    product_ingredients = request.json['product_ingredients']
    return create_product(product_name, product_ingredients)

# get all products
@app.route('/get-products', methods = ['GET'])
def get():
    return get_products()