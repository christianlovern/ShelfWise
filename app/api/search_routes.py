from flask import Blueprint, jsonify, request
from app.models import db, Item, Bookshelf, Shelf
from sqlalchemy.exc import IntegrityError

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:res>', methods=["GET"])
def search_res(res):
    bookshelfs = Bookshelf.query.filter(Bookshelf.name.ilike(f'%{res}%')).limit(5)
    if not bookshelfs:
        return {'Bookshelf does not exist, please try again...'}
    items = Item.query.filter(Item.name.ilike(f'%{res}%')).limit(5)
    if not items:
        return {'Item does not exist, please try again...'}
    return {
        "bookshelfs": [bookshelf.to_simple_dict() for bookshelf in bookshelfs],
        "items": [item.to_dict() for item in items]
    }

@search_routes.route('/bookshelf/<int:currBookshelfId>/<string:res>', methods=["GET"])
def search_bookshelf_res(currBookshelfId ,res):
    bookshelf = Bookshelf.query.filter(Bookshelf.id == currBookshelfId).first()
    shelves = Shelf.query.filter(Shelf.bookshelfId == bookshelf.id).all()
    for shelf in shelves:
        items = Item.query.filter(Item.name.ilike(f'%{res}%'), Item.shelfId == shelf.id ).limit(5)
        if not items:
            return {'Item does not exist, please try again...'}
        return {
            "items": [item.to_dict() for item in items]
        }

@search_routes.route('/shelf/<int:currshelfId>/<string:res>', methods=["GET"])
def search_shelf_res(currshelfId, res):
    items = Item.query.filter(Item.name.ilike(f'%{res}%'), Item.shelfId == currshelfId).limit(5)
    if not items:
        return {'Item does not exist, please try again...'}
    return {
        "items": [item.to_dict() for item in items]
    }
    