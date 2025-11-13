"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Particles from "@/components/Particles";
import { ArrowLeft, Home, Search, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <Particles />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            {/* 404 ASCII Art */}
            <div className="font-mono text-sm text-purple-400 mb-4 whitespace-pre-line">
              {`    ┌─┐┬─┐┬─┐┌─┐┬─┐
    ├┤ ├┬┘├┬┘│ │├┬┘
    └─┘┴└─┴└─└─┘┴└─
         404`}
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Page Not Found
            </h1>
            
            <p className="text-gray-400 mb-6">
              The page you're looking for doesn't exist in the FaizOS universe.
              Perhaps it's still being compiled...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
            
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Terminal-style suggestion */}
          <div className="mt-6 p-3 bg-black/30 rounded-md border border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Terminal className="w-3 h-3" />
              <span>faizos@terminal:~$</span>
            </div>
            <code className="text-xs text-green-400">
              cd / && ls -la
            </code>
          </div>

          {/* Helpful links */}
          <div className="mt-4 text-xs text-gray-500">
            <p>Looking for something specific? Try:</p>
            <div className="flex gap-2 justify-center mt-2">
              <span className="px-2 py-1 bg-white/5 rounded text-purple-300">/</span>
              <span className="px-2 py-1 bg-white/5 rounded text-purple-300">/api/yf</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none" />
    </div>
  );
}