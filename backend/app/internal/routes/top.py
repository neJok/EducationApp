from fastapi import APIRouter

from app.internal.models import User
from app.internal.utils.database import MongoDB

database = MongoDB()

router = APIRouter(
    prefix='/api/top'
)


@router.post("/")
async def get_top(
):
    users = await database.get_top()
    return users
