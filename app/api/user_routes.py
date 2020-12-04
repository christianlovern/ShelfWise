from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from ..models import Bookshelf, User, Item, Shelf, Type, Catagory

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/bookshelves')
@login_required
def user_bookshelves(id):
    bookshelves = Bookshelf.query.filter(Bookshelf.owner == id).all()
    bookshelf_list = [bookshelf.to_simple_dict() for (bookshelf) in bookshelves]
    return {'bookshelf_list': bookshelf_list}

@user_routes.route('/<int:id>/types')
@login_required
def user_types(id):
    types = Type.query.filter(Type.owner == id).all()
    type_list = [type.to_simple_dict() for type in types]
    return {'type_list': type_list}

@user_routes.route('/<int:id>/catagories')
@login_required
def user_catagories(id):
    catagories = Catagory.query.filter(Catagory.owner == id).all()
    catagory_list = [catagory.to_simple_dict() for catagory in catagories]
    return {'catagory_list': catagory_list}

