from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# create flask instance
app = Flask(__name__)
# add database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gojetsgo@localhost/product-info'
# initialize the database
db = SQLAlchemy(app)
CORS(app)

from app import routes, models