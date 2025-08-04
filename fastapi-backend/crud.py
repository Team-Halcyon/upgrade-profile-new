from models import User
from schemas import UserCreate
from sqlalchemy.orm import Session

from database import SessionLocal, engine

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db:Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db:Session, user:UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password,email=user.email,interested_job_roles=user.interested_job_roles,fullname=user.fullname,profile_pic_url=user.profile_picture_url,cv_url=user.cv_url)
    db.add(db_user)
    db.commit()
    return "complete"