from fastapi import APIRouter
from app.internal.utils.database import MongoDB

database = MongoDB()

router = APIRouter(
    prefix='/api/top'
)


@router.post("/")
async def get_top(
):
    return await database.get_top()
