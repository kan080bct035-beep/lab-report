
from fastapi import FastAPI
from .database import Base, engine
from .routers import user, todo

app = FastAPI()

app.include_router(user.router)
app.include_router(todo.router)
