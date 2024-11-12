import mongoengine as me
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# DATABASE1_NAME=os.getenv('MONGO_INITDB_DATABASE')
# DATABASE1_USER=os.getenv('MONGO_INITDB_ROOT_USERNAME')
# DATABASE1_PASSWORD=os.getenv('MONGO_INITDB_ROOT_PASSWORD')

# MONGO_DB_HOST=os.getenv('MONGO_DB_HOST')
# MONGO_DB_PORT=os.getenv('MONGO_DB_PORT')

DATABASE_URI= os.getenv('DATABASE_URI')

# logger.info("LOOOOOG")
# logger.info(DATABASE_URI)

db = me.connect(host=DATABASE_URI)
#db = me.connect(DATABASE1_NAME, host=MONGO_DB_HOST, port=int(MONGO_DB_PORT), username=DATABASE1_USER, password=DATABASE1_PASSWORD, authentication_source='admin')


class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.StringField(required=True, unique=True)
    hashed_password = me.StringField(required=True)

    meta = {'collection': 'users'}


class Room(me.Document):
    name = me.StringField(required=True, unique=True)
    owner = me.ObjectIdField(required=True)
    meta = {'collection': 'rooms'}
