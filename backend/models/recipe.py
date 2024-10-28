import datetime
from database import db

class Recipe(db.Model):
    recipe_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    instructions = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)
    image_filename = db.Column(db.String(100), nullable=True)

    def __init__(self, title, instructions, description, image, image_filename):
        self.title = title
        self.instructions = instructions
        self.description = description
        self.image_filename = image_filename
        self.image = image
