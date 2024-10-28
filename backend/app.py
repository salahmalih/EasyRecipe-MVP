import base64
from flask import Flask, request, jsonify, send_file, session
import pymysql
from database import db, ma
from models.recipe import Recipe
from schemas.recipe_schema import recipe_schema, recipes_schema
from marshmallow import ValidationError
from flask_cors import CORS
from werkzeug.utils import secure_filename
from models.users import Users
from models.favourite import Favourite
from models.ingredients import Ingredients
from models.recipe_ingredients import Recipe_Ingredients
from werkzeug.security import generate_password_hash, check_password_hash
import json
from functools import wraps
import os
import hashlib
from flask_session import Session
import redis
import secrets
from datetime import timedelta

pymysql.install_as_MySQLdb()
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'mysql+pymysql://root:@localhost/db_easyrecipe')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/images'

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', secrets.token_hex(16))
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'session:'
app.config['SESSION_REDIS'] = redis.StrictRedis(host='localhost', port=6379, db=0)
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True if using HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # CSRF protection
app.config['SESSION_COOKIE_NAME'] = '_Auth'
app.config['SESSION_PERMANENT'] = True  # Sessions will use expiration
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)  # Set session expiration time (e.g., 1 day)
CORS(app, supports_credentials=True)

db.init_app(app)
ma.init_app(app)

server_session = Session(app)

# Custom password functions
def custom_generate_password_hash(password):
    salt = os.urandom(32)
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt + password_hash

def custom_check_password_hash(stored_password, provided_password):
    salt = stored_password[:32]
    stored_password_hash = stored_password[32:]
    password_hash = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt, 100000)
    return password_hash == stored_password_hash


 # RECIPES 
@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    response = []
    for recipe in recipes:
        image_base64 = base64.b64encode(recipe.image).decode('utf-8') if recipe.image else None
        recipe_data = {
            'recipe_id': recipe.recipe_id,
            'title': recipe.title,
            'description': recipe.description,
            'instructions': recipe.instructions,
            'date': recipe.date.isoformat(),
            'image': image_base64,
            'image_filename': recipe.image_filename,
        }
        response.append(recipe_data)
    return jsonify(response)

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    image_base64 = base64.b64encode(recipe.image).decode('utf-8') if recipe.image else None
    recipe_data = {
        'recipe_id': recipe.recipe_id,
        'title': recipe.title,
        'description': recipe.description,
        'instructions': recipe.instructions,
        'date': recipe.date.isoformat(),
        'image': image_base64
    }
    return jsonify(recipe_data)

@app.route('/recipes', methods=['POST'])
def create_recipe():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
        image = request.files.get('image')
        if image:
            filename = secure_filename(image.filename)
            image_data = image.read()
            data['image_filename']=filename
            data['image'] = image_data
    elif request.content_type == 'application/json':
        data = request.get_json()
        data['image_filename'] = None
        data['image'] = None
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    new_recipe = Recipe(
        title=data['title'],
        instructions=data['instructions'],
        description=data['description'],
        image_filename=data['image_filename'],
        image=data['image']
    )
    db.session.add(new_recipe)
    db.session.flush()
    if 'ingredients' in data:
        ingredients = json.loads(data['ingredients'])
        for ingredient_data in ingredients:
            ingredient_id = ingredient_data.get('ingredient_id')
            new_recipe_ingredient = Recipe_Ingredients(
                recipe_id=new_recipe.recipe_id,
                ingredient_id=ingredient_id
            )
            db.session.add(new_recipe_ingredient)

    db.session.commit()
    return jsonify({'message': 'Recipe created successfully', 'recipe_id': new_recipe.recipe_id}), 201

