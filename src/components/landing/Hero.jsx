import React, { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));
import BorderGlow from '../ui/BorderGlow';

export const Hero = ({ onEnter }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-black border-b border-white/5">
      {/* Subtle Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-screen"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
      </video>

      {/* Grid Layout for Split Hero */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 items-center min-h-[85vh] pt-24">
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-start text-left w-full relative z-20">
          {/* Tagline Pill */}
          <BorderGlow borderRadius={4} glowRadius={15} glowIntensity={0.8} className="mb-8 w-max">
            <div className="bg-[#110D1A]/80 backdrop-blur-md border border-[#7b39fc]/30 rounded-[4px] h-[32px] flex items-center px-1.5 pr-4 gap-2">
              <span className="bg-[#7b39fc] text-white font-[Manrope] font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-[2px]">
                Active
              </span>
              <span className="text-[--text-muted] font-[Inter] text-[12px]">
                Deterministic Operations Engine v3.2
              </span>
            </div>
          </BorderGlow>

          {/* Headline */}
          <h1 className="text-white font-[Instrument_Serif] text-6xl md:text-[85px] leading-[1.05] tracking-tight mb-8">
            Absolute Control. <br/><i className="italic text-[#7b39fc]">Zero Latency.</i>
          </h1>

          {/* Subtext */}
          <p className="text-[--text-muted] font-[Inter] text-[18px] max-w-[500px] mb-12 leading-relaxed">
            Stop bleeding cognitive bandwidth. The only operations engine designed to execute at massive scale without a single loading state.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <BorderGlow borderRadius={4} glowRadius={30} glowIntensity={1.5}>
              <button 
                onClick={onEnter}
                className="group relative bg-[#7b39fc] text-white font-[Manrope] font-bold text-[11px] uppercase tracking-[0.2em] px-10 py-4 rounded-[4px] overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">Initialize Engine <span className="opacity-50">→</span></span>
              </button>
            </BorderGlow>
            
            <BorderGlow borderRadius={4} glowRadius={30} glowIntensity={1.5}>
              <button 
                onClick={onEnter}
                className="group relative bg-transparent border border-white/20 text-[--text-muted] font-[Manrope] font-bold text-[11px] uppercase tracking-[0.2em] px-10 py-4 rounded-[4px] transition-all hover:bg-white/5 hover:text-white hover:border-white/40 active:scale-95 h-full"
              >
                <span className="relative z-10 flex items-center gap-2">Access Terminal</span>
              </button>
            </BorderGlow>
          </div>
        </div>

        {/* Right Side: Spline 3D Scene */}
        <div className="relative h-[500px] lg:h-[800px] w-full pointer-events-auto cursor-grab active:cursor-grabbing">
          {/* Loading UX */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-[--text-muted]">
               <div className="w-10 h-10 border-2 border-[#7b39fc] border-t-transparent rounded-full animate-spin mb-4" />
               <span className="font-[Manrope] font-bold text-[10px] uppercase tracking-widest">Initializing WebGL...</span>
            </div>
          )}
          <Suspense fallback={null}>
            <Spline 
              scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease-in-out', width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
