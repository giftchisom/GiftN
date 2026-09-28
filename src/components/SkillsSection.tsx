import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Layout, 
  Settings, 
  Workflow, 
  Sparkles, 
  GitBranch,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { TECHNICAL_SKILLS, PRODUCT_SKILLS } from '../data';

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Languages')) return <Terminal size={15} className="text-indigo-600" />;
    if (category.includes('Backend')) return <Cpu size={15} className="text-violet-600" />;
    if (category.includes('Data') || category.includes('AI')) return <Database size={15} className="text-sky-600" />;
    if (category.includes('Frontend')) return <Layout size={15} className="text-emerald-600" />;
    return <Settings size={15} className="text-amber-600" />;
  };

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] border-t border-slate-200/80"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-semibold">
              04. Technical Capabilities
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Skills & Competencies
          </h2>
          <div className="h-1 w-12 bg-indigo-600 rounded-full" />
        </div>

        {/* Technical Skills Bento Grid */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-indigo-600" />
            <h3 className="font-display font-bold text-lg text-slate-900">
              Technical Stack
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNICAL_SKILLS.map((cat) => (
              <div
                key={cat.category}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all duration-200 flex flex-col gap-3 group"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">
                    {cat.category}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 px-2.5 py-1 rounded-md border border-slate-200/80 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product & Engineering Leadership */}
        <div className="flex flex-col gap-6 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Workflow size={18} className="text-indigo-600" />
            <h3 className="font-display font-bold text-lg text-slate-900">
              Product & Leadership Disciplines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Product Strategy",
                desc: "Prioritizing MVPs from concept to validated launch with actionable roadmaps."
              },
              {
                title: "User Empathy & UX",
                desc: "Translating qualitative user needs into intuitive, zero-friction software flows."
              },
              {
                title: "Data-Driven Choices",
                desc: "Utilizing analytics, error monitoring, and behavior metrics to optimize conversion."
              },
              {
                title: "Technical Ownership",
                desc: "Full-lifecycle architecture from schema design to CI/CD container deployments."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col gap-2 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                  <span className="font-mono text-xs font-bold text-indigo-600">0{idx + 1}.</span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
