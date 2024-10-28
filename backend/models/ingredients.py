from database import db

class Ingredients(db.Model):
    __tablename__ = 'ingredients'
    Ingredient_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=True)

    recipes = db.relationship('Recipe_Ingredients', back_populates='ingredient', cascade='all, delete-orphan')


    def __init__(self, name,category):
        self.name = name
        self.category = category

