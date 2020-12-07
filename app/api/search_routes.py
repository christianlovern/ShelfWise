from flask import Blueprint, jsonify, request
from app.models import db, Item, Bookshelf
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
    