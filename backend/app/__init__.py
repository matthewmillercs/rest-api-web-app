from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gojetsgo@localhost/product-info'
db = SQLAlchemy(app)
CORS(app)

from app import routes, models