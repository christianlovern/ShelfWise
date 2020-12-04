from app.models import db, Catagory

# Adds a demo user, you can add other users here if you want
def seed_catagories(type_list, user_list):
    catagory_list = [
        Catagory(owner=user_list[0].id , typeId=type_list[0].id, name="Fiction"),
        Catagory(owner=user_list[0].id ,typeId=type_list[1].id, name="Sci-Fi"),
        Catagory(owner=user_list[0].id ,typeId=type_list[2].id, name="Alternative")
    ]
    

    db.session.add_all(catagory_list)

    db.session.commit()
    return catagory_list
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_catagories():
    db.session.execute('TRUNCATE catagories CASCADE;')
    db.session.commit()
