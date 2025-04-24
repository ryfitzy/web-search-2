from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from local_song_search import local_song_search
from web_search import web_search

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(local_song_search)
app.register_blueprint(web_search)

if __name__ == "__main__":
    app.run(debug=True)
