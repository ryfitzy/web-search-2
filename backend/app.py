from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

from local_song_search import local_song_search
from web_search import web_search

load_dotenv()

# Tell Flask to serve static files from the React build
app = Flask(__name__, static_folder="build", static_url_path="")
CORS(app)

# Register Blueprints
app.register_blueprint(local_song_search)
app.register_blueprint(web_search)

# Serve React build on root path
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
