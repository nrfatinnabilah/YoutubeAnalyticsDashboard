from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use absolute path relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "data", "all_youtube_analytics.csv")

df = pd.read_csv(CSV_PATH)

@app.get("/api/analytics")
def get_analytics():
    return df.to_dict(orient="records")
