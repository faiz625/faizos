import React, { useState, useEffect } from "react";
import { TabType } from "@/hooks/useNavigation";
import ContactForm from "@/components/ContactForm";

interface ContactTabProps {
  openTab: (tab: TabType) => void;
}

interface ContactMethod {
  id: string;
  name: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  borderColor: string;
  description: string;
  action: () => void;
  available: boolean;
  responseTime?: string;
}

export const ContactTab: React.FC<ContactTabProps> = ({ openTab }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("email");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      id: "email",
      name: "Email",
      value: "faizkapadia@example.com",
      icon: <EmailIcon />,
      color: "text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      description: "Best for detailed discussions and project inquiries",
      action: () => window.location.href = "mailto:faizkapadia@example.com",
      available: true,
      responseTime: "Usually responds within 4-6 hours"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      value: "linkedin.com/in/faizkapadia",
      icon: <LinkedInIcon />,
      color: "text-blue-700 dark:text-blue-300",
      gradient: "from-blue-600/20 to-blue-800/20",
      borderColor: "border-blue-600/30",
      description: "Professional networking and career opportunities",
      action: () => window.open("https://www.linkedin.com/in/faizkapadia/", "_blank"),
      available: true,
      responseTime: "Active daily during business hours"
    },
    {
      id: "github",
      name: "GitHub",
      value: "github.com/faiz625",
      icon: <GitHubIcon />,
      color: "text-gray-800 dark:text-gray-200",
      gradient: "from-gray-500/20 to-gray-700/20",
      borderColor: "border-gray-500/30",
      description: "Code collaboration and technical discussions",
      action: () => window.open("https://github.com/faiz625", "_blank"),
      available: true,
      responseTime: "Check activity on repositories"
    },
    {
      id: "calendar",
      name: "Schedule Call",
      value: "calendly.com/faizkapadia",
      icon: <CalendarIcon />,
      color: "text-green-600 dark:text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      description: "Book a time slot for voice/video consultation",
      action: () => window.open("https://calendly.com/faizkapadia264/15min", "_blank"),
      available: true,
      responseTime: "Available slots updated weekly"
    },
    {
      id: "phone",
      name: "Phone",
      value: "Available by appointment",
      icon: <PhoneIcon />,
      color: "text-purple-600 dark:text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      description: "Voice calls for urgent matters or detailed technical discussions",
      action: () => alert("Phone number shared via email or scheduled call"),
      available: false,
      responseTime: "By appointment only"
    }
  ];

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isBusinessHours = () => {
    const hour = currentTime.getHours();
    return hour >= 9 && hour <= 17; // 9 AM to 5 PM
  };

  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 max-w-6xl mx-auto">
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-gray-600 dark:text-white/70 text-lg max-w-3xl mx-auto mb-6 leading-relaxed">
          Ready to collaborate on something amazing? I'm always excited to discuss new projects, share ideas, 
          or simply connect with fellow creators and technologists. Choose your preferred way to reach out!
        </p>

        {/* Live Status */}
        <div className="inline-flex items-center space-x-3 bg-white/10 dark:bg-black/20 rounded-full px-6 py-3 border border-gray-200 dark:border-white/10">
          <div className={`w-3 h-3 rounded-full ${isBusinessHours() ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-gray-600 dark:text-white/80">
            {isBusinessHours() ? "Currently available" : "Outside business hours"}
          </span>
          <span className="text-xs text-gray-500 dark:text-white/60">
            {currentTime.toLocaleString('en-US', { 
              timeZone, 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 hover-lift animate-slide-up">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">24h</div>
          <div className="text-sm text-gray-600 dark:text-white/70">Avg Response Time</div>
        </div>
        <div className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 hover-lift animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-300 mb-2">5+</div>
          <div className="text-sm text-gray-600 dark:text-white/70">Contact Methods</div>
        </div>
        <div className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="text-3xl font-bold text-green-600 dark:text-green-300 mb-2">100%</div>
          <div className="text-sm text-gray-600 dark:text-white/70">Response Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Methods */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">🤝</span>
            How to Reach Me
          </h3>

          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <ContactMethodCard
                key={method.id}
                method={method}
                index={index}
                isSelected={selectedMethod === method.id}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 300);
                }}
                onAction={method.action}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 mt-14">
          {/* Quick Contact Form */}
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20 animate-slide-in-right" style={{animationDelay: '0.4s'}}>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <MessageIcon className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Quick Message
            </h4>
            <ContactForm />
          </div>

          {/* Social Links */}
          <SocialLinksWidget />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

interface ContactMethodCardProps {
  method: ContactMethod;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onAction: () => void;
}

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({ method, index, isSelected, onClick, onAction }) => (
  <div 
    className={`group relative bg-gradient-to-br ${method.gradient} rounded-2xl p-6 border ${method.borderColor} cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-scale overflow-hidden ${
      isSelected ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-xl' : ''
    }`}
    style={{animationDelay: `${index * 0.1}s`}}
    onClick={onClick}
  >
    {/* Background Animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
    
    {/* Status Badge */}
    <div className="absolute top-4 right-4">
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
        method.available ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
      }`}>
        <div className={`w-2 h-2 bg-white rounded-full ${method.available ? 'animate-pulse' : ''}`}></div>
        <span>{method.available ? 'Active' : 'Limited'}</span>
      </div>
    </div>

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-white/20 dark:bg-black/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${method.color}`}>
            {method.icon}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              {method.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-white/70">{method.value}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
        {method.description}
      </p>

      {/* Response Time */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 dark:text-white/60">
          📈 {method.responseTime}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          className="flex items-center space-x-2 bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
        >
          <span>Connect</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const SocialLinksWidget: React.FC = () => {
  const socialLinks = [
    { name: "LinkedIn", icon: <LinkedInIcon />, url: "https://www.linkedin.com/in/faizkapadia/", color: "hover:text-blue-600" },
    { name: "GitHub", icon: <GitHubIcon />, url: "https://github.com/faiz625", color: "hover:text-gray-800 dark:hover:text-gray-200" }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-2xl p-6 border border-pink-500/20 animate-slide-in-right" style={{animationDelay: '0.6s'}}>
      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <span className="text-xl mr-2">🌐</span>
        Social Presence
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 p-3 bg-white/10 dark:bg-black/20 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all hover:scale-105 text-gray-600 dark:text-white/80 ${link.color}`}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's the best way to reach you for project inquiries?",
      answer: "Email is ideal for detailed project discussions. For urgent matters or to schedule a call, use the calendar booking system."
    },
    {
      question: "Do you offer consultations?",
      answer: "Yes! I offer both free initial consultations and paid technical consulting sessions. Book a time slot to discuss your needs."
    },
    {
      question: "What types of projects are you interested in?",
      answer: "I'm passionate about AI/ML systems, data engineering, computer vision projects, and anything that involves solving complex technical challenges."
    },
    {
      question: "Are you available for full-time opportunities?",
      answer: "I'm open to discussing the right opportunities. Reach out via LinkedIn or email to explore potential collaborations."
    }
  ];

  return (
    <div className="mt-16 animate-slide-up">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center">
        <span className="text-2xl mr-3">❓</span>
        Frequently Asked Questions
      </h3>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/10 dark:bg-black/20 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full p-6 text-left hover:bg-white/5 dark:hover:bg-black/5 transition-colors flex items-center justify-between"
            >
              <h4 className="font-semibold text-gray-800 dark:text-white">{faq.question}</h4>
              <div className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-white/60" />
              </div>
            </button>
            {openFAQ === index && (
              <div className="px-6 pb-6 animate-fade-in-scale">
                <p className="text-gray-600 dark:text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Icons
const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);