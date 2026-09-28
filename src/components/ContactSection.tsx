import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight,
  Heart
} from 'lucide-react';

interface VisitorNote {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "giftchisomwork@gmail.com";

  // Visitor Wall Notes (loaded from localStorage or defaults)
  const [notes, setNotes] = useState<VisitorNote[]>(() => {
    try {
      const saved = localStorage.getItem('visitor_notes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        name: 'Sarah K.',
        message: 'Loved SantéFlow! Incredible vision for AI in personalized health.',
        date: 'Recent'
      },
      {
        id: '2',
        name: 'Alex D.',
        message: 'Impressive track record graduating 1st Class at 19. Great portfolio!',
        date: 'Recent'
      }
    ];
  });

  const [author, setAuthor] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !noteContent.trim()) return;

    const newNote: VisitorNote = {
      id: Date.now().toString(),
      name: author.trim(),
      message: noteContent.trim(),
      date: 'Just now'
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem('visitor_notes', JSON.stringify(updated));
    } catch {}

    setAuthor('');
    setNoteContent('');
    setNoteSubmitted(true);
    setTimeout(() => setNoteSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading (inspired by awrs.me) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-semibold">
              05. Connect & Collaborate
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Let's Build Something Real
          </h2>
          <div className="h-1 w-12 bg-indigo-600 rounded-full" />
        </div>

        {/* Contact Banner & Quick Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Contact Card */}
          <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xs">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-indigo-600 uppercase tracking-wider font-semibold">
                Available Globally
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                From idea to impact — open to full-time roles & engineering collaborations.
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you have an upcoming full-stack platform, an AI integration need, or simply want to say hello, feel free to reach out. I respond within 24 hours.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
              <div className="flex items-center gap-2.5 px-3 py-1 flex-1 min-w-0">
                <Mail size={16} className="text-indigo-600 flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-slate-800 truncate font-semibold">
                  {email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}?subject=Hello%20Gift%20-%20Project%20Opportunity`}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-display font-semibold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
                >
                  <span>Send Mail</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/80">
              <a
                href="https://github.com/giftchisom"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-display text-xs font-medium flex items-center gap-2 transition-all shadow-2xs"
              >
                <Github size={15} />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://www.linkedin.com/in/gift-nneji-chisom"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-display text-xs font-medium flex items-center gap-2 transition-all shadow-2xs"
              >
                <Linkedin size={15} className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Visitor Wall Note Pinning Card (inspired by awrs.me's "The Wall") */}
          <div className="lg:col-span-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between gap-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-indigo-600" />
                <h4 className="font-display font-bold text-sm text-slate-900">
                  Visitor Wall
                </h4>
              </div>
              <span className="font-mono text-[11px] text-slate-500">Leave your mark</span>
            </div>

            {/* Recent Notes Preview */}
            <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
              {notes.map((n) => (
                <div key={n.id} className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-display">{n.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-slate-600">{n.message}</p>
                </div>
              ))}
            </div>

            {/* Fast Pin Form */}
            <form onSubmit={handleAddNote} className="flex flex-col gap-2 pt-2 border-t border-slate-200/80">
              <input
                type="text"
                placeholder="Your name or handle"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={40}
                required
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Drop a quick friendly greeting..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  maxLength={120}
                  required
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Send size={12} />
                  <span>Pin</span>
                </button>
              </div>
              {noteSubmitted && (
                <span className="font-mono text-[10px] text-emerald-600 font-semibold">
                  Pinned to the wall! Thanks for visiting.
                </span>
              )}
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
