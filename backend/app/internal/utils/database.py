from motor.motor_asyncio import AsyncIOMotorClient
from app.configuration.config import MONGODB_URL


class MongoDB:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(MongoDB, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True

        # Connect to the database
        self.client = AsyncIOMotorClient(MONGODB_URL)
        self.db = self.client['education']
        self.users = self.db['users']
        self.subjects = self.db['subjects']

    async def get_user(self, user_id: int, first_name, username) -> dict:
        user_id = str(user_id)
        entry = await self.users.find_one({"user_id": user_id})
        if not entry:
            entry = {
                'user_id': user_id,
                'username': username,
                'first_name': first_name,
                'points': 0,
            }
            await self.users.insert_one(entry)
        else:
            if entry['username'] != username or entry['first_name'] != first_name:
                await self.users.update_one({"_id": entry['_id']}, {"$set": {"username": user_id, 'first_name': first_name}})

        return entry

    async def get_top(self):
        projection = {"first_name": 1, "points": 1, "username": 1, "_id": 0}
        cursor = self.users.find({}, projection)
        cursor.sort('points', -1).limit(10)
        return await cursor.to_list(length=10)

    async def get_subjects(self):
        projection = {"_id": 0}
        return await self.subjects.find({}, projection).to_list(None)

