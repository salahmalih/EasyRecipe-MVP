from database import ma
from models.ingredients import Ingredients

class IngredientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('Ingredient_id', 'name','category')
        include_fk = True
        load_instance = True

ingredient_schema = IngredientSchema()
ingredient_schema = IngredientSchema(many=True)