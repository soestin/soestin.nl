"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import "../globals.css";

interface ResumeContent {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    birthDate: string;
    nationality: string;
    address: string;
    driversLicense: string;
    github?: string;
  };
  about: string;
  skills: {
    systemAdmin: string[];
    systems: string[];
  };
  experience: Array<{
    title: string;
    period: string;
    location: string;
    description?: string;
    tasks: string[];
  }>;
  competencies: string[];
  education: Array<{
    title: string;
    period: string;
    school: string;
  }>;
}

function ResumeContent() {
  const [content, setContent] = useState<ResumeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAnimatedMode, setIsAnimatedMode] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const searchParams = useSearchParams();

  // Occasional shake animation for button
  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 8000 + Math.random() * 4000); // Random between 8-12 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const code = searchParams.get('code');
      
      if (!code) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/resume-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const result = await response.json() as { 
          success: boolean; 
          message: string; 
          content?: ResumeContent;
        };
        
        if (result.success && result.content) {
          setContent(result.content);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Er is een fout opgetreden');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Laden...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const code = formData.get('code') as string;
      if (code) {
        window.location.href = `/resume?code=${encodeURIComponent(code)}`;
      }
    };

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-light text-gray-800 mb-4">Toegang Vereist</h1>
          {error ? (
            <p className="text-red-600 mb-4">{error}</p>
          ) : (
            <p className="text-gray-600 mb-4">
              Deze pagina vereist een geldige toegangscode.
            </p>
          )}
          
          <form onSubmit={handleCodeSubmit} className="mt-6">
            <div className="flex gap-2">
              <input
                name="code"
                type="text"
                placeholder="Voer toegangscode in..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm font-medium transition-colors"
              >
                Toegang
              </button>
            </div>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            Of gebruik direct: /resume?code=JOUW_CODE
          </p>
        </div>
      </div>
    );
  }

  if (isAnimatedMode) {
    return (
      <div className="min-h-screen bg-[#221F2E] text-white relative overflow-hidden">
        {/* Sparkles Toggle Button */}
        <button
          onClick={() => setIsAnimatedMode(false)}
          className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-white text-lg md:text-xl ${
            isShaking ? 'animate-bounce' : ''
          }`}
          style={{
            animation: isShaking ? 'shake 0.6s ease-in-out' : undefined
          }}
        >
          ✨
        </button>

        {/* Animated Background Wave */}
        <div className="fixed inset-0 z-10">
          <svg
            className="fixed w-full h-full opacity-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z"
              fill="rgba(241, 97, 0, 0.05)"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-20 min-h-screen px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Animated Header */}
            <div className="text-center mb-12 md:mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 leading-tight">
                <span className="text-orange-400 relative inline-block name-glow cursor-pointer font-mono" 
                      style={{fontFamily: 'SUSE Mono, monospace'}}>
                  {content.personal.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                {content.personal.title}
              </p>
            </div>

            {/* Personal Info Card - Animated */}
            <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300 mb-8">
              <h3 className="text-gray-300 font-medium mb-4 text-center text-lg">Persoonlijke Gegevens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-gray-200">{content.personal.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Telefoon:</span>
                    <span className="text-gray-200">{content.personal.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Geboortedatum:</span>
                    <span className="text-gray-200">{content.personal.birthDate}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Adres:</span>
                    <span className="text-gray-200 italic text-right text-xs md:text-sm">{content.personal.address}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Nationaliteit:</span>
                    <span className="text-gray-200">{content.personal.nationality}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-gray-400">Rijbewijs:</span>
                    <span className="text-gray-200">{content.personal.driversLicense}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                
                {/* About Section */}
                <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                  <h3 className="text-gray-300 font-medium mb-3 text-lg">Over Mij</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {content.about}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                  <h3 className="text-gray-300 font-medium mb-4 text-lg">Werkervaring</h3>
                  {content.experience.map((job, index) => (
                    <div key={index} className="mb-6 last:mb-0 border-l-4 border-orange-400/30 pl-4">
                      <h4 className="text-orange-300 font-medium text-base md:text-lg">{job.title}</h4>
                      <p className="text-gray-500 text-sm mb-1">{job.period}</p>
                      <p className="text-gray-400 text-sm mb-3 italic">{job.location}</p>
                      {job.description && (
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">{job.description}</p>
                      )}
                      <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                        {job.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="leading-relaxed">{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                  <h3 className="text-gray-300 font-medium mb-4 text-lg">Opleiding</h3>
                  <div className="space-y-4">
                    {content.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-orange-400/30 pl-4">
                        <h4 className="text-orange-300 font-medium text-base">{edu.title}</h4>
                        <p className="text-gray-500 text-sm">{edu.period}</p>
                        <p className="text-gray-400 text-sm mb-3 italic">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                
                {/* Technical Skills */}
                <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
                  <h3 className="text-gray-300 font-medium mb-4 text-lg border-b border-white/10 pb-2">Technische Vaardigheden</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3 text-sm uppercase tracking-wide">Systeembeheer</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.skills.systemAdmin.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-400/20 rounded-full text-xs text-orange-300 border border-orange-400/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-orange-300 font-medium mb-3 text-sm uppercase tracking-wide">Systemen & Hardware</h4>
                      <div className="flex flex-wrap gap-2">
                        {content.skills.systems.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-400/20 rounded-full text-xs text-orange-300 border border-orange-400/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Competencies */}
                <div className="bg-white/3 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                  <h3 className="text-gray-300 font-medium mb-4 text-lg border-b border-white/10 pb-2">Kerncompetenties</h3>
                  <div className="space-y-2">
                    {content.competencies.map((competency, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-sm text-gray-400">{competency}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm font-light italic">
                eenvoud behouden, één regel code tegelijk
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px) rotate(-1deg); }
            75% { transform: translateX(2px) rotate(1deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Sparkles Toggle Button */}
      <button
        onClick={() => setIsAnimatedMode(true)}
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-gray-100 hover:bg-gray-200 p-2 md:p-3 rounded-full transition-all duration-300 border border-gray-300 text-gray-700 text-lg md:text-xl shadow-sm ${
          isShaking ? 'animate-bounce' : ''
        }`}
        style={{
          animation: isShaking ? 'shake 0.6s ease-in-out' : undefined
        }}
      >
        ✨
      </button>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 md:px-12 md:py-12">
        {/* Header */}
        <header className="mb-16 pb-10 border-b-2 border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-gray-900 tracking-wide font-mono" style={{fontFamily: 'SUSE Mono, monospace'}}>
              {content.personal.name}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide">{content.personal.title}</p>
          </div>
          
          {/* Personal Information Grid */}
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Persoonlijke Gegevens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-900">{content.personal.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Telefoon:</span>
                  <span className="text-gray-900">{content.personal.phone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Geboortedatum:</span>
                  <span className="text-gray-900">{content.personal.birthDate}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Adres:</span>
                  <span className="text-gray-900 italic text-right">{content.personal.address}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Nationaliteit:</span>
                  <span className="text-gray-900">{content.personal.nationality}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">Rijbewijs:</span>
                  <span className="text-gray-900">{content.personal.driversLicense}</span>
                </div>
                {content.personal.github && (
                  <div className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-gray-600 font-medium">GitHub:</span>
                    <span className="text-gray-900">{content.personal.github}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gray-800 mr-4"></div>
                <h2 className="text-2xl font-light text-gray-900">Over Mij</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {content.about}
              </p>
            </section>

            {/* Work Experience */}
            <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gray-800 mr-4"></div>
                <h2 className="text-2xl font-light text-gray-900">Werkervaring</h2>
              </div>
              <div className="space-y-8">
                {content.experience.map((job, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-6 pb-6 last:pb-0">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{job.period}</p>
                    <p className="text-gray-600 text-sm mb-4 italic">{job.location}</p>
                    {job.description && (
                      <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>
                    )}
                    <ul className="text-gray-600 space-y-2 list-disc list-inside">
                      {job.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="leading-relaxed">{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gray-800 mr-4"></div>
                <h2 className="text-2xl font-light text-gray-900">Opleiding</h2>
              </div>
              <div className="space-y-6">
                {content.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{edu.title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{edu.period}</p>
                    <p className="text-gray-600 italic">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Technical Skills */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Technische Vaardigheden</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3 text-sm uppercase tracking-wide">Systeembeheer</h3>
                  <div className="space-y-2">
                    {content.skills.systemAdmin.map((skill, index) => (
                      <div key={index} className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-3 text-sm uppercase tracking-wide">Systemen & Hardware</h3>
                  <div className="space-y-2">
                    {content.skills.systems.map((skill, index) => (
                      <div key={index} className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Core Competencies */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Kerncompetenties</h2>
              <div className="space-y-2">
                {content.competencies.map((competency, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">{competency}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-gray-500 text-sm font-light italic">
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          75% { transform: translateX(2px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Laden...</div>
        </div>
      </div>
    }>
      <ResumeContent />
    </Suspense>
  );
}
