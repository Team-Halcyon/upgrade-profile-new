from pydantic import BaseModel

class UserCreate(BaseModel):
    fullname: str
    username: str
    email: str
    password: str
    interested_job_roles: str
    profile_picture_url: str | None = None
    cv_url: str | None = None
