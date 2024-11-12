from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.users.schemas import UserOutResponse, UserRegistrationModel, UserLoginModel, Token, UserGetUsernameModel
from app.database import User
from mongoengine.queryset.visitor import Q
from app.utils import hash_password, check_password
from app.auth import create_access_token, get_current_user

router = APIRouter(prefix='/users', tags=['Users management'])


@router.post("/register", summary="Register a new user", response_model=Token)
async def register(user: UserRegistrationModel):
    if User.objects(Q(email=user.email) | Q(username=user.username)).first():
        raise HTTPException(status_code=400, detail="Email or username already exists")

    new_user = User(email=user.email, username=user.username, hashed_password=hash_password(user.password))
    new_user.save()

    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", summary="Login into an account", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    found_user = User.objects(Q(email=form_data.username)).first()

    if not found_user or not check_password(found_user.hashed_password, form_data.password):
        raise HTTPException(status_code=401, detail="Wrong email or password")

    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/username", summary="Get username", response_model=UserGetUsernameModel)
async def get_username(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}

