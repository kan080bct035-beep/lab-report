
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps import get_db, get_user
from .. import crud

router = APIRouter()

@router.post("/todos")
def create(title: str, description: str, db: Session = Depends(get_db), user=Depends(get_user)):
    return crud.create_todo(db, title, description, user.id)

@router.get("/todos")
def read(db: Session = Depends(get_db), user=Depends(get_user)):
    return crud.get_todos(db, user.id)
