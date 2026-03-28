
from fastapi import Depends, HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import User
from fastapi.security import OAuth2PasswordBearer

oauth2 = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "secret"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

def get_user(token: str = Depends(oauth2), db: Session = Depends(get_db)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user = db.query(User).filter(User.id == payload.get("user_id")).first()
    if not user: raise HTTPException(status_code=401)
    return user
