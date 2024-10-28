from database import db

class Recipe_Ingredients(db.Model):
    __tablename__ = 'recipe_ingredients'
    Recipe_Ingredients_id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.Ingredient_id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='ingredients')
    ingredient = db.relationship('Ingredients', back_populates='recipes')

    def __init__(self, recipe_id, ingredient_id):
        self.recipe_id = recipe_id
        self.ingredient_id = ingredient_id
