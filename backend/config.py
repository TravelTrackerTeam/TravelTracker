import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    
    MONGO_URI       = os.environ.get(
        "MONGO_URI",
        "mongodb://localhost:27017/TravelTracker"
    )
    JWT_SECRET_KEY  = os.environ.get("JWT_SECRET_KEY", "dev-secret-key")








