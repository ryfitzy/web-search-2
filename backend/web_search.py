from flask import Blueprint, request, jsonify
import os
import requests

web_search = Blueprint("web_search", __name__)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_CX = os.getenv("GOOGLE_CX")

@web_search.route("/WebSearch", methods=["GET"])
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CX,
        "q": query,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # This will raise an error for non-200 responses
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

