import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv('BOT_TOKEN')
FRONTEND_URI = "http://localhost:3000"
BACKEND_URI = "http://localhost:8000"
MONGODB_URL = os.getenv("MONGODB_URL")