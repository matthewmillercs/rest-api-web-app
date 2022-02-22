import json
from sqlalchemy import func
from app import db, app

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, product_name):
        self.product_name = product_name

    def __getitem__(self, field):
        return self.__dict__[field]

class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, ingredient_name):
        self.ingredient_name = ingredient_name

    def __getitem__(self, field):
            return self.__dict__[field]

class ProductsIngredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=False)
    ingredient_id = db.Column(db.Integer, nullable=False)

    def __init__(self, product_id, ingredient_id):
        self.product_id = product_id
        self.ingredient_id = ingredient_id

    def __getitem__(self, field):
        return self.__dict__[field]

def create_product(product_name, product_ingredients):
    p_name_exists = db.session.query(Products.id).filter_by(product_name=product_name).scalar() is not None
    if (p_name_exists):
        return {}
    p_name = Products(product_name)
    db.session.add(p_name)
    p_id = db.session.query(func.max(Products.id)).scalar()

    for ingredient in product_ingredients:
        existing_i_id = db.session.query(Ingredients.id).filter_by(ingredient_name=ingredient)
        if existing_i_id.scalar() is None:
            p_ingredient = Ingredients(ingredient)
            db.session.add(p_ingredient)
            i_id = db.session.query(func.max(Ingredients.id)).scalar()
            p_relationship = ProductsIngredients(p_id, i_id)
            db.session.add(p_relationship)
        else:
            p_relationship = ProductsIngredients(p_id, existing_i_id)
            db.session.add(p_relationship)

    db.session.commit()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

def get_products():
    products = Products.query.order_by(Products.id.asc()).all()
    ingredients = Ingredients.query.order_by(Ingredients.id.asc()).all()
    relationships = ProductsIngredients.query.order_by(ProductsIngredients.id.asc()).all()
    product_list = []
    for p in products: 
        p_id = p["id"]
        p_name = p["product_name"]
        p_ingredients = []
        for r in relationships:
            if r["product_id"] == p_id:
                print(r["ingredient_id"])
                print(ingredients[4]["ingredient_name"])
                p_ingredients.append(ingredients[r["ingredient_id"]-1]["ingredient_name"])
        product_list.append({
            "product_name": p_name,
            "product_ingredients": p_ingredients
        })
    return json.dumps({'products': product_list})

if __name__ == '__main__':
    app.run()