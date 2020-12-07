from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Bookshelf


class ItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    favorite = BooleanField('favorite')
    type = IntegerField('type')
    catagory = IntegerField('catagory')
    shelf = IntegerField('shelf')