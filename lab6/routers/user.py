
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db
from .. import crud, auth
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    return crud.create_user(db, username, password)

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.login(db, form.username, form.password)
    if not user: return {"error":"invalid"}
    return {"access_token": auth.create_token({"user_id": user.id})}
