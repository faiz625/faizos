"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Particles from "@/components/Particles";
import React, { useState, useEffect } from "react";
import { Grid, ProjectItem } from "@/components/SectionCards";
import DemosPanel from "@/components/DemosPanel";
import TradingPanel from "@/components/TradingPanel";
import ContactForm from "@/components/ContactForm";
import ConfidentialFooter from "@/components/ConfidentialFooter";

// --- Modal for Architecture ---
type ArchModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

function ArchModal({ open, title, onClose, children }: ArchModalProps) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#18181b] text-white rounded-2xl shadow-2xl relative border border-white/10 flex flex-col max-w-4xl max-h-[90vh] w-[90%]">
        <button
          className="absolute top-4 right-4 text-white text-lg bg-black/30 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center transition leading-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-8 pr-16 flex-1 flex flex-col min-h-0">
          <h2 className="text-2xl font-bold mb-6 tracking-tight text-sky-300 drop-shadow">{title}</h2>
          <div className="flex-1 min-h-0 min-w-0 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [archModal, setArchModal] = useState<{ open: boolean; title: string; content: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle initial hash and browser navigation
  useEffect(() => {
    const getTabFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      const validTabs = ["home", "about", "projects", "demos", "trading", "photography", "contact"];
      return validTabs.includes(hash) ? hash : "home";
    };

    // Set initial tab based on URL hash
    setActiveTab(getTabFromHash());

    // Listen for hash changes (browser back/forward)
    const handleHashChange = () => {
      setActiveTab(getTabFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openTab = (tabKey: string) => {
    setActiveTab(tabKey);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    // Update URL hash
    if (tabKey === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", `#${tabKey}`);
    }
  };

  return (
    <main className="relative min-h-screen">
      <Particles />

      {/* Navigation Header - Only show when not on home */}
      {activeTab !== "home" && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => openTab("home")} 
              className="text-xl font-semibold tracking-tight text-white hover:text-sky-300 transition-colors"
            >
              Faiz
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => openTab("about")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "about" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                About
              </button>
              <button 
                onClick={() => openTab("projects")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "projects" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => openTab("demos")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "demos" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                Demos
              </button>
              <button 
                onClick={() => openTab("trading")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "trading" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                Trading
              </button>
              <button 
                onClick={() => openTab("photography")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "photography" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                Photography
              </button>
              <button 
                onClick={() => openTab("contact")} 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeTab === "contact" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                }`}
              >
                Contact
              </button>
              
              {/* Social Media Links - Desktop */}
              <div className="ml-4 flex items-center gap-2 border-l border-white/20 pl-4">
                <a 
                  href="https://github.com/faiz625" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/faizkapadia/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
              <div className="px-4 py-4 space-y-2">
                <button 
                  onClick={() => openTab("about")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "about" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  About
                </button>
                <button 
                  onClick={() => openTab("projects")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "projects" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => openTab("demos")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "demos" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  AI Demos
                </button>
                <button 
                  onClick={() => openTab("trading")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "trading" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  Trading
                </button>
                <button 
                  onClick={() => openTab("photography")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "photography" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  Photography
                </button>
                <button 
                  onClick={() => openTab("contact")} 
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "contact" ? "bg-sky-600 text-white" : "hover:bg-white/10 text-white/80"
                  }`}
                >
                  Contact
                </button>
                
                {/* Social Links - Mobile */}
                <div className="flex justify-center items-center pt-4 space-x-4 border-t border-white/20 mt-4">
                  <a 
                    href="https://github.com/faiz625" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/faizkapadia/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area - Tab-based */}
      <div className={`min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto ${activeTab !== "home" ? "pt-24 sm:pt-28" : ""}`}>
        
        {/* About Tab */}
        {activeTab === "about" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">About Me</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-300">Who I Am</h3>
                <p className="text-white/90 leading-relaxed">
                  I'm someone who loves taking complex ideas and turning them into things that actually work. 
                  I sit at the intersection of AI and engineering, building tools that are practical, fast, and actually reliable. 
                  Whether it's an analytics copilot or an ML workflow that finally solves a pain point, I like creating things that make people say, 
                  "Wait… this is actually helpful."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-300">What I Do</h3>
                <p className="text-white/90 leading-relaxed">
                  I build agentic AI systems, multimodal ML pipelines, and scalable data setups end-to-end.
                  A lot of my work blends research ideas with real production needs, starting with quick experiments 
                  and then turning them into systems that operate consistently and perform effectively. My focus is always the same:
                  build things that solve real problems and don't fall apart when you need them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-300">Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 text-sm">
                  <div>
                    <h4 className="font-medium text-white mb-3">Programming</h4>
                    <ul className="space-y-1">
                      <li>• Python, SQL, R</li>
                      <li>• Java, C, C++</li>
                      <li>• JavaScript, HTML, CSS</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Machine Learning & AI</h4>
                    <ul className="space-y-1">
                      <li>• PyTorch, TensorFlow, Scikit-learn, XGBoost</li>
                      <li>• LLMs (GPT, Gemini, BERT), RAG, LangChain</li>
                      <li>• Vertex AI, Model deployment, MLOps</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Data Engineering</h4>
                    <ul className="space-y-1">
                      <li>• BigQuery, dbt, Airflow</li>
                      <li>• Pipeline orchestration & ETL</li>
                      <li>• Docker, CI/CD, monitoring</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Development & Tools</h4>
                    <ul className="space-y-1">
                      <li>• React, Flask, FastAPI, Django, Streamlit</li>
                      <li>• REST APIs, Git/GitHub</li>
                      <li>• JIRA, Confluence, Power BI</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-300">Interests & Hobbies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                  <div>
                    <h4 className="font-medium text-white mb-3">Technical Interests</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Large Language Models & Reasoning</li>
                      <li>• Computer Vision & Multimodal Systems</li>
                      <li>• Distributed Systems & MLOps</li>
                      <li>• Quantitative/Trading Tooling</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Personal Interests</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Photography & Visual Storytelling</li>
                      <li>• Market Analysis & Trading</li>
                      <li>• Open Source Projects</li>
                      <li>• Community Building & Side Projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-sky-300">Philosophy</h3>
                <p className="text-white/90 leading-relaxed">
                  I like building technology that helps people think clearly, move faster, and do more — rather than replace them.
                  Good AI should feel like a teammate, not a black box. If an idea feels intuitive and helps someone be more efficient, 
                  that's the kind of system I want to build.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  You can explore my projects, try the demos, or check out my photography if you want to see more of what I do.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">Projects</h2>
            
            <Grid
              items={[
                {
                  title: "Internal Analytics Copilot (anonymized)",
                  body:
                    "Built a modular, multi-agent assistant for a large enterprise to help analysts investigate anomalies and surface explainability artifacts. Public site shows generalized flow only; specific datasets, dashboards, and metrics are withheld for confidentiality.",
                  url: "https://github.com/faiz625/Agentic-Insights-Engine"
                },
                {
                  title: "Signal-Fusion Forecasting",
                  body:
                    "Designed a forecasting pipeline that blends behavioral and engagement signals to prioritize content and campaigns. This description is generalized; internal performance figures and data sources are not disclosed.",
                  architecture: "/architecture/ARCHITECTURE_Signal-Fusion-Forecasting.md"
                },
                {
                  title: "Assistive Eye-Gaze Cursor",
                  body:
                    "Computer-vision tool that converts eye movement into cursor control using commodity webcams. Demoed interactively; no user data retained.",
                  url: "https://github.com/faiz625/Capstone-2023/tree/main"
                },
                {
                  title: "Long-form Story Generator",
                  body:
                    "LLM-driven web tool for structured, coherent narratives from prompts. Public demo uses synthetic inputs and mock storage.",
                  architecture: "/architecture/ARCHITECTURE_Long-form-Story-Generator.md"
                },
              ] as ProjectItem[]}
              onItemClick={async (item: ProjectItem) => {
                if (item.architecture) {
                  const res = await fetch(item.architecture);
                  const text = await res.text();
                  setArchModal({ open: true, title: item.title + " — Architecture", content: text });
                } else if (item.url) {
                  window.open(item.url, "_blank");
                }
              }}
            />
            
            <div className="mt-6 text-xs text-white/60">
              Note: Project details are intentionally generalized to protect employer/client confidentiality.
            </div>
          </div>
        )}

        {/* Demos Tab */}
        {activeTab === "demos" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">AI Demos — Interactive</h2>
            <DemosPanel />
          </div>
        )}

        {/* Trading Tab */}
        {activeTab === "trading" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">Trading — Live Template</h2>
            <div className="w-full overflow-hidden rounded-lg">
              <TradingPanel />
            </div>
          </div>
        )}

        {/* Photography Tab */}
        {activeTab === "photography" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">Photography — Visual Stories</h2>
            
            <div className="space-y-8">
              <div>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Photography is my creative outlet, a way to capture moments, explore composition, and tell stories through visual narratives. 
                  From street photography to architectural studies, I enjoy documenting the intersection of technology and human experience.
                </p>
              </div>

              <div className="space-y-4">
                {/* Top row - 3 images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
                  <div className="rounded-lg overflow-hidden aspect-square bg-gray-800">
                    <img 
                      src="/photography/IMG_8749.jpeg" 
                      alt="Photography sample 1" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open('/photography/IMG_8749.jpeg', '_blank')}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square bg-gray-800">
                    <img 
                      src="/photography/IMG_8750.jpeg" 
                      alt="Photography sample 2" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open('/photography/IMG_8750.jpeg', '_blank')}
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden aspect-square bg-gray-800">
                    <img 
                      src="/photography/IMG_8751.jpeg" 
                      alt="Photography sample 3" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open('/photography/IMG_8751.jpeg', '_blank')}
                    />
                  </div>
                </div>
                
                {/* Bottom row - 2 images centered */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-4" style={{width: '66.67%'}}>
                    <div className="rounded-lg overflow-hidden aspect-square bg-gray-800">
                      <img 
                        src="/photography/IMG_8752.jpeg" 
                        alt="Photography sample 4" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open('/photography/IMG_8752.jpeg', '_blank')}
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden aspect-square bg-gray-800">
                      <img 
                        src="/photography/IMG_8755.jpeg" 
                        alt="Photography sample 5" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open('/photography/IMG_8755.jpeg', '_blank')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-sky-300">Equipment & Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                  <div>
                    <h4 className="font-medium text-white mb-3">Current Setup</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Nikon D5300 DSLR Camera</li>
                      <li>• AF-S DX NIKKOR 35mm f/1.8G Prime</li>
                      <li>• AF-S DX NIKKOR 18-140mm f/3.5-5.6G VR</li>
                      <li>• SB-700 Speedlight Flash</li>
                      <li>• Manfrotto PIXI Mini Tripod</li>
                      <li>• Polarizing & ND Filters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Photography Style</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Natural light portraits</li>
                      <li>• Candid moments and expressions</li>
                      <li>• Vibrant landscape compositions</li>
                      <li>• Street art and cultural documentation</li>
                      <li>• Golden hour and blue hour shots</li>
                      <li>• Shallow depth of field techniques</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => openTab("home")} 
                className="flex items-center text-white/60 hover:text-sky-300 transition-colors mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-sky-300">Contact — Email Faiz</h2>
            <ContactForm />
          </div>
        )}

        {/* Home/Default Tab */}
        {activeTab === "home" && (
          <div className="min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight mb-4 sm:mb-6">Faiz Kapadia</h1>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-4 px-4">
                Personal portfolio with demos, projects, and photography.
              </p>
              
              {/* Social Links Section */}
              <div className="flex justify-center items-center mt-6 mb-4 space-x-2 sm:space-x-4 flex-wrap gap-2">
                <a 
                  href="https://github.com/faiz625" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-lg hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30"
                >
                  <svg className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-white/80 font-medium">GitHub</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/faizkapadia/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-lg hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30"
                >
                  <svg className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-white/80 font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                <button onClick={() => openTab("about")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">👋</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">About Me</div>
                  <div className="text-xs sm:text-sm text-white/60">Who I am & what I do</div>
                </button>
                
                <button onClick={() => openTab("projects")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">💼</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">Projects</div>
                  <div className="text-xs sm:text-sm text-white/60">Selected work & demos</div>
                </button>
                
                <button onClick={() => openTab("demos")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">🤖</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">AI Demos</div>
                  <div className="text-xs sm:text-sm text-white/60">Interactive experiences</div>
                </button>
                
                <button onClick={() => openTab("trading")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">📈</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">Trading</div>
                  <div className="text-xs sm:text-sm text-white/60">Live market dashboard</div>
                </button>
                
                <button onClick={() => openTab("photography")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">📸</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">Photography</div>
                  <div className="text-xs sm:text-sm text-white/60">Visual stories & moments</div>
                </button>
                
                <button onClick={() => openTab("contact")} className="group p-4 sm:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all border border-white/10 hover:border-sky-300/30">
                  <div className="text-sky-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform text-xl sm:text-2xl">✉️</div>
                  <div className="font-medium mb-1 text-sm sm:text-base">Contact</div>
                  <div className="text-xs sm:text-sm text-white/60">Get in touch</div>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Architecture Modal */}
      {archModal?.open && (
        <ArchModal
          open={archModal.open}
          title={archModal.title}
          onClose={() => setArchModal(null)}
        >
          <div className="prose prose-invert text-base leading-relaxed min-w-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{archModal.content}</ReactMarkdown>
          </div>
        </ArchModal>
      )}

      <ConfidentialFooter />
    </main>
  );
}