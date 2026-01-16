@echo off
start cmd /k "cd backend && venv\Scripts\uvicorn src.main:app --reload"
start cmd /k "cd frontend && npm run dev"
echo SkillGap started! 
echo Frontend: http://localhost:5173 (or 5174/5175)
echo Backend: http://localhost:8000
pause
