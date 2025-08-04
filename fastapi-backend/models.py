from sqlalchemy import Column, Integer, String
from database import Base
from database import engine

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    profile_pic_url = Column(String, nullable=True)
    interested_job_roles = Column(String, nullable=True)  # Comma-separated list of job roles
    cv_url = Column(String, nullable=True)  # URL to the CV file
    
User.metadata.create_all(bind=engine)    