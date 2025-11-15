import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArchModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const ArchModal: React.FC<ArchModalProps> = ({ open, title, onClose, children }) => {
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
};

type ArchModalContentProps = {
  content: string;
};

export const ArchModalContent: React.FC<ArchModalContentProps> = ({ content }) => (
  <div className="prose prose-invert text-base leading-relaxed min-w-0">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);