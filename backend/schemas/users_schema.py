from database import ma
from models.users import Users

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('user_id', 'fullname', 'email', 'username', 'password_hash', 'roles', 'image', 'image_filename')
        include_fk = True
        load_instance = True
user_schema = UserSchema()
users_schema = UserSchema(many=True)