@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)

    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
        image = request.files.get('image')
        if image:
            filename = secure_filename(image.filename)
            image_data = image.read()
            data['image_filename'] = filename
            data['image'] = image_data
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Updating fields
    if 'title' in data:
        recipe.title = data['title']
    if 'instructions' in data:
        recipe.instructions = data['instructions']
    if 'description' in data:
        recipe.description = data['description']
    if 'image_filename' in data:
        recipe.image_filename = data['image_filename']
    if 'image' in data:
        recipe.image = data['image']

    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'}), 200

@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})



 # USERS
@app.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    response = []
    for user in users:
        image_base64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
        users_data = {
            'user_id': user.user_id,
            'fullname': user.fullname,
            'email': user.email,
            'username': user.username,
            'roles': user.roles,
            'image': image_base64,
            'image_filename': user.image_filename,
        }
        response.append(users_data)
    return jsonify(response)

@app.route('/users/<string:userN>', methods=['GET'])
def get_user(userN):
    user = Users.query.filter_by(username=userN).first_or_404()
    image_base64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
    user_data = {
        'user_id': user.user_id,
        'fullname': user.fullname,
        'email': user.email,
        'username': user.username,
        'roles': user.roles,
        'image': image_base64,
    }
    return jsonify(user_data)

@app.route('/users', methods=['POST'])
def create_user():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
        image = request.files.get('image')
        if image:
            filename = secure_filename(image.filename)
            image_data = image.read()
            data['image_filename'] = filename
            data['image'] = image_data
    elif request.content_type == 'application/json':
        data = request.get_json()
        data['image_filename'] = None
        data['image'] = None
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Encrypt password
    password_hash = custom_generate_password_hash(data['password'])

    new_user = Users(
        fullname=data['fullname'],
        email=data['email'],
        username=data['username'],
        password=password_hash,
        roles=data['roles'],
        image_filename=data['image_filename'],
        image=data['image']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = Users.query.get_or_404(user_id)

    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
        image = request.files.get('image')
        if image:
            filename = secure_filename(image.filename)
            image_data = image.read()
            data['image_filename'] = filename
            data['image'] = image_data
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Update user fields
    user.fullname = data.get('fullname', user.fullname)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = custom_generate_password_hash(data['password'])  # Make sure to hash the password
    if 'image' in data:
        user.image = data['image']

    db.session.commit()  # Save changes to the database
    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/users/<int:user_id>/verify-password', methods=['POST'])
def verify_password(user_id):
    user = Users.query.get_or_404(user_id)
    data = request.get_json()
    password = data.get('password')

    if custom_check_password_hash(user.password_hash, password):  # Implement this method to check the hashed password
        return jsonify({'valid': True}), 200
    return jsonify({'valid': False}), 403

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

#INGREDIENTS

@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    ingredients = Ingredients.query.all()
    response = []
    for ingredient in ingredients:
        ingredients_data = {
            'ingredient_id': ingredient.Ingredient_id,
            'name': ingredient.name,
            'category': ingredient.category,
        }
        response.append(ingredients_data)
    return jsonify(response)

@app.route('/ingredients/<int:ingredient_id>', methods=['GET'])
def get_ingredient(ingredient_id):
    ingredient = Ingredients.query.get_or_404(ingredient_id)
    ingredient_data = {
        'ingredient_id': ingredient.Ingredient_id,
        'title': ingredient.name,
        'description': ingredient.category,
    }
    return jsonify(ingredient_data)

@app.route('/ingredients', methods=['POST'])
def create_ingredients():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    new_ingredient = Ingredients(
        name=data['name'],
        category=data['category'],
    )
    db.session.add(new_ingredient)
    db.session.commit()
    return jsonify({'message': 'Ingredient created successfully'}), 201

@app.route('/ingredients/<int:ingredient_id>', methods=['PUT'])
def update_ingredient(ingredient_id):
    ingredient = Ingredients.query.get_or_404(ingredient_id)

    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Updating fields
    if 'name' in data:
        ingredient.name = data['name']
    if 'category' in data:
        ingredient.category = data['category']

    db.session.commit()
    return jsonify({'message': 'Ingredient updated successfully'}), 200

@app.route('/ingredients/<int:ingredient_id>', methods=['DELETE'])
def delete_ingredient(ingredient_id):
    ingredient = Ingredients.query.get_or_404(ingredient_id)
    db.session.delete(ingredient)
    db.session.commit()
    return jsonify({'message': 'Ingredient deleted successfully'})

# FAVOURITE
@app.route('/favourites', methods=['GET'])
def get_favourites():
    favourites = Favourite.query.all()
    response = []
    for favourite in favourites:
        favourites_data = {
            'Favourite_id': favourite.Favourite_id,
            'recipe_id': favourite.recipe_id,
            'user_id': favourite.user_id,
        }
        response.append(favourites_data)
    return jsonify(response)

@app.route('/favourites/<int:favourite_id>', methods=['GET'])
def get_favourite(favourite_id):
    favourite = Favourite.query.get_or_404(favourite_id)
    favourite_data = {
        'Favourite_id': favourite.Favourite_id,
        'recipe_id': favourite.name,
        'user_id': favourite.category,
    }
    return jsonify(favourite_data)

@app.route('/favourites', methods=['POST'])
def create_favourites():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    new_favourite = Favourite(
        recipe_id=data['recipe_id'],
        user_id=data['user_id'],
    )
    db.session.add(new_favourite)
    db.session.commit()
    return jsonify({'message': 'Favourite created successfully'}), 201

@app.route('/favourites/<int:favourite_id>', methods=['PUT'])
def update_favourite(favourite_id):
    favourite = Favourite.query.get_or_404(favourite_id)

    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Updating fields
    if 'recipe_id' in data:
        favourite.recipe_id = data['recipe_id']
    if 'user_id' in data:
        favourite.user_id = data['user_id']

    db.session.commit()
    return jsonify({'message': 'Favourite updated successfully'}), 200

@app.route('/favourites/<int:favourite_id>', methods=['DELETE'])
def delete_Favourite(favourite_id):
    favourite = Favourite.query.get_or_404(favourite_id)
    db.session.delete(favourite)
    db.session.commit()
    return jsonify({'message': 'Favourite deleted successfully'})


#Recipe_Ingredients
@app.route('/recipe_ingredients', methods=['GET'])
def get_recipe_ingredients():
    recipe_ingredients = Recipe_Ingredients.query.all()
    response = []
    for recipe_ingredient in recipe_ingredients:
        recipe_ingredient_data = {
            'Recipe_Ingredients_id': recipe_ingredient.Recipe_Ingredients_id,
            'recipe_id': recipe_ingredient.recipe_id,
            'ingredient_id': recipe_ingredient.ingredient_id,
        }
        response.append(recipe_ingredient_data)
    return jsonify(response)

@app.route('/recipe_ingredients/<int:recipe_ingredient_id>', methods=['GET'])
def get_recipe_ingredient(recipe_ingredient_id):
    recipe_ingredient = Recipe_Ingredients.query.get_or_404(recipe_ingredient_id)
    recipe_ingredient_data = {
        'Favourite_id': recipe_ingredient.Recipe_Ingredients_id,
        'recipe_id': recipe_ingredient.recipe_id,
        'user_id': recipe_ingredient.ingredient_id,
    }
    return jsonify(recipe_ingredient_data)

@app.route('/recipe_ingredients', methods=['POST'])
def create_recipe_ingredients():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    new_recipe_ingredients = Recipe_Ingredients(
        recipe_id=data['recipe_id'],
        ingredient_id=data['ingredient_id'],
    )
    db.session.add(new_recipe_ingredients)
    db.session.commit()
    return jsonify({'message': 'Recipe Ingredients created successfully'}), 201

@app.route('/recipe_ingredients/<int:recipe_ingredient_id>', methods=['PUT'])
def update_recipe_ingredients(recipe_ingredient_id):
    recipe_ingredient = Recipe_Ingredients.query.get_or_404(recipe_ingredient_id)

    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    # Updating fields
    if 'recipe_id' in data:
        recipe_ingredient.recipe_id = data['recipe_id']
    if 'ingredient_id' in data:
        recipe_ingredient.ingredient_id = data['ingredient_id']

    db.session.commit()
    return jsonify({'message': 'Recipe Ingredient updated successfully'}), 200

@app.route('/recipe_ingredients/<int:recipe_ingredient_id>', methods=['DELETE'])
def delete_recipe_ingredient(recipe_ingredient_id):
    recipe_ingredient = Recipe_Ingredients.query.get_or_404(recipe_ingredient_id)
    db.session.delete(recipe_ingredient)
    db.session.commit()
    return jsonify({'message': 'Favourite deleted successfully'})


# Login function
@app.route('/login_admin', methods=['POST'])
def login_admin():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username or password missing'}), 400

    user = Users.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Verify password using custom function
    password_correct = custom_check_password_hash(user.password_hash, password)

    if password_correct and user.roles == 'admin':
        # Login successful, prepare response with additional data
        image_base64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
        response_data = {
            'message': 'Login successful',
            'fullname': user.fullname,
            'image': image_base64,
            'role': user.roles
        }
        return jsonify(response_data), 200
    elif not password_correct:
        return jsonify({'error': 'Invalid password', 'provided_password': password}), 401
    else:
        return jsonify({'error': 'User does not have admin role'}), 403


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    fullname = data.get('fullname')
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if Users.query.filter_by(username=username).first() or Users.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    password_hash = custom_generate_password_hash(password)
    new_user = Users(
        fullname=fullname,
        email=email,
        username=username,
        password=password_hash,
        roles="Member",
        image_filename=None,
        image=None,
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    if request.content_type.startswith('multipart/form-data'):
        data = request.form.to_dict()
    elif request.content_type == 'application/json':
        data = request.get_json()
    else:
        return jsonify({'error': 'Unsupported Media Type'}), 415
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    user = Users.query.filter_by(username=username).first()
    if user and custom_check_password_hash(user.password_hash, password):
        session["user_username"] = user.username
        print(f"Session data: {session}")
        return jsonify({'message': 'Login successful', 'user': {'username': user.username}}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401



@app.route("/@me")
def get_current_user():
    user_username = session.get("user_username")
    print(f"Session user_username: {user_username}")  # Debug print

    if not user_username:
        return jsonify({"error": "Unauthorized"}), 401
    user = Users.query.filter_by(username=user_username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    image_base64 = base64.b64encode(user.image).decode('utf-8') if user.image else None
    favorites = Favourite.query.filter_by(user_id=user.user_id).count()
    user_data = {
        'user_id': user.user_id,
        'fullname': user.fullname,
        'email': user.email,
        'username': user.username,
        'image': image_base64,
        'favorites': favorites,
    }
    return jsonify(user_data)

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clear session data
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_favorite_recipes(user_id):
    favorites = Favourite.query.filter_by(user_id=user_id).all()
    favorite_recipes = []
    for favorite in favorites:
        recipe = Recipe.query.get(favorite.recipe_id)
        if recipe:
            image_base64 = base64.b64encode(recipe.image).decode('utf-8') if recipe.image else None
            favorite_recipes.append({
                'recipe_id': recipe.recipe_id,
                'title': recipe.title,
                'description': recipe.description,
                'instructions': recipe.instructions,
                'date': recipe.date.isoformat(),
                'image': image_base64,
                'image_filename': recipe.image_filename,
            })
    return jsonify(favorite_recipes)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    users = Users.query.count()
    recipes = Recipe.query.count() 
    ingredients = Ingredients.query.count()
    favorites = Favourite.query.count()
    return jsonify({
        'users': users,
        'recipes': recipes,
        'ingredients': ingredients,
        'favorites': favorites,
    })

def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)