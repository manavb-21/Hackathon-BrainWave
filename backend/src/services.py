import os
import time
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class VoiceToResumeEngine:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            print("Warning: GEMINI_API_KEY not found in environment.")
            
        print("Initializing Voice-to-Resume Engine Service (Gemini Powered)...")

    def transcribe_audio(self, audio_path):
        """
        Placeholder for STT logic.
        """
        print(f"Transcribing {audio_path}...")
        return "Simulated transcription text."

    def generate_resume_content(self, text_input):
        """
        Sends the text to Gemini to format into a resume.
        """
        print("\n--- Intelligence Phase (Gemini Service) ---")
        
        if not self.api_key:
            print("Warning: GEMINI_API_KEY not found. Returning mock data.")
            return self._get_mock_resume_data()

        try:
            prompt = f"""
            You are a professional resume writer. Convert the following casual "Hinglish" or Hindi/English experience description into a structured JSON resume format (English).
            
            Input Text: "{text_input}"
            
            Output Format (JSON):
            {{
              "name": "Candidate Name" (Infer or use 'Candidate'),
              "summary": "Professional summary...",
              "experience": [
                {{
                  "role": "Job Title",
                  "company": "Company Name",
                  "duration": "Duration",
                  "bullets": ["Action verb started bullet point 1", "Action verb started bullet point 2"]
                }}
              ],
              "skills": ["Skill 1", "Skill 2"]
            }}
            
            Ensure the tone is professional. Do not include markdown code blocks (```json), just the raw JSON string.
            """
            
            response = self.model.generate_content(prompt)
            # clean potential markdown formatting
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
            
        except Exception as e:
            print(f"Error calling Gemini: {e}")
            return self._get_mock_resume_data()

    def _get_mock_resume_data(self):
        return {
            "experience": [
                {
                    "role": "Sales Manager",
                    "company": "ABC Corp",
                    "duration": "2 Years",
                    "bullets": [
                        "Managed a team of 10 sales representatives.",
                        "Increased regional revenue by 15% year-over-year."
                    ]
                }
            ],
            "skills": ["Sales Management", "Team Leadership", "Revenue Growth"],
            "summary": "Experienced Sales Manager with a track record of driving revenue growth..."
        }
