from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# SQLite path
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'lab5.db')}"

# Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session
SessionLocal = sessionmaker(autoflush=False, expire_on_commit=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()