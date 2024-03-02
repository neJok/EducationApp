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
        self.lessons = self.db['lessons']

        self.projection_without_id = {"_id": 0}

    async def get_user(self, user_id: int, first_name, username) -> dict:
        user_id = str(user_id)
        entry = await self.users.find_one({"user_id": user_id})
        if not entry:
            entry = {
                'user_id': user_id,
                'username': username,
                'first_name': first_name,
                'points': 0,
                'completed_tests': list()
            }
            await self.users.insert_one(entry)
        else:
            if entry['username'] != username or entry['first_name'] != first_name:
                await self.users.update_one(
                    {"_id": entry['_id']},
                    {"$set": {"username": user_id, 'first_name': first_name}}
                )
        return entry

    async def get_top(self):
        projection = {"first_name": 1, "points": 1, "username": 1, "_id": 0}
        cursor = self.users.find({}, projection)
        cursor.sort('points', -1).limit(10)
        return await cursor.to_list(length=10)

    async def get_subjects(self):
        subjects = []
        async for subject in self.subjects.find({}, self.projection_without_id):
            for class_, lessons_ids in subject['lessons'].items():
                lessons = await self.get_lessons(lessons_ids)
                for lesson in lessons:
                    for question in lesson['test']:
                        del question['correct']

                subject['lessons'][class_] = lessons

            subjects.append(subject)

        return subjects

    async def get_lessons(self, lessons: list[str]):
        return await self.lessons.find({"lesson_id": {"$in": lessons}}, self.projection_without_id).to_list(None)

    async def complete_test(self, user, lesson_id: str, answers: list[list[int]]):
        points = 0
        correct_answers = []

        if lesson_id not in user['completed_tests']:
            await self.users.update_one({"user_id": user['user_id']}, {"$push": {"completed_tests": lesson_id}})

        lesson = await self.lessons.find_one({"lesson_id": lesson_id})
        for i, question in enumerate(lesson['test']):
            if question['type'] == 'single' and answers[i][0] in question['correct']:
                points += 5
                correct_answers.append(i + 1)
            elif question['type'] == 'multiply':
                points_per_question = 0
                for answer in answers[i]:
                    if answer in question['correct']:
                        points_per_question += 5
                    else:
                        points_per_question -= 5

                if points_per_question < 0:
                    points_per_question = 0
                elif points_per_question > 0:
                    correct_answers.append(i + 1)

                points += points_per_question

        if lesson_id not in user['completed_tests'] and points > 0:
            await self.users.update_one({"user_id": user['user_id']}, {"$inc": {"points": points}})
        else:
            points = 0

        return correct_answers, points
