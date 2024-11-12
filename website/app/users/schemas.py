from typing_extensions import Self

from pydantic import BaseModel, field_validator
from typing import List, Any
import re


class UserOutResponse(BaseModel):
    id: str
    username: str
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserLoginModel(BaseModel):
    email: str
    password: str


class UserGetUsernameModel(BaseModel):
    username: str


class UserRegistrationModel(BaseModel):
    username: str
    email: str
    password: str

    @field_validator('username')
    def validate_username(cls, value: str):
        pattern = r"^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$"
        if not re.match(pattern, value):
            raise ValueError('Name must start with a latin letter. It can contain only latin letters, numbers, '
                             'underscores, hyphens and spaces')
        return value

    @field_validator('email')
    def validate_email(cls, value: str):
        pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
        if not re.match(pattern, value):
            raise ValueError('Invalid email')
        return value

    @field_validator('password')
    def validate_password(cls, value: str):
        pattern = r"^[A-Za-z0-9_]\w{8,}$"
        if not re.match(pattern, value):
            raise ValueError('Password must have more than 8 characters and consist of latin letters, numbers and '
                             'underscores')
        return value










