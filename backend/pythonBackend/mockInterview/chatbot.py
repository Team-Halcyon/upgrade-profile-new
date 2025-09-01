import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pprint
# Load environment variables
load_dotenv(dotenv_path=r'F:\NEW VS CODE PROJECTS\up\upgrade-profile-new\backend\.env')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (customize for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    job_role: str

class ChatResponse(BaseModel):
    response: str
    evaluation: dict = None

# In-memory session storage (replace with persistent storage for production)
history = []

# === INITIALIZATION ===
def initialize_gemini(job_role: str = ""):
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment variables.")
    genai.configure(api_key=gemini_api_key)

    generation_config = {
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 40,
        "max_output_tokens": 4096,
        "response_mime_type": "text/plain",
    }

    system_instruction = (
        f"You are a professional interviewer. Conduct a mock interview for the {job_role} position. "
        "Ensure each question is relevant, avoids repetition, and logically builds upon the candidate's responses. "
        
    )

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction=system_instruction
    )
    return model

# === FINAL INTERVIEW EVALUATION ===
def final_evaluation(history, job_role):
    full_transcript = "\n".join(
        f"User: {msg['parts'][0]}" if msg["role"] == "user" else f"Bot: {msg['parts'][0]}"
        for msg in history
    )
    final_prompt = f"""
    You are an expert interviewer. Based on the following full interview transcript for the role of {job_role}, provide a final evaluation:
    
    {full_transcript}

    Respond in this format:
    - Overall Clarity (1-5):
    - Relevance to Job Role (1-5):
    - Structure & Communication (1-5):
    - Summary of Strengths:
    - Areas for Improvement:
    - Overall Recommendation (Hire / Consider / Do Not Hire):
    """

    model = initialize_gemini(job_role)
    response = model.generate_content(final_prompt)
    return {
        "final_summary": response.text.strip()
    }

# === CHAT ENDPOINT ===
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
       # Initialize Gemini with system instruction and chat history
        model = initialize_gemini(request.job_role)
        chat_session = model.start_chat(history=history)


        response = chat_session.send_message(request.message).text.strip()

        # Append to history for next turn
        history.append({"role": "user", "parts": [request.message]})
        history.append({"role": "model", "parts": [response]})


        # # Final evaluation after 5 user-model pairs
        # if len(history) >= 10:
        #     response += "\n\nThis concludes the interview. Thank you for your time!"
        #     final_eval = final_evaluation(history, request.job_role)
        #     history.clear()  # Reset for next interview
        #     return ChatResponse(response=response, evaluation=final_eval)

        return ChatResponse(response=response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# === DEV SERVER RUNNER ===
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
