from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Item
from sqlalchemy.exc import IntegrityError
from ..models import db, Bookshelf, User, Item, Shelf, Type, Catagory
from ..forms.item_form import ItemForm

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

@item_routes.route('/create', methods=["POST"])
@login_required
def createItem():
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            item = Item(
                name = form.data['name'],
                description = form.data["description"],
                favorite = form.data['favorite'],
                typeId = form.data['type'],
                catagoryId = form.data['catagory'],
                shelfId = form.data['shelf'],
            )
            db.session.add(item)
            db.session.commit()
            return item.to_dict()
        except IntegrityError:
            return {"errors": "Could not create item at this time"}
    return {'errors': "Could not create item"}, 401


@item_routes.route('/<int:shelfId>')
@login_required
def items_by_shelfid(shelfId):
    items = Item.query.filter(Item.shelfId == shelfId).all()
    item_list = [item.to_dict() for item in items]
    return {"item_list": item_list}
