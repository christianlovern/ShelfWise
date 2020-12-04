from app.models import db, Item

# Adds a demo user, you can add other users here if you want
def seed_items(shelf_list, type_list, catagory_list):
    item_list = [
        Item(typeId=type_list[0].id, catagoryId=catagory_list[0].id, shelfId=shelf_list[0].id,
            name="The Hunger Games", description="Author: Suzanne Collins, A really cool book with a girl and a bow",
            position="1", favorite=True, checked_out=False
        ),
        Item(typeId=type_list[0].id, catagoryId=catagory_list[0].id, shelfId=shelf_list[0].id,
            name="The Vanishing Half", description="Author: Brit Bennett, A coming-of-age story",
            position="2", favorite=False, checked_out=True
        ),
        Item(typeId=type_list[0].id, catagoryId=catagory_list[0].id, shelfId=shelf_list[0].id,
            name="The Glass Hotel", description="Author: Emily St. John Mandel, It follows the aftermath of a disturbing graffiti incident at a hotel on Vancouver Island and the collapse of an international Ponzi scheme",
            position="3", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[0].id, catagoryId=catagory_list[0].id, shelfId=shelf_list[0].id,
            name="Uncanny Valley", description="Author: Anna Wiener,  transition from the publishing industry to a series of jobs at technology companies, and her gradual disillusionment with the technology industry.",
            position="4", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[0].id, catagoryId=catagory_list[0].id, shelfId=shelf_list[0].id,
            name="A Burning", description="Author: Megha Majumdar, A Burning is a novel by Indian-born author Megha Majumdar. It was released in June 2020 to mixed reviews in India and mostly positive reviews abroad.",
            position="5", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[1].id, catagoryId=catagory_list[1].id, shelfId=shelf_list[1].id,
            name="BLACK BOX", description="Director: Emmanuel Osei-Kuffour Jr, Having lost his wife and his memory in a tragic car accident, news photographer Nolan Wright (Mamoudou Athie) is desperate",
            position="1", favorite=True, checked_out=False
        ),
        Item(typeId=type_list[1].id, catagoryId=catagory_list[1].id, shelfId=shelf_list[1].id,
            name="THE WRETCHED", description="Director:Brett Pierce, Drew T. Pierce, A bone-chilling nightmare from the directors of GOODNIGHT MOMMY,and THE LODGE",
            position="2", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[1].id, catagoryId=catagory_list[1].id, shelfId=shelf_list[1].id,
            name="MULAN", description="Director: Niki Caro, When the Emperor of China issues a decree that one man per family must serve in the Imperial Army",
            position="3", favorite=False, checked_out=True
        ),
        Item(typeId=type_list[1].id, catagoryId=catagory_list[1].id, shelfId=shelf_list[1].id,
            name="THE OTHER LAMB", description="Director: Malgorzata Szumowska, For her entire life, the cult she was born into has been all that teenage Selah has known",
            position="4", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[1].id, catagoryId=catagory_list[1].id, shelfId=shelf_list[1].id,
            name="THE GENTLEMEN", description="Director: Guy Ritchie, THE GENTLEMEN follows American expat Mickey Pearson who built a highly profitable marijuana empire in London.",
            position="5", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[2].id, catagoryId=catagory_list[2].id, shelfId=shelf_list[2].id,
            name="Untitled (Black Is)", description="Artist: SAULT",
            position="1", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[2].id, catagoryId=catagory_list[2].id, shelfId=shelf_list[2].id,
            name="Fetch The Bolt Cutters", description="Artist: Fiona Apple",
            position="2", favorite=False, checked_out=True
        ),
        Item(typeId=type_list[2].id, catagoryId=catagory_list[2].id, shelfId=shelf_list[2].id,
            name="Miss Colombia", description="Artist: Lido Pimienta",
            position="3", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[2].id, catagoryId=catagory_list[2].id, shelfId=shelf_list[2].id,
            name="Punisher", description="Artist: Phoebe Bridgers",
            position="4", favorite=False, checked_out=False
        ),
        Item(typeId=type_list[2].id, catagoryId=catagory_list[2].id, shelfId=shelf_list[2].id,
            name="Spilligion", description="Artist: Spillage Village",
            position="5", favorite=False, checked_out=False
        ),
      
    ]
    

    db.session.add_all(item_list)

    db.session.commit()
    return item_list
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_items():
    db.session.execute('TRUNCATE items CASCADE;')
    db.session.commit()
