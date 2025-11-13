
"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Particles from "@/components/Particles";
import DesktopWindow from "@/components/DesktopWindow";
import Dock, { defaultDock } from "@/components/Dock";
import CommandK from "@/components/CommandK";
import React, { useState, useRef, useEffect } from "react";
import { Grid, ProjectItem } from "@/components/SectionCards";
import DemosPanel from "@/components/DemosPanel";
import TradingPanel from "@/components/TradingPanel";
import ContactForm from "@/components/ContactForm";
import ConfidentialFooter from "@/components/ConfidentialFooter";

// --- Dynamic Resizable Modal for Architecture ---
type ResizableArchModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

function ResizableArchModal({ open, title, onClose, children }: ResizableArchModalProps) {
  const [size, setSize] = useState({ width: 700, height: 600 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [startSize, setStartSize] = useState<{ width: number; height: number }>({ width: 700, height: 600 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle resize
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartSize({ ...size });
    e.preventDefault();
    e.stopPropagation();
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !dragStart) return;
    setSize({
      width: Math.max(340, Math.min(window.innerWidth - 64, startSize.width + (e.clientX - dragStart.x))),
      height: Math.max(320, Math.min(window.innerHeight - 64, startSize.height + (e.clientY - dragStart.y))),
    });
  };
  const onMouseUp = () => setDragging(false);

  // Attach/detach listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, onMouseMove]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[#18181b] text-white rounded-2xl shadow-2xl relative border border-white/10 flex flex-col"
        style={{ width: size.width, height: size.height, minWidth: 340, minHeight: 320, maxWidth: '95vw', maxHeight: '90vh' }}
      >
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
        {/* Resize handle */}
        <div
          onMouseDown={onMouseDown}
          className="absolute right-2 bottom-2 w-6 h-6 cursor-nwse-resize z-10 flex items-end justify-end"
          style={{ userSelect: dragging ? "none" : "auto" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 19L19 5M9 19H19V9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [show, setShow] = useState({
    about: true,
    projects: false,
    demos: false,
    trading: false,
    photography: false,
    contact: false,
  });
  const [archModal, setArchModal] = useState<{ open: boolean; title: string; content: string } | null>(null);

  const open = (key: keyof typeof show) => setShow((s) => ({ ...s, [key]: true }));
  const close = (key: keyof typeof show) => () => setShow((s) => ({ ...s, [key]: false }));

  const dock = defaultDock({
    about: () => open("about"),
    projects: () => open("projects"),
    demos: () => open("demos"),
    trading: () => open("trading"),
    photography: () => open("photography"),
    contact: () => open("contact"),
  });

  const commands = [
    { id: "about", label: "About Me", action: () => open("about") },
    { id: "projects", label: "Open Projects", action: () => open("projects") },
    { id: "demos", label: "Open AI Demos", action: () => open("demos") },
    { id: "trading", label: "Open Trading", action: () => open("trading") },
    { id: "photography", label: "Open Photography", action: () => open("photography") },
    { id: "contact", label: "Open Contact", action: () => open("contact") },
  ];

  return (
    <main className="relative min-h-screen">
      <Particles />

      {/* Hero */}
      <section className="pt-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">FaizOS</h1>
        <p className="mt-3 text-white/70">
          Personal portfolio with some demos, projects, and photography.
          Press <kbd className="px-2 py-1 rounded bg-white/10">⌘K</kbd> or use the dock below.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={() => open("about")} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">About Me</button>
          <button onClick={() => open("projects")} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">View Projects</button>
          <button onClick={() => open("demos")} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">Try Demos</button>
          <button onClick={() => open("contact")} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">Contact</button>
        </div>
      </section>

      {/* Windows */}
{show.about && (
  <DesktopWindow
    title="About — Faiz"
    onClose={close("about")}
    initialX={100}
    initialY={140}
    className="w-[800px]"
  >
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-sky-300">Who I Am</h3>
        <p className="text-white/90 leading-relaxed">
          I'm someone who loves taking complex ideas and turning them into things that actually work. 
          I sit at the intersection of AI and engineering, building tools that are practical, fast, and actually reliable. 
          Whether it’s an analytics copilot or an ML workflow that finally solves a pain point, I like creating things that make people say, 
          “Wait… this is actually helpful.”
        </p>
      </div>

      {/* What I Do */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-sky-300">What I Do</h3>
        <p className="text-white/90 leading-relaxed">
          I build agentic AI systems, multimodal ML pipelines, and scalable data setups end-to-end.
          A lot of my work blends research ideas with real production needs, starting with quick experiments 
          and then turning them into systems that operate consistently and perform effectively. My focus is always the same:
          build things that solve real problems and don’t fall apart when you need them.
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-sky-300">Skills</h3>
        <div className="grid grid-cols-2 gap-6 text-white/80 text-sm">

          <div>
            <h4 className="font-medium text-white mb-2">Programming</h4>
            <ul className="space-y-1">
              <li>• Python, SQL, R</li>
              <li>• Java, C, C++</li>
              <li>• JavaScript, HTML, CSS</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Machine Learning & AI</h4>
            <ul className="space-y-1">
              <li>• PyTorch, TensorFlow, Scikit-learn, XGBoost</li>
              <li>• LLMs (GPT, Gemini, BERT), RAG, LangChain</li>
              <li>• Vertex AI, Model deployment, MLOps</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Data Engineering</h4>
            <ul className="space-y-1">
              <li>• BigQuery, dbt, Airflow</li>
              <li>• Pipeline orchestration & ETL</li>
              <li>• Docker, CI/CD, monitoring</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Development & Tools</h4>
            <ul className="space-y-1">
              <li>• React, Flask, FastAPI, Django, Streamlit</li>
              <li>• REST APIs, Git/GitHub</li>
              <li>• JIRA, Confluence, Power BI</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-sky-300">Interests & Hobbies</h3>
        <div className="grid grid-cols-2 gap-4 text-white/80">
          <div>
            <h4 className="font-medium text-white mb-2">Technical Interests</h4>
            <ul className="space-y-1 text-sm">
              <li>• Large Language Models & Reasoning</li>
              <li>• Computer Vision & Multimodal Systems</li>
              <li>• Distributed Systems & MLOps</li>
              <li>• Quantitative/Trading Tooling</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Personal Interests</h4>
            <ul className="space-y-1 text-sm">
              <li>• Photography & Visual Storytelling</li>
              <li>• Market Analysis & Trading</li>
              <li>• Open Source Projects</li>
              <li>• Community Building & Side Projects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-sky-300">Philosophy</h3>
        <p className="text-white/90 leading-relaxed">
          I like building technology that helps people think clearly, move faster, and do more — rather than replace them.
          Good AI should feel like a teammate, not a black box. If an idea feels intuitive and helps someone be more efficient, 
          that’s the kind of system I want to build.
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-white/60 text-sm">
          You can explore my projects, try the demos, or check out my photography if you want to see more of what I do.
        </p>
      </div>

    </div>
  </DesktopWindow>
)}

      {show.projects && (
        <DesktopWindow title="Projects — Selected (anonymized)" onClose={close("projects")} initialX={80} initialY={180} className="w-[900px]">
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
          <div className="mt-4 text-xs text-white/60">
            Note: Project details are intentionally generalized to protect employer/client confidentiality.
          </div>
          {archModal?.open && (
            <ResizableArchModal
              open={archModal.open}
              title={archModal.title}
              onClose={() => setArchModal(null)}
            >
              <div className="prose prose-invert text-base leading-relaxed min-w-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{archModal.content}</ReactMarkdown>
              </div>
            </ResizableArchModal>
          )}
        </DesktopWindow>
      )}

      {show.demos && (
        <DesktopWindow title="AI Demos — Interactive" onClose={close("demos")} initialX={820} initialY={160} className="w-[720px]">
          <DemosPanel />
        </DesktopWindow>
      )}

      {show.trading && (
        <DesktopWindow
          title="Trading — Live Template"
          onClose={close("trading")}
          initialX={120}
          initialY={80}
          className="w-[1100px] h-[750px] max-h-[85vh]"
        >
          <TradingPanel />
        </DesktopWindow>
      )}

      {show.photography && (
        <DesktopWindow title="Photography — Visual Stories" onClose={close("photography")} initialX={200} initialY={120} className="w-[900px]">
          <div className="space-y-6">
            <div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Photography is my creative outlet, a way to capture moments, explore composition, and tell stories through visual narratives. 
                From street photography to architectural studies, I enjoy documenting the intersection of technology and human experience.
              </p>
            </div>

            <div className="text-center mb-6">
              <a 
                href="https://vsco.co/zaif-/gallery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
              >
                View Full Portfolio on VSCO
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M17 6l-7 7M17 6h-5M17 6v5" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Your actual photos */}
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
              <div 
                className="rounded-lg aspect-square bg-gradient-to-br from-sky-700/30 to-sky-800/30 border-2 border-dashed border-sky-500/30 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gradient-to-br hover:from-sky-600/40 hover:to-sky-700/40 transition-all duration-300"
                onClick={() => window.open('https://vsco.co/zaif-/gallery', '_blank')}
              >
                <div className="w-8 h-8 bg-sky-500/30 rounded mb-2"></div>
                <span className="text-sky-300/60 text-xs">More on VSCO</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-sky-300">Equipment & Style</h3>
              <div className="grid grid-cols-2 gap-6 text-white/80">
                <div>
                  <h4 className="font-medium text-white mb-2">Current Setup</h4>
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
                  <h4 className="font-medium text-white mb-2">Photography Style</h4>
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

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm mb-3">
                Full collection available on VSCO. Click the button above to explore the complete portfolio.
              </p>
              <p className="text-white/50 text-xs">
                Note: VSCO doesn't provide public API access for embedding images directly, but you can view all work on their platform.
              </p>
            </div>
          </div>
        </DesktopWindow>
      )}

      {/* Resume window removed */}

      {show.contact && (
        <DesktopWindow title="Contact — Email Faiz" onClose={close("contact")} initialX={1040} initialY={300} className="w-[520px]">
          <ContactForm />
        </DesktopWindow>
      )}

      <ConfidentialFooter />

      {/* Dock + Command palette */}
      <Dock items={dock} />
      <CommandK commands={commands} />
    </main>
  );
}
