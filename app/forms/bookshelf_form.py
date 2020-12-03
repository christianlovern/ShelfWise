from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Bookshelf


def bookshelf_exists(form, field):
    print("Checking if bookshelf exists", field.data)
    name = field.data
    bookshelf = Bookshelf.query.filter(Bookshelf.name == name).first()
    if bookshelf:
        raise ValidationError("bookshelf already exists.")


class BookshelfForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), bookshelf_exists])
    about = TextAreaField('about')