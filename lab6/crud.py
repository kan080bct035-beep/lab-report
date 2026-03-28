
from sqlalchemy.orm import Session
from . import models, auth

def create_user(db: Session, u, p):
    user = models.User(username=u, password=auth.hash(p))
    db.add(user); db.commit(); db.refresh(user)
    return user

def login(db: Session, u, p):
    user = db.query(models.User).filter_by(username=u).first()
    if not user or not auth.verify(p, user.password): return None
    return user

def create_todo(db: Session, title, desc, uid):
    t = models.Todo(title=title, description=desc, user_id=uid)
    db.add(t); db.commit(); db.refresh(t)
    return t

def get_todos(db: Session, uid):
    return db.query(models.Todo).filter_by(user_id=uid).all()
