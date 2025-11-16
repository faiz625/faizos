import React from "react";
import { TabType } from "@/hooks/useNavigation";
import { useSkillsToggle } from "@/hooks/useSkillsToggle";
import { 
  SiPython, SiMysql, SiCplusplus, SiJavascript, SiR, SiC,
  SiGooglecloud, SiDbt, SiApacheairflow, SiDocker, SiKubernetes, SiApachespark, SiApachekafka,
  SiTensorflow, SiPytorch, SiScikitlearn, SiOpenai, SiLangchain,
  SiReact, SiFlask, SiDjango, SiStreamlit, SiFastapi, SiGit, SiGithub, SiJira, SiLatex
} from 'react-icons/si';
import { FaDatabase, FaCode, FaCog, FaJava, FaBrain, FaRocket, FaBook, FaRobot, FaGem, FaCloud, FaLink } from 'react-icons/fa';

interface AboutTabProps {
  openTab: (tab: TabType) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ openTab }) => {
  const {
    showAllLanguages,
    setShowAllLanguages,
    showAllDataEng,
    setShowAllDataEng,
    showAllMLAI,
    setShowAllMLAI,
    showAllDevTools,
    setShowAllDevTools,
  } = useSkillsToggle();

  return (
    <div className="relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="mb-4 sm:mb-6 animate-fade-in-scale">
        <button 
          onClick={() => openTab("home")} 
          className="flex items-center text-gray-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-300 transition-all duration-300 hover:scale-105 bg-white/20 dark:bg-black/20 px-3 py-2 sm:px-4 sm:py-3 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10 z-50 relative"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm sm:text-base">Back to Home</span>
        </button>
      </div>

      <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
        <HeroSection />
      </div>
      
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-3 sm:p-4 md:p-8 animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.2s'}}>
        <div className="space-y-8 sm:space-y-12">
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <PersonalInfo />
          </div>
          <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <SkillsSection 
              showAllLanguages={showAllLanguages}
              setShowAllLanguages={setShowAllLanguages}
              showAllDataEng={showAllDataEng}
              setShowAllDataEng={setShowAllDataEng}
              showAllMLAI={showAllMLAI}
              setShowAllMLAI={setShowAllMLAI}
              showAllDevTools={showAllDevTools}
              setShowAllDevTools={setShowAllDevTools}
            />
          </div>
          <div className="animate-slide-up" style={{animationDelay: '0.5s'}}>
            <InterestsSection />
          </div>
          <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <PhilosophySection />
          </div>
          <div className="animate-slide-up" style={{animationDelay: '0.7s'}}>
            <CTASection openTab={openTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => (
  <div className="bg-gradient-to-br from-black/10 via-sky-500/5 to-purple-500/10 dark:from-white/10 dark:via-sky-400/10 dark:to-purple-400/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-white/20 p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 relative group transition-all duration-500 hover:border-sky-400/40 dark:hover:border-sky-300/40 hover:shadow-2xl hover:shadow-sky-500/10">
    {/* Floating geometric shapes with enhanced animations - reduced on mobile */}
    <div className="hidden sm:block absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-400/20 to-purple-500/20 rounded-full animate-glow-pulse"></div>
    <div className="hidden sm:block absolute -bottom-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full animate-bounce-gentle"></div>
    <div className="hidden md:block absolute top-1/2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-sky-300/40 to-cyan-400/40 rounded-full animate-pulse"></div>
    
    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
      {/* Enhanced Avatar with multiple floating rings - simplified on mobile */}
      <div className="relative group/avatar animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-sky-400 via-purple-500 to-pink-500 p-1 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-600 dark:text-sky-300 hover:scale-110 transition-transform duration-300">
            FK
          </div>
        </div>
        {/* Multiple floating rings with different animations - reduced on mobile */}
        <div className="hidden sm:block absolute -inset-3 sm:-inset-4 border-2 border-sky-400/30 rounded-full animate-glow-pulse"></div>
        <div className="hidden md:block absolute -inset-5 sm:-inset-6 border border-purple-400/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="hidden lg:block absolute -inset-7 sm:-inset-8 border border-pink-400/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Enhanced Hero Text */}
      <div className="text-center md:text-left animate-slide-in-right" style={{animationDelay: '0.4s'}}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 dark:from-sky-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent mb-3 sm:mb-4 animate-gradient hover:scale-105 transition-transform duration-300">
          About Me
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white/80 mb-4 sm:mb-6 max-w-lg leading-relaxed animate-fade-in-scale" style={{animationDelay: '0.6s'}}>
          Building AI systems that matter, one algorithm at a time. 
          <span className="bg-gradient-to-r from-sky-600 to-purple-600 dark:from-sky-300 dark:to-purple-300 bg-clip-text text-transparent font-semibold hover:scale-110 inline-block transition-transform duration-300"> Engineer. Creator. Problem Solver.</span>
        </p>
        
        {/* Enhanced Floating Stats with animations - responsive grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-md">
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-white/30 dark:border-white/10 hover:scale-110 transition-all duration-300 group/stat animate-slide-up overflow-hidden" style={{animationDelay: '0.8s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-300 animate-scale-pulse">5+</div>
              <div className="text-xs text-gray-600 dark:text-white/60">Years ML</div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-white/30 dark:border-white/10 hover:scale-110 transition-all duration-300 group/stat animate-slide-up overflow-hidden" style={{animationDelay: '1s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-300 animate-scale-pulse" style={{animationDelay: '0.2s'}}>20+</div>
              <div className="text-xs text-gray-600 dark:text-white/60">Projects</div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-white/30 dark:border-white/10 hover:scale-110 transition-all duration-300 group/stat animate-slide-up overflow-hidden" style={{animationDelay: '1.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-orange-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-xl sm:text-2xl font-bold text-pink-600 dark:text-pink-300 animate-scale-pulse" style={{animationDelay: '0.4s'}}>∞</div>
              <div className="text-xs text-gray-600 dark:text-white/60">Ideas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PersonalInfo: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
    <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 sm:p-6 border border-sky-500/20 hover-lift group animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.1s'}}>
      {/* Background shimmer effect - disabled on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-sky-600 dark:text-sky-300 flex items-center animate-slide-in-right" style={{animationDelay: '0.2s'}}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          Who I Am
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-white/90 leading-relaxed animate-fade-in-scale" style={{animationDelay: '0.3s'}}>
          I'm someone who loves taking complex ideas and turning them into things that actually work. 
          I sit at the intersection of AI and engineering, building tools that are practical, fast, and actually reliable. 
          Whether it's an analytics copilot or an ML workflow that finally solves a pain point, I like creating things that make people say: 
        </p>
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/20 dark:bg-black/20 rounded-lg border-l-4 border-sky-500 animate-slide-up hover:scale-105 transition-all duration-300 group/quote" style={{animationDelay: '0.4s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-blue-500/5 opacity-0 group-hover/quote:opacity-100 transition-opacity duration-300"></div>
          <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-300 dark:to-blue-300 bg-clip-text text-transparent italic relative z-10">
            "Wait… this is actually helpful."
          </p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 sm:p-6 border border-purple-500/20 hover-lift group animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.2s'}}>
      {/* Background shimmer effect - disabled on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-600 dark:text-purple-300 flex items-center animate-slide-in-right" style={{animationDelay: '0.3s'}}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          What I Do
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-white/90 leading-relaxed animate-fade-in-scale" style={{animationDelay: '0.4s'}}>
          I build agentic AI systems, multimodal ML pipelines, and scalable data setups end-to-end.
          A lot of my work blends research ideas with real production needs, starting with quick experiments 
          and then turning them into systems that operate consistently and perform effectively. My focus is always the same:
        </p>
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/20 dark:bg-black/20 rounded-lg border-l-4 border-purple-500 animate-slide-up hover:scale-105 transition-all duration-300 group/quote" style={{animationDelay: '0.5s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover/quote:opacity-100 transition-opacity duration-300"></div>
          <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent italic relative z-10">
            "Build things that solve real problems and don't fall apart when you need them."
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface SkillsSectionProps {
  showAllLanguages: boolean;
  setShowAllLanguages: (show: boolean) => void;
  showAllDataEng: boolean;
  setShowAllDataEng: (show: boolean) => void;
  showAllMLAI: boolean;
  setShowAllMLAI: (show: boolean) => void;
  showAllDevTools: boolean;
  setShowAllDevTools: (show: boolean) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  showAllLanguages,
  setShowAllLanguages,
  showAllDataEng,
  setShowAllDataEng,
  showAllMLAI,
  setShowAllMLAI,
  showAllDevTools,
  setShowAllDevTools,
}) => (
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-sky-600 dark:text-sky-300 flex items-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-sky-500 to-purple-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      Skills & Expertise
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
      <div className="space-y-4 sm:space-y-6">
        <LanguagesSkillCard showAll={showAllLanguages} setShowAll={setShowAllLanguages} />
        <DataEngSkillCard showAll={showAllDataEng} setShowAll={setShowAllDataEng} />
      </div>
      <div className="space-y-4 sm:space-y-6">
        <MLAISkillCard showAll={showAllMLAI} setShowAll={setShowAllMLAI} />
        <DevToolsSkillCard showAll={showAllDevTools} setShowAll={setShowAllDevTools} />
      </div>
    </div>
  </div>
);

interface SkillCardProps {
  showAll: boolean;
  setShowAll: (show: boolean) => void;
}

const LanguagesSkillCard: React.FC<SkillCardProps> = ({ showAll, setShowAll }) => {
  const languages = [
    { name: 'Python', level: 95, icon: SiPython, color: 'text-yellow-500' },
    { name: 'SQL', level: 90, icon: SiMysql, color: 'text-blue-500' },
    { name: 'Java', level: 85, icon: FaJava, color: 'text-orange-600' },
    { name: 'R', level: 80, icon: SiR, color: 'text-blue-600' },
    { name: 'C', level: 75, icon: SiC, color: 'text-blue-700' },
    { name: 'C++', level: 75, icon: SiCplusplus, color: 'text-blue-800' },
    { name: 'JavaScript', level: 85, icon: SiJavascript, color: 'text-yellow-400' }
  ];

  return (
    <div className="bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-xl p-4 sm:p-6 border border-sky-500/20 flex flex-col min-h-[250px] sm:min-h-[300px] group hover:scale-[1.02] transition-all duration-300 animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.1s'}}>
      {/* Background shimmer effect - disabled on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-center animate-slide-in-right" style={{animationDelay: '0.2s'}}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded mr-2 sm:mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"></div>
          Programming Languages
        </h4>
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2 sm:space-y-3">
            {languages.slice(0, showAll ? 7 : 5).map((lang, index) => {
              const isInitiallyVisible = index < 5;
              const animationDelay = isInitiallyVisible ? `${0.3 + index * 0.1}s` : '0s';
              
              return (
                <div 
                  key={lang.name} 
                  className={`flex items-center justify-between group/lang hover:scale-105 transition-all duration-300 ${
                    isInitiallyVisible ? 'animate-slide-up' : 'opacity-0 animate-[slideInFast_0.3s_ease-out_forwards]'
                  }`} 
                  style={{
                    animationDelay: animationDelay,
                    ...((!isInitiallyVisible && showAll) && { 
                      animation: 'slideInFast 0.3s ease-out forwards',
                      animationDelay: `${(index - 5) * 0.1}s`
                    })
                  }}
                >
                  <div className="flex items-center w-20 sm:w-24">
                    <lang.icon className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${lang.color} group-hover/lang:scale-110 transition-transform duration-300`} />
                    <span className="text-gray-600 dark:text-white/80 text-xs sm:text-sm font-medium">{lang.name}</span>
                  </div>
                  <div className="flex-1 mx-2 sm:mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-sky-500 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-2000 group-hover/lang:animate-pulse" 
                      style={{
                        width: `${lang.level}%`,
                        animationDelay: isInitiallyVisible ? `${0.5 + index * 0.2}s` : '0.2s'
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-white/60 min-w-[2.5rem] sm:min-w-[3rem] text-right font-mono">{lang.level}%</span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-3 sm:mt-4 px-3 py-2 sm:px-4 sm:py-2 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-white/80 transition-all hover:scale-105 border border-sky-300/30 shimmer"
          >
            {showAll ? 'Show Less' : 'Show More (2 more)'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DataEngSkillCard: React.FC<SkillCardProps> = ({ showAll, setShowAll }) => {
  const dataEngTools = [
    { name: 'BigQuery', icon: SiGooglecloud, color: 'text-blue-500' },
    { name: 'dbt', icon: SiDbt, color: 'text-orange-500' },
    { name: 'Airflow', icon: SiApacheairflow, color: 'text-blue-400' },
    { name: 'Docker', icon: SiDocker, color: 'text-blue-600' },
    { name: 'CI/CD', icon: FaCog, color: 'text-gray-600' },
    { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-700' },
    { name: 'Spark', icon: SiApachespark, color: 'text-orange-600' },
    { name: 'Kafka', icon: SiApachekafka, color: 'text-gray-800 dark:text-white' }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 flex flex-col min-h-[300px] group hover:scale-[1.02] transition-all duration-300 animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.2s'}}>
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center animate-slide-in-right" style={{animationDelay: '0.3s'}}>
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"></div>
          Data Engineering
        </h4>
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-3">
            {dataEngTools.slice(0, showAll ? 8 : 6).map((tech, index) => {
              const isInitiallyVisible = index < 6;
              const animationDelay = isInitiallyVisible ? `${0.4 + index * 0.1}s` : '0s';
              
              return (
                <div 
                  key={tech.name} 
                  className={`flex flex-col items-center space-y-1 px-2 py-3 bg-white/20 dark:bg-black/20 rounded-lg border border-purple-300/30 hover:scale-125 hover:bg-white/30 dark:hover:bg-black/30 transition-all cursor-default text-center group/icon ${
                    isInitiallyVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: animationDelay,
                    ...((!isInitiallyVisible && showAll) && { 
                      animation: 'slideInFast 0.3s ease-out forwards',
                      animationDelay: `${(index - 6) * 0.1}s`
                    })
                  }}
                >
                  <tech.icon className={`w-6 h-6 ${tech.color} group-hover/icon:animate-pulse`} />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 px-4 py-2 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg text-sm font-medium text-gray-700 dark:text-white/80 transition-all hover:scale-105 border border-purple-300/30 shimmer"
          >
            {showAll ? 'Show Less' : 'Show More (2 more)'}
          </button>
        </div>
      </div>
    </div>
  );
};

const MLAISkillCard: React.FC<SkillCardProps> = ({ showAll, setShowAll }) => {
  const mlaiTools = [
    { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-500' },
    { name: 'PyTorch', icon: SiPytorch, color: 'text-red-600' },
    { name: 'Scikit-learn', icon: SiScikitlearn, color: 'text-blue-500' },
    { name: 'XGBoost', icon: FaRocket, color: 'text-green-600' },
    { name: 'BERT', icon: FaBook, color: 'text-purple-600' },
    { name: 'GPT', icon: SiOpenai, color: 'text-green-500' },
    { name: 'Gemini', icon: FaGem, color: 'text-blue-400' },
    { name: 'Vertex AI', icon: FaCloud, color: 'text-blue-600' },
    { name: 'RAG', icon: FaLink, color: 'text-teal-500' },
    { name: 'LangChain', icon: SiLangchain, color: 'text-yellow-600' }
  ];

  return (
    <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20 flex flex-col min-h-[300px] group hover:scale-[1.02] transition-all duration-300 animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.1s'}}>
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center animate-slide-in-right" style={{animationDelay: '0.2s'}}>
          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"></div>
          Machine Learning & AI
        </h4>
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-3">
            {mlaiTools.slice(0, showAll ? 10 : 6).map((tech, index) => {
              const isInitiallyVisible = index < 6;
              const animationDelay = isInitiallyVisible ? `${0.3 + index * 0.1}s` : '0s';
              
              return (
                <div 
                  key={tech.name} 
                  className={`flex flex-col items-center space-y-1 px-2 py-3 bg-white/20 dark:bg-black/20 rounded-lg border border-green-300/30 hover:scale-125 hover:bg-white/30 dark:hover:bg-black/30 transition-all cursor-default text-center group/icon ${
                    isInitiallyVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: animationDelay,
                    ...((!isInitiallyVisible && showAll) && { 
                      animation: 'slideInFast 0.3s ease-out forwards',
                      animationDelay: `${(index - 6) * 0.1}s`
                    })
                  }}
                >
                  <tech.icon className={`w-6 h-6 ${tech.color} group-hover/icon:animate-pulse`} />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 px-4 py-2 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg text-sm font-medium text-gray-700 dark:text-white/80 transition-all hover:scale-105 border border-green-300/30 shimmer"
          >
            {showAll ? 'Show Less' : 'Show More (4 more)'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DevToolsSkillCard: React.FC<SkillCardProps> = ({ showAll, setShowAll }) => {
  const devTools = [
    { name: 'React', icon: SiReact, color: 'text-blue-400' },
    { name: 'Flask', icon: SiFlask, color: 'text-gray-700 dark:text-white' },
    { name: 'Django', icon: SiDjango, color: 'text-green-700' },
    { name: 'Streamlit', icon: SiStreamlit, color: 'text-red-500' },
    { name: 'FastAPI', icon: SiFastapi, color: 'text-teal-600' },
    { name: 'REST APIs', icon: FaCode, color: 'text-purple-600' },
    { name: 'Git', icon: SiGit, color: 'text-orange-600' },
    { name: 'GitHub', icon: SiGithub, color: 'text-gray-800 dark:text-white' },
    { name: 'JIRA', icon: SiJira, color: 'text-blue-600' },
    { name: 'Confluence', icon: FaDatabase, color: 'text-blue-500' },
    { name: 'LaTeX', icon: SiLatex, color: 'text-green-600' }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20 flex flex-col min-h-[300px] group hover:scale-[1.02] transition-all duration-300 animate-fade-in-scale overflow-hidden" style={{animationDelay: '0.2s'}}>
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center animate-slide-in-right" style={{animationDelay: '0.3s'}}>
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded mr-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"></div>
          Development & Tools
        </h4>
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-3">
            {devTools.slice(0, showAll ? 11 : 6).map((tech, index) => {
              const isInitiallyVisible = index < 6;
              const animationDelay = isInitiallyVisible ? `${0.4 + index * 0.1}s` : '0s';
              
              return (
                <div 
                  key={tech.name} 
                  className={`flex flex-col items-center space-y-1 px-2 py-3 bg-white/20 dark:bg-black/20 rounded-lg border border-orange-300/30 hover:scale-125 hover:bg-white/30 dark:hover:bg-black/30 transition-all cursor-default text-center group/icon ${
                    isInitiallyVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: animationDelay,
                    ...((!isInitiallyVisible && showAll) && { 
                      animation: 'slideInFast 0.3s ease-out forwards',
                      animationDelay: `${(index - 6) * 0.1}s`
                    })
                  }}
                >
                  <tech.icon className={`w-6 h-6 ${tech.color} group-hover/icon:animate-pulse`} />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 px-4 py-2 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg text-sm font-medium text-gray-700 dark:text-white/80 transition-all hover:scale-105 border border-orange-300/30 shimmer"
          >
            {showAll ? 'Show Less' : 'Show More (5 more)'}
          </button>
        </div>
      </div>
    </div>
  );
};

const InterestsSection: React.FC = () => (
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-sky-600 dark:text-sky-300 flex items-center animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 animate-bounce-gentle hover:rotate-12 transition-transform duration-300">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      Interests & Passions
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {[
        {
          title: "Technical Interests",
          icon: "🔬",
          gradient: "from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-500/30",
          items: [
            { text: "Large Language Models & Reasoning", emoji: "🧠", desc: "Exploring the frontiers of AI cognition" },
            { text: "Computer Vision & Multimodal Systems", emoji: "👁️", desc: "Making machines see and understand" },
            { text: "Distributed Systems & MLOps", emoji: "⚙️", desc: "Scaling AI systems reliably" },
            { text: "Quantitative/Trading Tooling", emoji: "📊", desc: "Building data-driven financial tools" }
          ]
        },
        {
          title: "Personal Interests", 
          icon: "🎨",
          gradient: "from-purple-500/20 to-pink-500/20",
          borderColor: "border-purple-500/30",
          items: [
            { text: "Photography & Visual Storytelling", emoji: "📸", desc: "Capturing moments and emotions" },
            { text: "Market Analysis & Trading", emoji: "📈", desc: "Understanding financial patterns" },
            { text: "Open Source Projects", emoji: "🌐", desc: "Contributing to the community" },
            { text: "Community Building & Side Projects", emoji: "🤝", desc: "Connecting people through tech" }
          ]
        }
      ].map((section, index) => (
        <div key={section.title} className={`bg-gradient-to-br ${section.gradient} rounded-xl p-4 sm:p-6 border ${section.borderColor} hover-lift hover:scale-105 transition-all duration-300 group animate-fade-in-scale overflow-hidden`} style={{animationDelay: `${0.2 + index * 0.1}s`}}>
          {/* Background shimmer effect - disabled on mobile for performance */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center animate-slide-in-right" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{section.icon}</span>
              <span className="text-base sm:text-lg">{section.title}</span>
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={item.text} className="group/item bg-white/10 dark:bg-black/10 rounded-lg p-3 sm:p-4 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-slide-up overflow-hidden" style={{animationDelay: `${0.4 + index * 0.1 + itemIndex * 0.1}s`}}>
                  {/* Item background shimmer - disabled on mobile */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -skew-x-12 transform translate-x-full group-hover/item:translate-x-[-200%] transition-transform duration-1000"></div>
                  
                  <div className="flex items-start space-x-2 sm:space-x-3 relative z-10">
                    <span className="text-lg sm:text-xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 dark:text-white text-sm sm:text-base mb-1 group-hover/item:text-sky-600 dark:group-hover/item:text-sky-300 transition-colors">
                        {item.text}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-white/60 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PhilosophySection: React.FC = () => (
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-sky-600 dark:text-sky-300 flex items-center animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 animate-glow hover:rotate-12 hover:scale-110 transition-all duration-300">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      Philosophy
    </h3>
    <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-indigo-500/20 overflow-hidden group hover:scale-[1.02] transition-all duration-500 animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
      {/* Multiple background patterns for enhanced effect - simplified on mobile */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-transparent via-indigo-500/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1500"></div>
      
      {/* Floating thought bubbles - reduced on mobile */}
      <div className="hidden sm:block absolute top-4 right-4 w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400/30 rounded-full animate-pulse"></div>
      <div className="hidden md:block absolute bottom-6 left-6 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="hidden lg:block absolute top-1/3 left-1/4 w-1 h-1 bg-pink-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-20 dark:opacity-30 animate-bounce-gentle">💭</div>
        <blockquote className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-white/90 leading-snug italic relative animate-slide-up px-4 sm:px-8" style={{animationDelay: '0.3s'}}>
          <div className="absolute -left-3 sm:-left-6 -top-1 sm:-top-2 text-4xl sm:text-6xl text-indigo-500/30 font-serif animate-fade-in-scale" style={{animationDelay: '0.4s'}}>"</div>
          <span className="animate-fade-in-scale" style={{animationDelay: '0.5s'}}>
            I like building technology that helps people think clearly, move faster, and do more — rather than replace them.
            Good AI should feel like a teammate, not a black box. If an idea feels intuitive and helps someone be more efficient, 
            that's the kind of system I want to build.
          </span>
          <div className="absolute -right-3 sm:-right-6 -bottom-1 sm:-bottom-2 text-4xl sm:text-6xl text-indigo-500/30 font-serif transform rotate-180 animate-fade-in-scale" style={{animationDelay: '0.6s'}}>"</div>
        </blockquote>
        <div className="mt-4 sm:mt-6 flex items-center justify-center animate-slide-up" style={{animationDelay: '0.7s'}}>
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 animate-gradient"></div>
          <span className="mx-2 sm:mx-4 text-xs sm:text-sm text-gray-500 dark:text-white/60 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent text-center">
            Building AI that empowers, not replaces
          </span>
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-indigo-500 to-purple-500 animate-gradient"></div>
        </div>
      </div>
    </div>
  </div>
);

interface CTASectionProps {
  openTab: (tab: TabType) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ openTab }) => (
  <div className="pt-6 sm:pt-8 border-t border-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent relative animate-slide-up" style={{animationDelay: '0.1s'}}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent animate-gradient"></div>
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3 sm:space-x-4 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 animate-glow-pulse">
          <span className="text-white font-bold text-xs sm:text-sm">FK</span>
        </div>
        <div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-white/80 font-medium animate-fade-in-scale" style={{animationDelay: '0.3s'}}>Ready to collaborate?</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60 animate-fade-in-scale" style={{animationDelay: '0.4s'}}>Explore my projects, try the demos, or check out my photography.</p>
        </div>
      </div>
      <div className="flex space-x-2 sm:space-x-3 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
        <button 
          onClick={() => openTab("projects")} 
          className="px-3 py-2 sm:px-4 sm:py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 shadow-lg shimmer hover:shadow-sky-500/25 animate-glow-pulse"
        >
          View Projects
        </button>
        <button 
          onClick={() => openTab("contact")} 
          className="px-3 py-2 sm:px-4 sm:py-2 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 text-gray-700 dark:text-white rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 border border-gray-200 dark:border-white/10 shimmer"
        >
          Get in Touch
        </button>
      </div>
    </div>
  </div>
);