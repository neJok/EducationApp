from fastapi import APIRouter

from app.internal.utils.database import MongoDB

database = MongoDB()

router = APIRouter(
    prefix='/api/subjects'
)


@router.post("/")
async def get_subjects():
    return await database.get_subjects()


@router.post("/classes/{subject_id}")
async def get_subjects_classes(subject_id: str):
    return await database.get_subject_classes(subject_id)


@router.post("/lessons/{subject_id}/{subject_class}")
async def get_subjects_lessons(subject_id: str, subject_class: str):
    return await database.get_subject_lessons(subject_id, subject_class)


@router.post("/lesson/{lesson_id}")
async def get_subjects_lesson(lesson_id: str):
    return await database.get_lesson(lesson_id)

