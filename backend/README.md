# SkillGap Backend

This directory contains the server-side logic for the SkillGap AI Career Accelerator.

## Setup

1.  **Create a Virtual Environment**

    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```

2.  **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Environment Variables**
    Create a `.env` file in this directory with the following keys:
    ```
    GEMINI_API_KEY=your_gemini_key_here
    GOOGLE_APPLICATION_CREDENTIALS=path_to_gcp_json (if using Google STT)
    ```

## Running the API

To start the FastAPI server:

```bash
uvicorn src.main:app --reload
```

The API will be available at `http://localhost:8000`.
Docs are available at `http://localhost:8000/docs`.

## Running the Prototype (CLI)

To test the Voice-to-Resume logic (Simulated):

```bash
python prototype.py
```
