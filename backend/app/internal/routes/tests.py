from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.internal.models import User
from app.internal.utils.database import MongoDB
from app.internal.utils.telegram import get_current_active_user

database = MongoDB()

router = APIRouter(
    prefix='/api/tests'
)


class CompleteRequest(BaseModel):
    answers: list[list[int]]


@router.post("/{lesson_id}/complete")
async def complete(
        lesson_id: str,
        request: CompleteRequest,
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    correct_answers, points = await database.complete_test(current_user, lesson_id, request.answers)
    return {
        'correct_answers': correct_answers,
        'points': points
    }
