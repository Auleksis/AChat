import mongoengine as me
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()


DATABASE_URI= os.getenv('DATABASE_URI')


db = me.connect(host=DATABASE_URI)


class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.StringField(required=True, unique=True)
    hashed_password = me.StringField(required=True)

    meta = {'collection': 'users'}


class Room(me.Document):
    name = me.StringField(required=True, unique=True)
    owner = me.ObjectIdField(required=True)
    meta = {'collection': 'rooms'}
