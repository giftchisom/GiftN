import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { Globe as GlobeIcon, MapPin, Clock, Compass, RotateCcw, Sparkles } from 'lucide-react';

interface WorldGlobeProps {
  className?: string;
}

export default function WorldGlobe({ className = '' }: WorldGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [activeRegion, setActiveRegion] = useState('West Africa');

  // Coordinates for West Africa (Lomé/Lagos: lat ~6.13, lon ~1.21)
  const HOME_LOCATION: [number, number] = [6.1375, 1.2123];

  // Target rotation angles
  const phiRef = useRef(0.2);
  const thetaRef = useRef(0.15);

  // Live time ticker for GMT / local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener to smoothly rotate globe as user scrolls down the page
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      phiRef.current += delta * 0.002;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize COBE Globe & animation loop
  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globeInstance: any = null;
    let animId: number = 0;

    try {
      const onResize = () => {
        if (canvas) {
          width = canvas.offsetWidth;
        }
      };
      window.addEventListener('resize', onResize);
      onResize();

      globeInstance = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: (width * 2) || 600,
        height: (width * 2) || 600,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 0, // Light mode styling!
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 4.8,
        baseColor: [0.94, 0.95, 0.98], // Crisp light base
        markerColor: [0.38, 0.28, 0.95], // Elegant vibrant indigo marker
        glowColor: [0.9, 0.93, 0.98], // Soft clean halo
        markers: [
          // Lomé / Lagos (Home Base)
          { location: HOME_LOCATION, size: 0.08 },
          // London / Europe
          { location: [51.5074, -0.1278], size: 0.04 },
          // New York / North America
          { location: [40.7128, -74.0060], size: 0.04 },
          // San Francisco
          { location: [37.7749, -122.4194], size: 0.04 },
          // Dubai
          { location: [25.2048, 55.2708], size: 0.04 },
          // Tokyo
          { location: [35.6762, 139.6503], size: 0.04 }
        ]
      });

      // Animation loop using globe.update()
      const render = () => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003;
        }
        if (globeInstance) {
          globeInstance.update({
            phi: phiRef.current + pointerInteractionMovement.current,
            theta: thetaRef.current
          });
        }
        animId = requestAnimationFrame(render);
      };
      animId = requestAnimationFrame(render);

    } catch (err) {
      console.warn('WebGL / COBE init fallback:', err);
      setWebGlSupported(false);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (globeInstance) {
        globeInstance.destroy();
      }
    };
  }, []);

  const jumpToRegion = (region: string, phi: number, theta: number = 0.15) => {
    setActiveRegion(region);
    phiRef.current = phi;
    thetaRef.current = theta;
  };

  return (
    <div
      id="side-world-globe-card"
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.07)] transition-all duration-300 flex flex-col gap-4 overflow-hidden relative ${className}`}
    >
      {/* Decorative top ambient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Flexible with Timezones
            </span>
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 mt-1 flex items-center gap-1.5">
            Based in West Africa
            <span className="text-xs font-normal text-slate-500">/ Global</span>
          </h3>
        </div>

        <button
          onClick={() => jumpToRegion('West Africa', 0.2, 0.15)}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
          title="Reset to Home location"
        >
          <RotateCcw size={12} />
          <span className="text-[10px]">Reset</span>
        </button>
      </div>

      {/* 3D Globe Canvas Container */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
        {webGlSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.005;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.005;
              }
            }}
          />
        ) : (
          /* High quality SVG Globe fallback */
          <div className="w-full h-full rounded-full border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-slate-100 flex flex-col items-center justify-center p-6 text-center">
            <GlobeIcon size={64} className="text-indigo-500 animate-spin" style={{ animationDuration: '24s' }} />
            <span className="font-display font-medium text-xs text-slate-700 mt-3">Interactive World Map</span>
          </div>
        )}

        {/* Floating marker overlay label */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 pointer-events-none">
          <MapPin size={11} className="text-indigo-600 animate-bounce" />
          <span className="text-[11px] font-medium text-slate-700 font-mono">
            Lomé, TG & Lagos, NG
          </span>
        </div>

        {/* Drag Hint */}
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded pointer-events-none">
          Drag to spin
        </div>
      </div>

      {/* Region Fast Jump Pills */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {[
          { label: 'Africa / Home', phi: 0.2, theta: 0.15 },
          { label: 'Americas', phi: 4.8, theta: 0.2 },
          { label: 'Europe', phi: 0.1, theta: 0.4 },
          { label: 'Asia / Pacific', phi: 2.2, theta: 0.2 }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => jumpToRegion(item.label, item.phi, item.theta)}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              activeRegion === item.label
                ? 'bg-indigo-600 text-white border-indigo-600 font-medium shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Live Timezone & Availability Strip */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-indigo-500" />
            Current Time
          </span>
          <span className="font-mono text-slate-800 font-semibold text-xs tracking-tight">
            {currentTime || 'Syncing clock...'}
          </span>
        </div>

        <div className="h-[1px] w-full bg-slate-200/70" />

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Compass size={13} className="text-violet-500" />
            Remote Reach
          </span>
          <span className="text-indigo-600 font-medium text-xs">
            Global (All Timezones)
          </span>
        </div>
      </div>

      {/* Status Card Footer */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          <span className="text-slate-600 text-[11px] font-sans">
            Open to full-time & contract
          </span>
        </div>
        <a
          href="#contact"
          className="text-[11px] font-mono font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
        >
          <Sparkles size={11} />
          Say Hello
        </a>
      </div>
    </div>
  );
}
