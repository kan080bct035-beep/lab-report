from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str