from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from ..models import db, Bookshelf, User, Item, Shelf, Type, Catagory
from ..forms.bookshelf_form import BookshelfForm
from sqlalchemy.exc import IntegrityError
from .auth_routes import validation_errors_to_error_messages

bookshelf_routes = Blueprint('bookshelf', __name__)

@bookshelf_routes.route('/create', methods=["POST"])
@login_required
def create_bookshelf():

    form = BookshelfForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            bookshelf = Bookshelf(
                name=form.data['name'],
                about=form.data['about'],
                owner=current_user.id
            )
            db.session.add(bookshelf)
            db.session.commit()
            return bookshelf.to_simple_dict()
        except IntegrityError:
            return {"errors": "Bookshelf already exists, please choose a different name"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


