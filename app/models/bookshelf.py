from .db import db
from datetime import datetime

class Bookshelf(db.Model):
  __tablename__ = 'bookshelves'

  id = db.Column(db.Integer, primary_key = True)
  owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(50), nullable = False, unique = True)
  about = db.Column(db.String(255), nullable = False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                         server_onupdate=db.func.now())

  users = db.relationship("User", back_populates='bookshelves')
  shelves = db.relationship("Shelf", back_populates='bookshelves')

  def to_simple_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'about': self.about,
        }