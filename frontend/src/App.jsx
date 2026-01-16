import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Mic, FileText, Upload, ChevronRight, Loader2, Sparkles } from 'lucide-react';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('home'); // home, recording, result

  const API_URL = 'http://localhost:8000';

  // Simulating recording for prototype (since browser audio API needs secure context/permissions which might be flaky in preview)
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, we would start MediaRecorder here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate getting text from "Hinglish" STT
    const mockHinglish = "Maine 3 saal ABC Corp mein Sales Manager ka kaam kiya. Maine team revenue 20% badhaya aur 15 logo ki team handle ki.";
    setTranscript(mockHinglish);
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/resume/generate-from-text`, {
        text: transcript
      });
      setResumeData(response.data);
      setStep('result');
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to connect to backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              SkillGap
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {step === 'home' && (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Close the Gap to Your <br />
                <span className="gradient-text">Dream Career</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Build a professional resume just by speaking. 
                <br />
                We translate your Hinglish experience into a corporate-ready profile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <button 
                onClick={() => setStep('recording')}
                className="btn-primary flex items-center justify-center gap-3 group"
              >
                <div className="p-1.5 bg-white/20 rounded-full">
                   <Mic size={20} />
                </div>
                Start Voice Builder
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-secondary flex items-center justify-center gap-3">
                <Upload size={20} className="text-gray-400" />
                Upload Resume
              </button>
            </div>

            <div className="pt-16 grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Speak Naturally", desc: "No need for formal English. Just speak in Hindi or Hinglish about your work." },
                { title: "AI Translation", desc: "Our engine converts casual speech into professional resume bullets." },
                { title: "Instant Analysis", desc: "Compare your profile against job descriptions to find skill gaps." }
              ].map((feature, i) => (
                <div key={i} className="glass-panel p-6 hover:border-indigo-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'recording' && (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Tell us about your experience</h2>
              <p className="text-gray-500">Press the microphone and speak freely. <br/>Example: "Maine 2 saal marketing mein kaam kiya..."</p>
            </div>

            <div className="relative group cursor-pointer" onClick={toggleRecording}>
              <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-xl transition-opacity duration-500 ${isRecording ? 'opacity-40 animate-pulse' : 'opacity-0 group-hover:opacity-20'}`}></div>
              <div className={`relative w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-500 scale-110 shadow-red-200' : 'bg-indigo-600 shadow-indigo-200'} shadow-2xl`}>
                <Mic size={40} className="text-white" />
              </div>
              <div className="mt-6 font-medium text-lg text-indigo-900">
                {isRecording ? "Listening..." : "Tap to Speak"}
              </div>
            </div>

            {transcript && (
              <div className="glass-panel p-6 text-left space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-400 uppercase tracking-wider font-semibold">
                  <span>Captured Text (Hinglish)</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 italic">
                  "{transcript}"
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    onClick={() => setTranscript('')} 
                    className="text-gray-500 text-sm px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={generateResume}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-70 flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} />}
                    Generate Resume
                  </button>
                </div>
              </div>
            )}
            
            <button onClick={() => setStep('home')} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your AI Resume</h2>
                <p className="text-gray-500">Generated from your voice input</p>
              </div>
              <button 
                onClick={() => setStep('home')}
                className="btn-secondary text-sm py-2 px-4"
              >
                Start Over
              </button>
            </div>

            {resumeData && (
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 p-8 border-b border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-900">{resumeData.name || "Candidate Name"}</h1>
                  <p className="text-indigo-600 font-medium">{resumeData.summary}</p>
                </div>
                
                <div className="p-8 space-y-8">
                  <section>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Experience</h3>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, idx) => (
                        <div key={idx} className="relative pl-6 border-l-2 border-indigo-100">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white"></div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-gray-900">{exp.role}</h4>
                            <span className="text-sm font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">{exp.duration}</span>
                          </div>
                          <p className="text-gray-600 font-medium mb-3">{exp.company}</p>
                          <ul className="space-y-2">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-gray-600 text-sm flex items-start gap-2">
                                <span className="text-indigo-400 text-lg leading-none">•</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
