# rest-api-web-app

# Setting Up

## Install dependencies
- Python v3.10
- PostgreSQL v14
- Yarn or npm

## Install python dependencies with pip or Homebrew
- flask
- flask-sqlalchemy
- psycopg2-binary
- python-dotenv
- flask-cors

## Setup PostgreSQL database
- navigate to **backend/** and open python3 shell

```
cd backend/
python3
```
   
- run the create_all() method to create the database and tables:

```
cd backend/
from app import db
db.create_all()
```

## Run backend

- navigate to **backend/**
- start flask server
```
flask run
```

## Run frontend

- navigate to **rest-api-web-app/**
- install dependencies
```
yarn install
```
- start application
```
yarn dev
# or
npm run dev
```
- open http://localhost:3000 in browser
