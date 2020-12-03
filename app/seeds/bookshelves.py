from app.models import db, Bookshelf

# Adds a demo user, you can add other users here if you want
def seed_bookshelves(user_list):
    print()
    bookshelf_list = [
        Bookshelf(owner=user_list[0].id, name='Movies', about='This is my main bookshelf for my movies'),
        Bookshelf(owner=user_list[0].id, name='Books', about='This is my main bookshelf for my Books'),
        Bookshelf(owner=user_list[0].id, name='Music', about='This is my main bookshelf for my Albums'),
    ]
    

    db.session.add_all(bookshelf_list)

    db.session.commit()
    return bookshelf_list
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_bookshelves():
    db.session.execute('TRUNCATE bookshelves CASCADE;')
    db.session.commit()
