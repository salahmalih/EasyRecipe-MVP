from database import db

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.LargeBinary, nullable=False)
    roles = db.Column(db.String(100), nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)
    image_filename = db.Column(db.String(100), nullable=True)

    favourites = db.relationship('Favourite', back_populates='user', cascade='all, delete-orphan')


    def __init__(self, fullname, email, username, password, roles, image, image_filename):
        self.fullname = fullname
        self.email = email
        self.username = username
        self.password_hash = password
        self.roles = roles
        self.image = image
        self.image_filename = image_filename
