from .db import db
from datetime import datetime

class Type(db.Model):
  __tablename__ = 'types'

  id = db.Column(db.Integer, primary_key = True)
  owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(255), nullable = False, unique = True)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                         server_onupdate=db.func.now())

  users = db.relationship("User", back_populates='types')
  catagories = db.relationship("Catagory", back_populates="types")
  items = db.relationship("Item", back_populates="types")
