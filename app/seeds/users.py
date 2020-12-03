from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    user_list = [
        User(username='Demo',firstname='Demo',lastname='User', email='demo@aa.io',
                password='password'),
        User(username='DemoFriend', firstname='Demo',lastname='Friend', email='demofriend@aa.io',
                password='password'),
    ]
    

    db.session.add_all(user_list)

    db.session.commit()
    return user_list

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
