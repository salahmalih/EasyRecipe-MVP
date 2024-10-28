from database import db

class Favourite(db.Model):
    __tablename__ = 'favourites'
    Favourite_id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    user = db.relationship('Users', back_populates='favourites')
    recipe = db.relationship('Recipe', back_populates='favourites')

    def __init__(self, user_id, recipe_id):
        self.user_id = user_id
        self.recipe_id = recipe_id
