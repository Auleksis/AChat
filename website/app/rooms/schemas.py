from typing_extensions import Self

from pydantic import BaseModel, field_validator
from typing import List, Any, Optional


class CreateRoomModel(BaseModel):
    name: str

    @field_validator('name')
    def validate_name(cls, value: str):
        if len(value) < 6:
            raise ValueError('Room name must contain at least 6 characters')
        return value


class RoomResponseModel(BaseModel):
    id: str
    name: str
    owner: str


class RoomListModel(BaseModel):
    page: Optional[int] = None
    count: Optional[int] = None


class RoomSearchModel(BaseModel):
    query: str
    page: Optional[int] = None
    count: Optional[int] = None
