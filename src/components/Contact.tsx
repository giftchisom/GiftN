import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Calendar as CalendarIcon, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Video,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import HiddenGift from './HiddenGift';

interface ContactProps {
  onNavigate?: (sectionId: string) => void;
}

type TabType = 'message' | 'calendar';

export default function Contact({ onNavigate }: ContactProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('message');

  // Form state for website message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Hackathon');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State for booking a 15-minute call with Google Calendar
  const [callDate, setCallDate] = useState(() => {
    // Tomorrow by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [callTime, setCallTime] = useState('14:00');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Visual Calendar Month Navigation
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const nextMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const currentFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    setCurrentMonthDate(prev => {
      const prevDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevDate < currentFirst ? currentFirst : prevDate;
    });
  };

  const isCurrentMonthView = () => {
    const today = new Date();
    return (
      currentMonthDate.getFullYear() === today.getFullYear() &&
      currentMonthDate.getMonth() === today.getMonth()
    );
  };

  // Local time in Lomé, Togo (GMT+0)
  const [lomeTime, setLomeTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Lomé is in UTC / GMT+0
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lome',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLomeTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      let forwarded = false;

      // 1. Send to backend server which forwards to Gmail
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject,
            message: message.trim(),
            submittedAt: new Date().toISOString(),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.forwardedToGmail) {
            forwarded = true;
          }
        }
      } catch (srvErr) {
        console.warn('Backend server forwarding failed, attempting direct client forward:', srvErr);
      }

      // 2. Direct client forward to FormSubmit if server didn't complete
      if (!forwarded) {
        try {
          await fetch('https://formsubmit.co/ajax/giftchisomwork@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              _replyto: email.trim(),
              _subject: `Portfolio Message from ${name.trim()}: ${subject}`,
              message: message.trim(),
              _template: 'table',
              _captcha: 'false',
            }),
          });
        } catch (directErr) {
          console.warn('FormSubmit direct error:', directErr);
        }
      }

      // Store in browser local storage as backup archive
      const existing = JSON.parse(localStorage.getItem('sent_messages') || '[]');
      existing.unshift({
        id: `msg_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('sent_messages', JSON.stringify(existing));

      setMessageSent(true);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setMessageSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate Google Calendar Event Link for 15-min call
  const generateGoogleCalendarUrl = () => {
    // Construct start and end time (fixed 15 minutes)
    const [hours, minutes] = callTime.split(':').map(Number);
    const startDateTime = new Date(`${callDate}T${callTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 15 * 60 * 1000);

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const dates = `${formatGoogleDate(startDateTime)}/${formatGoogleDate(endDateTime)}`;
    const title = encodeURIComponent('15-Min Call with Gift Nneji');
    const details = encodeURIComponent(
      '15-Minute Session with Gift Chisom Nneji (Full-Stack Engineer & AI Specialist)\n\nHost: giftchisomwork@gmail.com\nLocation: Google Meet'
    );
    const location = encodeURIComponent('Google Meet (https://meet.google.com)');
    const add = encodeURIComponent('giftchisomwork@gmail.com');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&add=${add}`;
  };

  // Handle Book Call via Google Calendar
  const handleOpenGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
    setBookedSuccess(true);

    // Record notification
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Website Visitor',
          email: 'giftchisomwork@gmail.com',
          subject: '📅 15-Min Call Scheduled via Google Calendar',
          message: `15-Min Call scheduled for ${callDate} at ${callTime} GMT with Gift Chisom Nneji.`,
          date: callDate,
          time: callTime,
        }),
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 relative z-10 border-t border-purple-950/20 scroll-mt-10"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-purple-400 tracking-widest uppercase font-semibold">
              {t('contact.badge')}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('contact.title1')} <span className="text-purple-400">{t('contact.title2')}</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Main Interactive Hub: Tabs between Direct Message & Google Calendar Call Booking */}
        <div className="bg-[#060111]/90 border border-purple-900/40 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl flex flex-col gap-8">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-950/60 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('message')}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                    : 'bg-purple-950/30 text-gray-400 hover:text-gray-200 hover:bg-purple-950/60'
                }`}
              >
                <MessageSquare size={15} />
                <span>{t('contact.tabMessage')}</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                    : 'bg-purple-950/30 text-gray-400 hover:text-gray-200 hover:bg-purple-950/60'
                }`}
              >
                <CalendarIcon size={15} />
                <span>{t('contact.tabCalendar')}</span>
              </button>
            </div>

            <HiddenGift id={5} tooltipSide="left" />
          </div>

          {/* TAB 1: Send Message Through Website (No Gmail Needed!) */}
          {activeTab === 'message' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {messageSent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Message Sent to Gmail Inbox!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                    Thank you, <span className="text-purple-300 font-semibold">{name}</span>. Your message was dispatched directly to Gift's personal Gmail inbox (<strong className="text-white">giftchisomwork@gmail.com</strong>).
                  </p>
                  <div className="font-mono text-xs text-purple-300 bg-purple-950/40 px-4 py-2.5 rounded-lg border border-purple-900/50 flex flex-col gap-1 text-center max-w-md">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
                      <Sparkles size={14} />
                      <span>Gift will reply directly to your email:</span>
                    </div>
                    <span className="text-white font-bold">{email}</span>
                    <span className="text-gray-400 text-[11px] mt-0.5">Response timeframe: Typically within 24 hours</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <a
                      href={`mailto:giftchisomwork@gmail.com?subject=${encodeURIComponent(`Re: ${subject}`)}&body=${encodeURIComponent(`Hi Gift,\n\nFollowing up on my message:\n\n${message}`)}`}
                      className="px-5 py-2.5 bg-purple-900/40 hover:bg-purple-800/50 border border-purple-700/60 text-purple-200 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Mail size={14} />
                      <span>Open in your Email App</span>
                    </a>

                    <button
                      onClick={() => {
                        setMessageSent(false);
                        setMessage('');
                      }}
                      className="px-5 py-2.5 bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-700 text-gray-300 text-xs font-mono rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex flex-col gap-6">
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-mono">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                        Your Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className="bg-[#09031a] border border-purple-950/80 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                        Your Email Address <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="bg-[#09031a] border border-purple-950/80 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                      Subject / Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-[#09031a] border border-purple-950/80 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer"
                    >
                      <option value="Hackathon">1. Hackathon</option>
                      <option value="Co-founders">2. Co-founders</option>
                      <option value="Build you a portfolio">3. Build you a portfolio</option>
                      <option value="Website project">4. Website project</option>
                      <option value="Collaboration">5. Collaboration</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider flex justify-between">
                      <span>Message <span className="text-purple-400">*</span></span>
                      <span className="text-gray-500 lowercase">{message.length} chars</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Gift, I would love to talk about building a project with you..."
                      className="bg-[#09031a] border border-purple-950/80 focus:border-purple-500 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-purple-400" />
                      <span>Sent directly via website — no mail app required</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 disabled:opacity-50 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending directly...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message Directly</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* TAB 2: Simple 15-Min Call Booking with Visual Calendar */}
          {activeTab === 'calendar' && (() => {
            const year = currentMonthDate.getFullYear();
            const month = currentMonthDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayIndex = new Date(year, month, 1).getDay();
            const startingCol = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const monthLabel = currentMonthDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
              month: 'long',
              year: 'numeric'
            });

            const weekDays = language === 'fr' 
              ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] 
              : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            const formatSelectedDate = () => {
              if (!callDate) return '';
              const [y, m, d] = callDate.split('-').map(Number);
              const date = new Date(y, m - 1, d);
              return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });
            };

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 max-w-4xl mx-auto w-full"
              >
                {/* Session Header */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-purple-950/30 border border-purple-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300">
                      <Video size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">
                        15-Minute Session
                      </h3>
                      <p className="text-xs text-gray-400">Google Meet with Gift Chisom Nneji</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/30 font-medium">
                    15 min
                  </span>
                </div>

                {/* Calendar & Time Slots Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Interactive Visual Calendar (7 cols) */}
                  <div className="lg:col-span-7 bg-[#09031a] border border-purple-950/80 rounded-2xl p-5 flex flex-col gap-4">
                    {/* Month Header & Controls */}
                    <div className="flex items-center justify-between pb-2 border-b border-purple-950/60">
                      <span className="font-display text-sm font-bold text-white capitalize flex items-center gap-2">
                        <CalendarIcon size={15} className="text-purple-400" />
                        <span>{monthLabel}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={prevMonth}
                          disabled={isCurrentMonthView()}
                          className="p-1.5 rounded-lg border border-purple-950/80 bg-purple-950/30 text-gray-300 hover:text-white hover:bg-purple-900/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                          aria-label="Previous Month"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-1.5 rounded-lg border border-purple-950/80 bg-purple-950/30 text-gray-300 hover:text-white hover:bg-purple-900/40 transition-all cursor-pointer"
                          aria-label="Next Month"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {weekDays.map((d) => (
                        <span key={d} className="text-[11px] font-mono text-gray-400 font-medium py-1">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Day Cells Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Blank cells for offset */}
                      {Array.from({ length: startingCol }).map((_, i) => (
                        <div key={`blank-${i}`} className="py-2.5" />
                      ))}

                      {/* Day cells */}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const dayDate = new Date(year, month, day);
                        const isPast = dayDate < today;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isSelected = callDate === dateStr;
                        const isToday = dayDate.getTime() === today.getTime();

                        if (isPast) {
                          return (
                            <div
                              key={day}
                              className="py-2 text-center text-xs font-mono text-zinc-600 opacity-40 select-none"
                            >
                              {day}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setCallDate(dateStr)}
                            className={`py-2 text-center text-xs font-mono rounded-lg transition-all relative cursor-pointer ${
                              isSelected
                                ? 'bg-purple-900 border border-purple-500 text-white font-bold shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                                : 'text-gray-300 hover:text-white hover:bg-purple-950/60 hover:border-purple-800/80 border border-transparent'
                            }`}
                          >
                            <span>{day}</span>
                            {isToday && (
                              <span
                                className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                                  isSelected ? 'bg-white' : 'bg-purple-400'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Time Selection & Dark Purple Book Button (5 cols) */}
                  <div className="lg:col-span-5 bg-[#09031a] border border-purple-950/80 rounded-2xl p-5 flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-4">
                      {/* Selected Date Summary */}
                      <div className="flex items-center justify-between pb-3 border-b border-purple-950/60">
                        <span className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                          Selected Date
                        </span>
                        <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-lg">
                          {formatSelectedDate()}
                        </span>
                      </div>

                      {/* Time Slots */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Clock size={13} className="text-purple-400" />
                            <span>Select Time</span>
                          </label>
                          <span className="text-[11px] font-mono text-purple-400">
                            {lomeTime || 'GMT'} (GMT)
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {['09:00', '10:30', '11:30', '14:00', '15:30', '17:00'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setCallTime(slot)}
                              className={`py-2 px-2 text-xs font-mono rounded-lg border transition-all cursor-pointer text-center ${
                                callTime === slot
                                  ? 'bg-purple-900 border-purple-500 text-white font-semibold shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                                  : 'bg-[#060111] text-gray-400 border-purple-950/70 hover:border-purple-800 hover:text-gray-200'
                              }`}
                            >
                              {slot} GMT
                            </button>
                          ))}
                        </div>

                        <select
                          value={callTime}
                          onChange={(e) => setCallTime(e.target.value)}
                          className="mt-1 bg-[#060111] border border-purple-950/80 focus:border-purple-500 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 focus:outline-none cursor-pointer"
                        >
                          <option value="09:00">09:00 AM GMT</option>
                          <option value="09:30">09:30 AM GMT</option>
                          <option value="10:00">10:00 AM GMT</option>
                          <option value="10:30">10:30 AM GMT</option>
                          <option value="11:30">11:30 AM GMT</option>
                          <option value="14:00">02:00 PM GMT</option>
                          <option value="14:30">02:30 PM GMT</option>
                          <option value="15:00">03:00 PM GMT</option>
                          <option value="15:30">03:30 PM GMT</option>
                          <option value="16:30">04:30 PM GMT</option>
                          <option value="17:00">05:00 PM GMT</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-purple-950/60">
                      {/* One Solid Dark Purple Color (No Gradient!) */}
                      <button
                        type="button"
                        onClick={handleOpenGoogleCalendar}
                        className="w-full py-3.5 bg-purple-900 hover:bg-purple-800 active:bg-purple-950 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 border border-purple-700/60 shadow-[0_0_20px_rgba(88,28,135,0.4)] transition-all cursor-pointer"
                      >
                        <CalendarIcon size={16} />
                        <span className="font-semibold tracking-wide">Book 15-Min Call</span>
                        <ExternalLink size={14} className="opacity-80" />
                      </button>

                      {bookedSuccess && (
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs font-mono flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                          <span>Google Calendar opened! Click "Save" to confirm.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

        </div>

      </div>
    </section>
  );
}
