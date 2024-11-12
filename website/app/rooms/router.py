from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import User, Room
from mongoengine.queryset.visitor import Q
from app.auth import get_current_user, create_access_token
from typing import List, Optional

from app.rooms.schemas import CreateRoomModel, RoomResponseModel, RoomListModel, RoomSearchModel
from app.users.schemas import Token

router = APIRouter(prefix='/rooms', tags=['Rooms management'])


@router.post("/my_rooms", summary="Get all rooms created by user", response_model=List[RoomResponseModel])
async def get_all_rooms(info: RoomListModel, current_user: User = Depends(get_current_user)):
    rooms = None
    if info.page is not None and info.count is not None:
        rooms = Room.objects(Q(owner=current_user.id))[info.page * info.count: (info.page + 1) * info.count]
    else:
        rooms = Room.objects(Q(owner=current_user.id))

    response = [{"id": str(room.id), "name": room.name, "owner": User.objects(Q(id=room.owner)).first().username} for room in rooms]

    return response


@router.delete("/delete_room/{room_id}", summary="Remove an existing room", response_model=str)
async def remove_room(room_id: str, current_user: User = Depends(get_current_user)):
    room = Room.objects(Q(id=room_id) & Q(owner=current_user.id)).delete()
    return "Successfully deleted"


@router.post("/create_room", summary="Create a new room", response_model=RoomResponseModel)
async def create_room(room: CreateRoomModel, current_user: User = Depends(get_current_user)):
    if Room.objects(Q(name=room.name)).first():
        raise HTTPException(status_code=400, detail="Room with the name already exists")

    new_room = Room(name=room.name, owner=current_user.id)
    new_room.save()

    return {"id": str(new_room.id), "name": new_room.name, "owner": User.objects(Q(id=new_room.owner)).first().username}


@router.post("/search_rooms", summary="Find rooms by name", response_model=List[RoomResponseModel])
async def search_room(info: RoomSearchModel, current_user: User = Depends(get_current_user)):
    rooms = None
    if info.page is not None and info.count is not None:
        rooms = Room.objects(Q(name__icontains=info.query))[info.page * info.count: (info.page + 1) * info.count]
    else:
        rooms = Room.objects(Q(name__icontains=info.query))

    response = [{"id": str(room.id), "name": room.name, "owner": User.objects(Q(id=room.owner)).first().username} for room in rooms]

    return response


@router.get("/join_room", summary="Join a room", response_model=Token)
async def join_room(room_id: str, current_user: User = Depends(get_current_user)):
    found_room = Room.objects(Q(id=room_id)).first()

    if found_room is None:
        raise HTTPException(status_code=401, detail="Bad room id")

    access_token = create_access_token(data={"username": current_user.username, "email": current_user.email, "room_id": str(found_room.id)})
    return {"access_token": access_token, "token_type": "bearer"}


