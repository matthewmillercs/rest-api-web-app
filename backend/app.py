from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gojetsgo@localhost/product-info'
db = SQLAlchemy(app)
CORS(app)

class ProductInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    product_ingredients = db.Column(db.ARRAY(db.String), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"ProductInfo: {self.product_name}"

    def __init__(self, product_name, product_ingredients):
        self.product_name = product_name
        self.product_ingredients = product_ingredients

def format_product_info(product_info):
    return {
        "product_name": product_info.product_name,
        "product_ingredients": product_info.product_ingredients,
        "id": product_info.id,
        "created_at": product_info.created_at
    }


@app.route('/')
def hello():
    return 'Hello'

# create a product
@app.route('/create-product', methods = ['POST'])
def create_product():
    product_name = request.json['product_name']
    product_ingredients = request.json['product_ingredients']
    product_info = ProductInfo(product_name, product_ingredients)
    db.session.add(product_info)
    db.session.commit()
    return format_product_info(product_info)

# get all products
@app.route('/get-products', methods = ['GET'])
def get_products():
    products = ProductInfo.query.order_by(ProductInfo.id.asc()).all()
    product_list = []
    for product in products: 
        product_list.append(format_product_info(product))
    return {'products': product_list}

if __name__ == '__main__':
    app.run()