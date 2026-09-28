import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  Minimize2, 
  Maximize2,
  ListMusic,
  Disc,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverColor: string;
  genre: string;
}

const TRACKS: Track[] = [
  {
    id: 'congratulations-pm',
    title: 'Congratulations',
    artist: 'Post Malone (feat. Quavo)',
    url: 'https://archive.org/download/12Congratulationsfeat.Quavo/12%20Congratulations%20%28feat.%20Quavo%29.mp3',
    coverColor: 'bg-amber-500',
    genre: 'Hip Hop / Pop'
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('portfolio-music-volume');
    return saved ? parseFloat(saved) : 0.6;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTracklist, setShowTracklist] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeTrack = TRACKS[currentTrackIndex];

  // Initialize and handle audio
  useEffect(() => {
    const audio = new Audio(activeTrack.url);
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    setHasError(false);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = () => {
      console.warn(`Failed to load track: ${activeTrack.title}`);
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [currentTrackIndex]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback blocked by browser autoplay policy.', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
    localStorage.setItem('portfolio-music-volume', volume.toString());
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    setHasError(false);
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setHasError(false);
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
      setCurrentTime(0);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowTracklist(false);
    setIsPlaying(true);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickPositionRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickPositionRatio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* EXPANDED PLAYER */
          <motion.div
            id="music-player-expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-80 sm:w-88 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-emerald-400 opacity-75' : 'bg-slate-400 opacity-0'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Ambient Audio
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Minimize Player"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* PLAYER MAIN VIEW */}
            <div className="flex flex-col gap-4">
              {/* Track Details */}
              <div className="flex items-center gap-4">
                {/* Rotating Disc */}
                <div className="relative flex-shrink-0">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${activeTrack.coverColor} flex items-center justify-center shadow-md relative overflow-hidden`}>
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none"
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                    {activeTrack.genre}
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-900 mt-1 truncate leading-tight">
                    {activeTrack.title}
                  </h3>
                  <p className="text-slate-500 text-xs truncate">
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1">
                <div 
                  ref={progressRef}
                  onClick={handleProgressBarClick}
                  className="w-full h-1.5 bg-slate-100 rounded-full cursor-pointer relative group"
                >
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-100 relative"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-900 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {hasError && (
                <div className="text-[10px] text-rose-600 font-mono bg-rose-50 border border-rose-200 px-2 py-1 rounded-md text-center">
                  Audio streaming error. Please retry!
                </div>
              )}
            </div>

            {/* Play Controls & Volume Row */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Previous / Restart"
                >
                  <SkipBack size={16} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 active:scale-95 shadow-sm transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Next Track"
                >
                  <SkipForward size={16} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="text-slate-500 hover:text-slate-800 p-1 rounded transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-slate-200 accent-indigo-600 rounded-lg cursor-pointer"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* MINIMIZED COMPACT BUBBLE */
          <motion.button
            id="music-player-minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200/90 flex items-center justify-center shadow-lg transition-all cursor-pointer relative group"
            title="Open Ambient Music Player"
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-40 pointer-events-none" />
            )}
            <Disc 
              size={20} 
              className={`${isPlaying ? 'animate-spin' : ''} text-indigo-600 transition-transform duration-300`} 
            />
            <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-mono py-1 px-2.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-md transition-opacity duration-200">
              {isPlaying ? `Playing: ${activeTrack.title}` : 'Ambient Music'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
