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
    print(form.data['name'])
    print(form.data['about'])
    print(form.data['shelves'])
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("In post")
        try:
            bookshelf = Bookshelf(
                name=form.data['name'],
                about=form.data['about'],
                owner=current_user.id
            )
            
            db.session.add(bookshelf)
            db.session.commit()

            for shelf in range(form.data['shelves']):
                currShelf = Shelf(
                    bookshelfId=bookshelf.id,
                )
                db.session.add(currShelf)


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
    bookshelf= Bookshelf.query.filter(Bookshelf.name == name).first()
    shelves = Shelf.query.filter(bookshelf.id == Shelf.bookshelfId).all()
    shelves_list = [shelf.to_simple_dict() for shelf in shelves]
    return {'shelf_list': shelves_list}

@bookshelf_routes.route('/shelf/<int:id>/name')
@login_required
def get_bookshelf(id):
    shelf = Shelf.query.filter(Shelf.id == id).first()
    bookshelf = Bookshelf.query.filter(Bookshelf.id == shelf.bookshelfId).first()
    shelves = Shelf.query.filter(bookshelf.id == Shelf.bookshelfId).all()
    shelves_list = [shelf.to_simple_dict() for shelf in shelves]
    return {'bookshelf': bookshelf.name, 'shelf_list': shelves_list}