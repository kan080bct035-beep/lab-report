
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "secret"
ALGORITHM = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash(p): return pwd.hash(p)
def verify(p, h): return pwd.verify(p, h)

def create_token(data):
    data.update({"exp": datetime.utcnow() + timedelta(minutes=30)})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
