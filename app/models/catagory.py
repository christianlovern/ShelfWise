from .db import db
from datetime import datetime

class Catagory(db.Model):
  __tablename__ = 'catagories'

  id = db.Column(db.Integer, primary_key = True)
  typeId = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
  name = db.Column(db.String(255), nullable = False, unique = True)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                         server_onupdate=db.func.now())

  types = db.relationship("Type", back_populates='catagories')
  items = db.relationship("Item", back_populates='catagories')
