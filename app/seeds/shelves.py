from app.models import db, Shelf

# Adds a demo user, you can add other users here if you want
def seed_shelves(bookshelf_list):
    shelf_list = [
        Shelf(bookshelfId=bookshelf_list[0].id),
        Shelf(bookshelfId=bookshelf_list[0].id),
        Shelf(bookshelfId=bookshelf_list[0].id),
        Shelf(bookshelfId=bookshelf_list[0].id),
        Shelf(bookshelfId=bookshelf_list[1].id),
        Shelf(bookshelfId=bookshelf_list[1].id),
        Shelf(bookshelfId=bookshelf_list[1].id),
        Shelf(bookshelfId=bookshelf_list[1].id),
        Shelf(bookshelfId=bookshelf_list[2].id),
        Shelf(bookshelfId=bookshelf_list[2].id),
        Shelf(bookshelfId=bookshelf_list[2].id),
        Shelf(bookshelfId=bookshelf_list[2].id),
    ]
    

    db.session.add_all(shelf_list)

    db.session.commit()
    return shelf_list
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_shelves():
    db.session.execute('TRUNCATE shelves CASCADE;')
    db.session.commit()
