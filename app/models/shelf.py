from .db import db
from datetime import datetime

class Shelf(db.Model):
  __tablename__ = 'shelves'

  id = db.Column(db.Integer, primary_key = True)
  bookshelfId = db.Column(db.Integer, db.ForeignKey('bookshelves.id'), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                         server_onupdate=db.func.now())

  bookshelves = db.relationship("Bookshelf", back_populates='shelves')
  items = db.relationship("Item", back_populates='shelves')


  
  def to_simple_dict(self):
    return {
      "id":self.id,
      "bookshelfId":self.bookshelfId
    }