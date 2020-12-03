from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bookshelves import seed_bookshelves, undo_bookshelves
from .catagories import seed_catagories, undo_catagories
from .items import seed_items, undo_items
from .shelves import seed_shelves, undo_shelves
from .types import seed_types, undo_types

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    users = seed_users()
    bookshelves = seed_bookshelves(users)
    types = seed_types(users)
    catagories = seed_catagories(types)
    shelves = seed_shelves(bookshelves)
    items = seed_items(shelves, types, catagories)
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_bookshelves()
    undo_catagories()
    undo_items()
    undo_shelves()
    undo_types()
    # Add other undo functions here
