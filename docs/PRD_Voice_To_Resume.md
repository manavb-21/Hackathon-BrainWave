# Product Requirements Document (PRD): Voice-to-Resume Engine

## 1. Introduction

The **Voice-to-Resume Engine** is the core MVP feature of **SkillGap**. It allows users to dictate their professional experience in Hindi or Hinglish, which the system then transcribes, translates, and formats into a professional-grade English resume structure.

## 2. User User Stories

- **As a user**, I want to speak about my work experience in my native language (Hindi/Hinglish) so that I don't have to struggle with writing formal English.
- **As a user**, I want to review the transcribed text to ensure my speech was captured correctly.
- **As a user**, I want to see a generated, professional summary of my experience in English.
- **As a user**, I want to edit the generated resume points if they are not accurate.

## 3. Functional Requirements

### 3.1 Audio Input

- **Recording Interface**: A clear "Hold to Record" or "Tap to Record" button.
- **Duration Limit**: Max 2-3 minutes per section (Experience, Education, etc.) to manage processing load.
- **Audio Format**: Support for standard mobile audio formats (wav/mp3/m4a).

### 3.2 Speech-to-Text (STT) Processing

- **Engine**: Google Cloud Speech-to-Text or Bhashini AI (Indian Govt initiative).
- **Language Support**: Hindi (hi-IN), Hinglish (mixed hi-IN/en-IN).
- **Output**: Raw textual transcription of the user's speech.

### 3.3 Intelligence Layer (Translation & Formatting)

- **Engine**: LLM (OpenAI GPT-4o or similar).
- **Prompt Engineering**:
  - Role: Professional Resume Writer.
  - Task: Translate Hinglish/Hindi to Professional English.
  - extraction: Identify Key Skills, Dates, Company Names, and Achievements.
  - Formatting: Bullet points, action verbs (e.g., "Led team...", "Increased sales...").

### 3.4 Resume Structure Output

The system must generate a JSON structure:

```json
{
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
```

## 4. Technical Constraints & Assumptions

- **Latency**: STT + LLM processing should take < 10 seconds.
- **Privacy**: User voice data should be transient or securely stored if needed for improvement (with consent).
- **Accuracy**: The system must handle heavy accents and colloquialisms ("Maine wahan kaam kiya tha...").

## 5. UI/UX Design Principles

- **Minimalist**: Focus on the microphone interaction.
- **Feedback**: Visualizers or waveforms during recording.
- **Localization**: UI labels available in Hindi/English.

## 6. Phase 1 Roadmap (MVP)

1.  **Prototype**: Simple Python script recording audio -> STT API -> LLM API -> Print Result.
2.  **Frontend Integration**: Connect to React/React Native UI.
3.  **Refinement**: Fine-tune prompts for better "Resume Speak".
