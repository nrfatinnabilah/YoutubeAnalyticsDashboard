from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["analytics_db"]
collection = db["youtube_engagement"]