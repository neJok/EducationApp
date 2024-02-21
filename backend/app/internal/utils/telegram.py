import hashlib
import hmac
import json
from operator import itemgetter
from typing import Annotated, Union
from urllib.parse import parse_qsl

from fastapi import HTTPException, Header
from starlette import status
from app.configuration.config import BOT_TOKEN
from .database import MongoDB

database = MongoDB()


def get_secret_key() -> bytes:
    return hmac.new(key=b"WebAppData", msg=BOT_TOKEN.encode(), digestmod=hashlib.sha256).digest()


def validate(init_data):
    try:
        parsed_data = dict(parse_qsl(init_data, strict_parsing=True))
    except ValueError:
        return None
    if "hash" not in parsed_data:
        return None

    hash_ = parsed_data.pop("hash")
    data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(parsed_data.items(), key=itemgetter(0)))
    calculated_hash = hmac.new(
        key=get_secret_key(),
        msg=data_check_string.encode(),
        digestmod=hashlib.sha256,
    ).hexdigest()
    if calculated_hash != hash_:
        return None
    return parsed_data


async def get_current_active_user(X_Telegram_Init_Data: Annotated[Union[str, None], Header()] = None) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not X_Telegram_Init_Data:
        raise credentials_exception

    data = validate(X_Telegram_Init_Data)
    if not data:
        raise credentials_exception

    user_info = json.loads(data['user'])
    user_id = user_info['id']
    first_name = user_info.get('first_name')
    username = user_info.get('username')
    user = await database.get_user(user_id, first_name, username)
    return user
