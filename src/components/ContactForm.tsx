"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !msg.trim()) return alert("Please fill all fields.");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:faizkapadia264@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-3">
      <input className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <textarea className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm h-28" placeholder="Message" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick={submit} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-sm">Send</button>
      <p className="text-xs text-white/60">This opens your email client with a pre-filled message.</p>
    </div>
  );
}
