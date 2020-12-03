from .db import db
from datetime import datetime

class Item(db.Model):
  __tablename__ = 'items'

  id = db.Column(db.Integer, primary_key = True)
  typeId = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
  catagoryId = db.Column(db.Integer, db.ForeignKey('catagories.id'), nullable=False)
  shelfId = db.Column(db.Integer, db.ForeignKey('shelves.id'), nullable=False)
  name = db.Column(db.String(100), nullable = False, unique = True)
  description = db.Column(db.String(255))
  position = db.Column(db.String(50))
  favorite = db.Column(db.Boolean(), default=False, nullable=False)
  checked_out = db.Column(db.Boolean(), default=False, nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                         server_onupdate=db.func.now())

  types = db.relationship("Type", back_populates='items')
  shelves = db.relationship("Shelf", back_populates='items')
  catagories = db.relationship("Catagory", back_populates='items')
