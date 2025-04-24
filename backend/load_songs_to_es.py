import pandas as pd
from elasticsearch import Elasticsearch
import json
import os

df = pd.read_csv("lyrics.csv", encoding='latin1')

ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL")
ELASTICSEARCH_API_KEY = os.getenv("ELASTICSEARCH_API_KEY")

client = Elasticsearch(
    ELASTICSEARCH_URL, 
    api_key= ELASTICSEARCH_API_KEY)

index_name = "search-song"

if client.indices.exists(index=index_name):
    client.indices.delete(index=index_name)

for i, row in df.iterrows():
    doc = {
        "rank": row["Rank"],
        "song": row["Song"],
        "artist": row["Artist"],
        "year": row["Year"],
        "lyrics": None if pd.isna(row["Lyrics"]) else row["Lyrics"],
        "source": None if pd.isna(row["Source"]) else row["Source"],
    }
    client.index(index=index_name, body=doc)

print("Data uploaded successfully.")
