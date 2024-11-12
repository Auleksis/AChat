from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.users.router import router as users_router
from app.rooms.router import router as rooms_router

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


allowed_origins = [
    "http://localhost",
    "http://localhost/*"
]

# Adding CORSMiddleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from these origins
    allow_credentials=True,  # Allows cookies to be sent with requests
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers in requests
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    errors = [
        {
            "field": ".".join(map(str, err["loc"])),
            "message": err["msg"],
            "error_type": err["type"]
        }
        for err in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "errors": errors
        }
    )


app.include_router(users_router, prefix='/api')
app.include_router(rooms_router, prefix='/api')
