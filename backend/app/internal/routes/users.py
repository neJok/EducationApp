from typing import Annotated

from fastapi import APIRouter, Depends

from app.internal.models import User
from app.internal.utils.database import MongoDB
from app.internal.utils.telegram import get_current_active_user

database = MongoDB()

router = APIRouter(
    prefix='/api/users',
    dependencies=[Depends(get_current_active_user)]
)


@router.post("/me", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user
