from flask import Flask
from resources.container import Container
from resources.inventory import Inventory
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv

app = Flask(__name__)
DATABASE_PATH = os.environ.get('DATABASE_PATH')

connection = sqlite3.connect(DATABASE_PATH)


# with open('schema.sql') as f:
#     connection.executescript(f.read())

# cur = connection.cursor()

# cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
#             ('First Post', 'Content for the first post')
#             )

# cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
#             ('Second Post', 'Content for the second post')
#             )

# connection.commit()
# connection.close()

# def get_db_connection():
#     conn = sqlite3.connect('database.db')
#     conn.row_factory = sqlite3.Row
#     return conn


# @app.route('/')
# def index():
#     conn = get_db_connection()
#     posts = conn.execute('SELECT * FROM posts').fetchall()
#     conn.close()
#     return ""


@app.route('/')
def hello():
    print(DATABASE_PATH)
    # connection.row_factory = sqlite3.Row
    # posts = posts.execute('SELECT * FROM posts').fetchall()
    # print(posts)
    return 'Hello, World1211!'


if "__main__" == __name__:
    app.run(port=5000, debug=True)

# flask --app app.py --debug run
