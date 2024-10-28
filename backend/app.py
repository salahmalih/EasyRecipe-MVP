import base64
from flask import Flask, request, jsonify, send_file
import pymysql
from database import db, ma
from models.recipe import Recipe
from schemas.recipe_schema import recipe_schema, recipes_schema
from marshmallow import ValidationError
from flask_cors import CORS
from werkzeug.utils import secure_filename
import io

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/db_easyrecipe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/images'
db.init_app(app)
ma.init_app(app)

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    response = []
    for recipe in recipes:
        image_base64 = base64.b64encode(recipe.image).decode('utf-8') if recipe.image else None
        recipe_data = {
            'id': recipe.recipe_id,
            'title': recipe.title,
            'description': recipe.description,
            'instructions': recipe.instructions,
            'date': recipe.date.isoformat(),
            'image': image_base64
        }
        response.append(recipe_data)
    return jsonify(response)

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    image_base64 = base64.b64encode(recipe.image).decode('utf-8') if recipe.image else None
    recipe_data = {
        'id': recipe.recipe_id,
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
    db.session.commit()
    return jsonify({'message': 'Recipe created successfully'}), 201

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

    db.session.commit()
    return jsonify(recipe_schema.dump(recipe))

@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)