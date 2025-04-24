from flask import Blueprint, request, jsonify
from elasticsearch import Elasticsearch
from flask_cors import CORS
import pandas as pd
import re
import os
from dotenv import load_dotenv
load_dotenv()

local_song_search = Blueprint("local_song_search", __name__)
ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL")
ELASTICSEARCH_API_KEY = os.getenv("ELASTICSEARCH_API_KEY")

CORS(local_song_search)
es = Elasticsearch(
    hosts = [ELASTICSEARCH_URL], 
    api_key= ELASTICSEARCH_API_KEY)
INDEX_NAME = "search-song"

def strip_html_tags(text):
    clean = re.compile("<.*?>")
    return re.sub(clean, "", text)

@local_song_search.route("/LocalSongSearch", methods=["GET"])
def search():
    query_text = request.args.get("q", "")

    query = {
        "query": {
            "multi_match": {
                "query": query_text,
                "fields": ["song", "artist", "lyrics"]
            }
        },
        "highlight": {
            "fields": {
                "lyrics": {}
            }
        }
    }
    res = es.search(index=INDEX_NAME, body=query)
    results = [{
        "rank": hit["_source"]["rank"],
        "song": hit["_source"]["song"],
        "artist": hit["_source"]["artist"],
        "year": hit["_source"]["year"],
        "lyrics": hit["_source"]["lyrics"],
        "snippet": strip_html_tags(hit.get("highlight", {}).get("lyrics", ["No snippet available"])[0])  
    } for hit in res["hits"]["hits"]]
    return jsonify(results)

if __name__ == "__main__":
    local_song_search.run(debug=True)
