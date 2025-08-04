from pydantic import BaseModel

class UserCreate(BaseModel):
    fullName: str
    username: str
    email: str
    password: str
    interestedJobRoles: str
    profile_picture_url: str | None = None
    cv_url: str | None = None
