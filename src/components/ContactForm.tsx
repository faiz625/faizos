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
      <input className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded p-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <input className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded p-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <textarea className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded p-2 text-sm h-28 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50" placeholder="Message" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick={submit} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/15 text-sm text-gray-800 dark:text-white">Send</button>
      <p className="text-xs text-gray-600 dark:text-white/60">This opens your email client with a pre-filled message.</p>
    </div>
  );
}
