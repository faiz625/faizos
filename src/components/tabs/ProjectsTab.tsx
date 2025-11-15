import React, { useState } from "react";
import { TabType } from "@/hooks/useNavigation";
import { ProjectItem } from "@/components/SectionCards";

interface ProjectsTabProps {
  openTab: (tab: TabType) => void;
  onProjectClick: (item: ProjectItem) => void;
}

interface EnhancedProjectItem extends ProjectItem {
  category: string;
  tags: string[];
  status: "live" | "demo" | "archived";
  year: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ openTab, onProjectClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: EnhancedProjectItem[] = [
    {
      title: "Internal Analytics Copilot",
      body:
        "Built a modular, multi-agent assistant for a large enterprise to help analysts investigate anomalies and surface explainability artifacts. Public site shows generalized flow only; specific datasets, dashboards, and metrics are withheld for confidentiality.",
      url: "https://github.com/faiz625/Agentic-Insights-Engine",
      category: "AI/ML",
      tags: ["Multi-Agent", "Analytics", "Enterprise", "LLM"],
      status: "live",
      year: "2024",
      icon: <BrainIcon />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Signal-Fusion Forecasting",
      body:
        "Designed a forecasting pipeline that blends behavioral and engagement signals to prioritize content and campaigns. This description is generalized; internal performance figures and data sources are not disclosed.",
      architecture: "/architecture/ARCHITECTURE_Signal-Fusion-Forecasting.md",
      category: "Data Engineering",
      tags: ["Forecasting", "ML Pipeline", "Behavioral Data", "ETL"],
      status: "live",
      year: "2024",
      icon: <ChartIcon />,
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      title: "Assistive Eye-Gaze Cursor",
      body:
        "Computer-vision tool that converts eye movement into cursor control using commodity webcams. Demoed interactively; no user data retained.",
      url: "https://github.com/faiz625/Capstone-2023/tree/main",
      category: "Computer Vision",
      tags: ["Computer Vision", "Accessibility", "OpenCV", "Real-time"],
      status: "demo",
      year: "2023",
      icon: <EyeIcon />,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Long-form Story Generator",
      body:
        "LLM-driven web tool for structured, coherent narratives from prompts. Public demo uses synthetic inputs and mock storage.",
      architecture: "/architecture/ARCHITECTURE_Long-form-Story-Generator.md",
      category: "AI/ML",
      tags: ["NLP", "Creative AI", "Web App", "Content Generation"],
      status: "demo",
      year: "2023",
      icon: <BookIcon />,
      gradient: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
  ];

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8">
      {/* Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => openTab("home")} 
          className="flex items-center text-gray-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-300 transition-all duration-300 hover:scale-105 bg-white/20 dark:bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in-scale">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 dark:from-sky-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg max-w-2xl mx-auto mb-8">
          A collection of AI systems, data pipelines, and creative tools that solve real-world problems
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-300">{projects.length}</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Projects</div>
          </div>
          <div className="text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">{projects.filter(p => p.status === "live").length}</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Live</div>
          </div>
          <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">{categories.length - 1}</div>
            <div className="text-sm text-gray-500 dark:text-white/60">Categories</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-in-right">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-scale ${
              selectedCategory === category
                ? "bg-gradient-to-r from-sky-500 to-purple-500 text-white shadow-lg"
                : "bg-white/10 dark:bg-black/20 text-gray-600 dark:text-white/80 hover:bg-white/20 dark:hover:bg-black/30 border border-gray-200 dark:border-white/10"
            }`}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {category === "all" ? "All Projects" : category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            isHovered={hoveredProject === project.title}
            onHover={setHoveredProject}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <svg className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-xs text-amber-700 dark:text-amber-300">
            Project details are generalized to protect employer/client confidentiality
          </span>
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: EnhancedProjectItem;
  index: number;
  isHovered: boolean;
  onHover: (title: string | null) => void;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isHovered, onHover, onClick }) => {
  return (
    <div
      className={`group relative bg-gradient-to-br ${project.gradient} rounded-2xl p-6 border ${project.borderColor} hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => onHover(project.title)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <StatusBadge status={project.status} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 dark:bg-black/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {project.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                {project.title}
              </h3>
              <div className="text-sm text-gray-500 dark:text-white/60">{project.year} • {project.category}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/20 dark:bg-black/20 rounded-full text-xs font-medium text-gray-700 dark:text-white/80 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600 dark:text-white/60">
            {project.url ? (
              <span className="flex items-center">
                <LinkIcon className="w-4 h-4 mr-1" />
                View Repository
              </span>
            ) : (
              <span className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                View Architecture
              </span>
            )}
          </div>
          <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: "live" | "demo" | "archived" }> = ({ status }) => {
  const config = {
    live: { color: "bg-green-500", text: "Live", pulse: "animate-pulse" },
    demo: { color: "bg-blue-500", text: "Demo", pulse: "" },
    archived: { color: "bg-gray-500", text: "Archived", pulse: "" }
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 ${config[status].color} rounded-full text-white text-xs font-medium ${config[status].pulse}`}>
      <div className="w-2 h-2 bg-white rounded-full"></div>
      <span>{config[status].text}</span>
    </div>
  );
};

// Icons
const BrainIcon = () => (
  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);