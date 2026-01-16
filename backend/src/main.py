from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from src.services import VoiceToResumeEngine

app = FastAPI(title="SkillGap API", version="0.1.0")

# Allow CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = VoiceToResumeEngine()

class ResumeRequest(BaseModel):
    text: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "SkillGap Backend is running"}

@app.post("/resume/generate-from-text")
def generate_resume_text(request: ResumeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    # In a real scenario, this would call the LLM
    resume_data = engine.generate_resume_content(request.text)
    return resume_data

@app.post("/resume/generate-from-audio")
async def generate_resume_audio(file: UploadFile = File(...)):
    # This is a placeholder for audio processing
    # We would save the file, transcribe it, then generate resume
    
    return {"message": "Audio processing not yet implemented", "filename": file.filename}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
