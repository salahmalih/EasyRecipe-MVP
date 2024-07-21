from database import ma
from models.recipe import Recipe

class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('recipe_id', 'title','date', 'instructions', 'description', 'image', 'image_filename','ingredients')

        include_fk = True
        load_instance = True

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)