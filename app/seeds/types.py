from app.models import db, Type

# Adds a demo user, you can add other users here if you want
def seed_types(user_list):
    type_list = [
        Type(owner=user_list[0].id, name="Book"),
        Type(owner=user_list[0].id, name="Movie"),
        Type(owner=user_list[0].id, name="Music")
    ]
    

    db.session.add_all(type_list)

    db.session.commit()
    return type_list


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_types():
    db.session.execute('TRUNCATE types CASCADE;')
    db.session.commit()
