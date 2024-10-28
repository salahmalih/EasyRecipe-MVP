from database import ma
from schemas.ingredients_schema import ingredient_schema
from schemas.recipe_schema import recipe_schema


class Recipe_IngredientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('Recipe_Ingredients_id','recipe_id', 'ingredient_id', 'ingredient', 'recipe')
        include_fk = True
        load_instance = True

    ingredient = ma.Nested(ingredient_schema)
    recipe = ma.Nested(recipe_schema)

Recipe_Ingredient_schema = Recipe_IngredientSchema()
Recipe_Ingredient_schema = Recipe_IngredientSchema(many=True)
