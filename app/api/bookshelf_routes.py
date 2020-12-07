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
            i = form.data['shelves']

            for (j = 0; j < i; j++):
                shelf = Shelf(
                    bookshelfId=bookshelf.id,
                )
                db.session.add(shelf)


            db.session.add(bookshelf)
            db.session.commit()
            return bookshelf.to_simple_dict()
        except IntegrityError:
            return {"errors": "Bookshelf already exists, please choose a different name"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@bookshelf_routes.route('/<int:id>/shelves')
@login_required
def get_bookshelf_shelves(id):
    bookeshelf= Bookshelf.query.filter(Bookshelf.id == id).first()
    shelves = Shelf.query.filter(bookeshelf.id == Shelf.bookshelfId).all()
    shelves_list = [shelf.to_simple_dict() for shelf in shelves]
    return {'shelf_list': shelves_list}

@bookshelf_routes.route('/search/<string:name>/shelves')
@login_required
def get_shelves(name):
    bookeshelf= Bookshelf.query.filter(Bookshelf.name == name).first()
    shelves = Shelf.query.filter(bookeshelf.id == Shelf.bookshelfId).all()
    shelves_list = [shelf.to_simple_dict() for shelf in shelves]
    return {'shelf_list': shelves_list}

