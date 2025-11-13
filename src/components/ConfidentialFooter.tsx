"use client";

export default function ConfidentialFooter() {
  return (
    <footer className="w-full text-center text-xs text-white/60 mt-6 p-4">
      <div>
        <strong>Confidentiality note:</strong>{" "}
        Some project descriptions are generalized to protect employer and client confidentiality. No internal data, screenshots, or non-public metrics are shared.
      </div>
      <div className="mt-1">
        For deeper discussion, details can be provided under a mutual NDA.
      </div>
    </footer>
  );
}
