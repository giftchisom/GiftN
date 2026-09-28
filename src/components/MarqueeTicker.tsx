import React from 'react';

export default function MarqueeTicker() {
  const line1Items = [
    "Full-Stack Developer",
    "AI & ML Integration",
    "Product Builder",
    "Cross-Platform Architecture",
    "Performance Optimizer",
    "Real-Time WebSockets",
    "Creative Technologist",
    "Fast Execution"
  ];

  const line2Items = [
    "Problem Solver",
    "Human-Centered Software",
    "UI/UX Enthusiast",
    "SaaS Architect",
    "1st Class CS Graduate",
    "Google Gemini API",
    "Supabase & PostgreSQL",
    "Founder Mindset"
  ];

  return (
    <div className="w-full overflow-hidden border-y border-slate-200/80 bg-slate-50/70 py-3 flex flex-col gap-2 select-none">
      {/* Ticker Row 1 (Right to Left) */}
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...line1Items, ...line1Items, ...line1Items].map((item, idx) => (
          <div key={`l1-${idx}`} className="flex items-center gap-3 mx-4 text-xs font-mono font-medium text-slate-600">
            <span>{item}</span>
            <span className="text-indigo-400 font-bold">◆</span>
          </div>
        ))}
      </div>

      {/* Ticker Row 2 (Left to Right / Offset) */}
      <div className="flex w-max animate-marquee-reverse whitespace-nowrap">
        {[...line2Items, ...line2Items, ...line2Items].map((item, idx) => (
          <div key={`l2-${idx}`} className="flex items-center gap-3 mx-4 text-xs font-mono font-medium text-slate-500">
            <span>{item}</span>
            <span className="text-violet-400 font-bold">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
