import os

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, BackgroundTasks, Cookie
from typing import List
import json
import jwt
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

JWT_KEY = os.getenv('JWT_KEY')


class Rooms:
    def __init__(self):
        self.rooms = {}

    def add(self, room_id, ws):
        if room_id not in self.rooms:
            self.rooms[room_id] = set()
        self.rooms[room_id].add(ws)

    def remove(self, room_id, ws):
        self.rooms[room_id].remove(ws)

    async def send_msg(self, room_id, msg):
        for user in self.rooms[room_id]:
            await user.send_text(json.dumps(msg))


rooms = Rooms()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Cookie(None)):
    user_data = get_token(token)


    if user_data is None:
        raise HTTPException(status_code=403, detail="Forbidden")

    await websocket.accept()

    room_id = user_data['room_id']
    username = user_data['username']

    rooms.add(room_id, websocket)

    try:
        await rooms.send_msg(room_id, {
            'type': 'enter',
            'from': username
        })
        while True:
            data = json.loads(await websocket.receive_text())
            print(data)
            await rooms.send_msg(room_id, {
                'type': 'msg',
                'from': username,
                'content': data['text']
            })

    except WebSocketDisconnect:
        rooms.remove(room_id, websocket)
        await rooms.send_msg(room_id, {
            'type': 'leave',
            'from': username
        })


def get_token(token):
    if token is None:
        return None
    try:
        data = jwt.decode(token, key=JWT_KEY, algorithms=['HS256'])
    except Exception as e:
        return None

    return data
