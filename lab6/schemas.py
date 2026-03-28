
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class TodoCreate(BaseModel):
    title: str
    description: str
