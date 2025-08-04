from supabase import create_client
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

# Supabase client (for file uploads)
SUPABASE_PROJECT_URL = os.getenv("SUPABASE_PROJECT_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY)

# SQLAlchemy setup (for user and metadata)
DATABASE_URL = os.getenv("SUPABASE_DATABASE_URL")  # format: postgres://...

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()



# # from sqlalchemy import create_engine
# # from sqlalchemy.orm import sessionmaker
# # from sqlalchemy.ext.declarative import declarative_base
# # import os
# # from dotenv import load_dotenv

# # load_dotenv()

# # URL_DATABASE = os.getenv('SUPABASE_DATABASE_URL')

# # engine = create_engine(URL_DATABASE)    
# # SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Base = declarative_base()

# # supabase_client.py
# from supabase import create_client
# import os
# from dotenv import load_dotenv

# load_dotenv()

# SUPABASE_URL = os.getenv("SUPABASE_DATABASE_URL")
# SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # Or anon key if you're using public uploads
# SUPABASE_PROJECT_URL = os.getenv("SUPABASE_PROJECT_URL")
# supabase = create_client(SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY)
