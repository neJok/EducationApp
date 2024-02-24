from fastapi import APIRouter
from app.internal.utils.database import MongoDB

database = MongoDB()

router = APIRouter(
    prefix='/api/subjects'
)


@router.post("/")
async def get_subjects(
):
    return await database.get_subjects()
