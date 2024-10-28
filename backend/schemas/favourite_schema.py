from database import ma
from models.favourite import Favourite
from schemas.users_schema import user_schema
from schemas.recipe_schema import recipe_schema

class FavouriteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('Favourite_id', 'user_id', 'recipe_id', 'user', 'recipe')
        include_fk = True
        load_instance = True


favourite_schema = FavouriteSchema()
favourites_schema = FavouriteSchema(many=True)
