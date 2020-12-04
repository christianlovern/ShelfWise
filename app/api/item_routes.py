from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Item
from ..models import db, Bookshelf, User, Item, Shelf, Type, Catagory

item_routes = Blueprint('items', __name__)

@item_routes.route('/checked')
@login_required
def checked():
    items = Item.query.filter(Item.checked_out == True).all()
    return {"items": [item.to_dict() for item in items]}

@item_routes.route('/<int:id>/checked', methods=["PATCH"])
@login_required
def updateChecked(id):
    print("fetch interior")
    item = Item.query.filter(Item.id == id).first()
    setattr(item, "checked_out", not item.checked_out)
    db.session.commit();
    return {"item": item.checked_out}
