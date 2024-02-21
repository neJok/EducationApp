from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class User(BaseModel):
    user_id: str
    username: str
    first_name: str
    points: int