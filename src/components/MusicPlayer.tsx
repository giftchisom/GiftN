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
    coverColor: 'from-amber-600 to-yellow-500',
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

    // Load state
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

    // If it was already playing, attempt to resume playing on track change
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
        console.warn('Playback blocked by browser autoplay policy. User interaction required first.', err);
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
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setCurrentTime(0);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current || duration === 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    const newTime = clickPercent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const selectTrack = (index: number) => {
    setHasError(false);
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setShowTracklist(false);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isExpanded ? (
          /* EXPANDED PLAYER */
          <motion.div
            id="music-player-expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-80 bg-[#070412]/90 backdrop-blur-xl border border-purple-950/40 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br ${activeTrack.coverColor} opacity-10 rounded-full blur-2xl pointer-events-none`} />

            {/* Header */}
            <div className="flex justify-between items-center border-b border-purple-950/20 pb-3 z-10">
              <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs font-semibold tracking-wider uppercase">
                <Radio size={14} className={isPlaying ? 'animate-pulse text-purple-400' : ''} />
                <span>Ambient Player</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowTracklist(!showTracklist)}
                  className={`p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-950/20 transition-colors cursor-pointer ${
                    showTracklist ? 'text-purple-400 bg-purple-950/10' : ''
                  }`}
                  title="Track List"
                >
                  <ListMusic size={16} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-950/20 transition-colors cursor-pointer"
                  title="Minimize Player"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {showTracklist ? (
              /* TRACKLIST VIEW */
              <div className="min-h-[174px] flex flex-col gap-2 py-1 z-10">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Select Track</span>
                <div className="flex-1 overflow-y-auto max-h-[150px] flex flex-col gap-1.5 pr-1">
                  {TRACKS.map((track, idx) => (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(idx)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 cursor-pointer group ${
                        currentTrackIndex === idx
                          ? 'bg-purple-950/20 border-purple-500/40 text-purple-300'
                          : 'bg-[#04010b]/10 border-transparent hover:border-purple-950/40 text-gray-400 hover:text-gray-200 hover:bg-purple-950/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${track.coverColor} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                        {currentTrackIndex === idx && isPlaying ? (
                          <Disc size={16} className="animate-spin text-purple-200" />
                        ) : (
                          <Music size={14} className="text-purple-200" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-xs truncate leading-tight">{track.title}</div>
                        <div className="text-[10px] text-gray-500 truncate mt-0.5">{track.artist}</div>
                      </div>
                      <span className="font-mono text-[9px] text-purple-400/60 font-medium px-1.5 py-0.5 bg-purple-950/10 border border-purple-900/20 rounded">
                        {track.genre}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* PLAYER MAIN VIEW */
              <div className="flex flex-col gap-4 z-10">
              {/* Track Details & Visual Representation */}
              <div className="flex items-center gap-4">
                {/* Rotating Vinyl */}
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${activeTrack.coverColor} flex items-center justify-center shadow-lg relative overflow-hidden group`}>
                    {/* Groove Rings */}
                    <div className="absolute inset-1 rounded-full border border-black/10" />
                    <div className="absolute inset-2 rounded-full border border-black/5" />
                    <div className="absolute inset-3 rounded-full border border-black/5" />
                    {/* Vinyl Label Center */}
                    <div className="w-5 h-5 rounded-full bg-[#04010b] flex items-center justify-center border border-purple-950/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>
                    
                    {/* Interactive Visual Spin */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/5 pointer-events-none"
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    />
                  </div>
                  {/* Visualizer Wave when Playing */}
                  {isPlaying && (
                    <div className="absolute -bottom-1 -right-1 flex gap-0.5 bg-black/60 border border-purple-950/40 p-1 rounded-md h-5 items-end justify-center">
                      <span className="w-[2px] h-2.5 bg-purple-400 rounded-full animate-[bounce_0.8s_infinite]" />
                      <span className="w-[2px] h-4 bg-purple-400 rounded-full animate-[bounce_0.5s_infinite_delay-150]" />
                      <span className="w-[2px] h-3 bg-purple-400 rounded-full animate-[bounce_0.6s_infinite_delay-300]" />
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-semibold bg-purple-950/30 border border-purple-900/30 px-1.5 py-0.5 rounded">
                    {activeTrack.genre}
                  </span>
                  <h3 className="font-display font-bold text-sm text-white mt-1.5 truncate leading-none">
                    {activeTrack.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1">
                <div 
                  ref={progressRef}
                  onClick={handleProgressBarClick}
                  className="w-full h-1 bg-purple-950/40 rounded-full cursor-pointer relative group"
                >
                  <div 
                    className={`h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-100 relative`}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    {/* Playhead thumb on hover */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Error Banner */}
              {hasError && (
                <div className="text-[10px] text-red-400 font-mono bg-red-950/20 border border-red-900/20 px-2 py-1 rounded-md text-center leading-normal">
                  Error loading audio stream. Please try again later!
                </div>
              )}
            </div>
            )}

            {/* Play Controls & Volume Row */}
              <div className="flex items-center justify-between border-t border-purple-950/10 pt-3">
                {/* Left / Back Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-950/20 transition-colors cursor-pointer"
                    title="Restart Track"
                  >
                    <SkipBack size={16} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 active:scale-95 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-950/20 transition-colors cursor-pointer"
                    title="Restart Track"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
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
                    className="w-16 h-1 bg-purple-950/60 accent-purple-500 rounded-lg cursor-pointer appearance-none border-none outline-none"
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
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all cursor-pointer relative group"
            title="Open Ambient Music Player"
          >
            {/* Pulsing Outer Rings */}
            <span className={`absolute inset-0 rounded-full border border-purple-500/40 pointer-events-none scale-100 ${
              isPlaying ? 'animate-ping opacity-30' : 'opacity-0'
            }`} />

            {/* Rotating Disc Cover Icon */}
            <Disc 
              size={20} 
              className={`${isPlaying ? 'animate-spin' : ''} text-purple-100 transition-transform duration-300`} 
            />

            {/* Hover Tooltip */}
            <span className="absolute right-14 bg-[#070412]/95 border border-purple-950/40 text-gray-200 text-[10px] font-mono py-1 px-2.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg transition-opacity duration-200">
              {isPlaying ? `Playing: ${activeTrack.title}` : 'Ambient Music Player'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
