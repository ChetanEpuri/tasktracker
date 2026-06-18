import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { GlassCard } from '../ui/GlassCard';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Activity, Users, Lock, CloudOff, Globe, Hexagon } from 'lucide-react';

import { Footer } from '../components/landing/Footer';
import BorderGlow from '../components/ui/BorderGlow';
import FaultyTerminal from '../components/ui/FaultyTerminal';

const TaskCard = ({ title, status, time, delay }: any) => (
  <motion.div
    drag
    dragConstraints={{ left: 0, right: 0, top: -50, bottom: 50 }}
    dragElastic={0.2}
    whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 50, boxShadow: "0 20px 40px rgba(123,57,252,0.3)" }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-[#1a1528]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-[#7b39fc]/50 transition-colors will-change-transform transform-gpu cursor-grab"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#7b39fc]/0 via-[#7b39fc]/5 to-[#7b39fc]/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-[#10b981] shadow-[0_0_10px_#10b981]' : 'bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]'}`} />
        <span className="text-white font-[Inter] font-medium text-sm select-none">{title}</span>
      </div>
      <span className="text-[--text-muted] text-xs font-[Manrope] select-none">{time}</span>
    </div>
    <div className="w-full bg-black/50 rounded-full h-1.5 mb-2 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: status === 'Active' ? '70%' : '30%' }}
        transition={{ duration: 1, delay: delay + 0.2 }}
        className="h-full bg-gradient-to-r from-[#2b2344] to-[#7b39fc]"
      />
    </div>
  </motion.div>
);

const FeatureShowcase = ({ onEnter }: any) => {
  return (
    <section id="features" className="py-32 px-8 bg-gradient-to-b from-[#000000] to-[#0a0812] relative z-20 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0">
      </div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[--accent-red] rounded-full blur-[200px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7b39fc]/10 border border-[#7b39fc]/30 text-[#7b39fc] font-[Manrope] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 animate-pulse">
              <Sparkles size={12} /> Interactive Kanban Demo
            </span>
            <h2 className="text-5xl md:text-7xl font-[Instrument_Serif] text-white leading-[1.1] tracking-tight">
              ORCHESTRATE EVERY <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#b084f6] to-[#7b39fc]">DETAIL.</span>
            </h2>
          </div>
          <p className="max-w-md font-[Inter] text-[--text-muted] text-lg leading-relaxed">
            Drag and drop the tasks below to feel the fluid, zero-latency rendering pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 h-[600px] relative">
            <GlassCard className="h-full p-8 overflow-hidden relative group border-white/10" hoverEffect={true}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#7b39fc] rounded-full blur-[120px] opacity-10 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-[Instrument_Serif] text-white flex items-center gap-3">
                    <Activity className="text-[#7b39fc]" /> Live Operations
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]"></span>
                    </span>
                    <span className="text-[10px] font-[Manrope] uppercase tracking-widest text-[#10b981]">Syncing</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-center relative">
                  {/* Subtle hint text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700">
                     <span className="font-[Instrument_Serif] text-8xl text-white">DRAG ME</span>
                  </div>
                  
                  <TaskCard title="Penthouse Deep Clean" status="Active" time="11:30 AM" delay={0.1} />
                  <TaskCard title="HVAC Filter Replacement (East Wing)" status="Pending" time="12:15 PM" delay={0.2} />
                  <TaskCard title="VIP Arrival Setup (Suite 402)" status="Active" time="01:00 PM" delay={0.3} />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-5 grid grid-rows-2 gap-8 h-[600px]">
            <GlassCard hoverEffect={true} className="flex flex-col justify-center p-8 bg-gradient-to-br from-white/5 to-transparent border-white/10 group cursor-pointer" onClick={onEnter}>
              <ShieldCheck className="text-[#10b981] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-3xl font-[Instrument_Serif] text-white mb-3">Absolute State Sync</h3>
              <p className="text-[--text-muted] font-[Inter] mb-6 text-sm leading-relaxed">State machines reconcile offline conflicts automatically. No loaders. No waiting.</p>
              <button className="text-white border border-white/20 w-max px-6 py-3 rounded-md font-[Manrope] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                Access Protocol <ArrowRight size={14} />
              </button>
            </GlassCard>
            
            <GlassCard hoverEffect={true} className="flex flex-col justify-center p-8 bg-[#2b2344]/30 border-[#7b39fc]/20 relative overflow-hidden group cursor-pointer" onClick={onEnter}>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7b39fc] rounded-full blur-[60px] opacity-30 group-hover:scale-150 transition-transform duration-1000" />
              <Zap className="text-[#7b39fc] mb-6 relative z-10 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-3xl font-[Instrument_Serif] text-white mb-3 relative z-10">Neural Routing</h3>
              <p className="text-[#b084f6]/70 font-[Inter] mb-6 text-sm leading-relaxed relative z-10">Deterministic load balancing. We batch tasks predictively before they hit your queue.</p>
              <button className="text-[#7b39fc] border border-[#7b39fc]/30 bg-[#7b39fc]/10 w-max px-6 py-3 rounded-md font-[Manrope] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#7b39fc] hover:text-white transition-colors relative z-10 flex items-center gap-2">
                Deploy Node <ArrowRight size={14} />
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

import DomeGallery from '../components/ui/DomeGallery';

const AnimatedFeaturesGrid = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', alt: 'Server racks' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', alt: 'Circuit boards' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', alt: 'Global data' },
    { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop', alt: 'Data center' },
    { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', alt: 'Abstract tech glass' },
    { src: 'https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?q=80&w=2034&auto=format&fit=crop', alt: 'Datacenter hallway' },
    { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop', alt: 'Matrix code' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop', alt: 'Monitoring setup' },
    { src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop', alt: 'AI Chip' },
    { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', alt: 'Tech hardware' },
  ];

  return (
    <section className="py-32 bg-[#0a0812] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-[Instrument_Serif] text-white leading-tight tracking-tight mb-6">
            ENGINEERED FOR <span className="text-[#7b39fc]">SCALE.</span>
          </h2>
        </div>
      </div>
      
      <div className="w-full h-[700px] relative">
        <DomeGallery
          images={images}
          fit={0.6}
          minRadius={400}
          segments={20}
          overlayBlurColor="#0a0812"
          grayscale={true}
        />
      </div>
    </section>
  );
};

const MetricsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  
  return (
    <section id="scale" ref={ref} className="py-32 bg-[#7b39fc] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <motion.div style={{ scale }} className="flex whitespace-nowrap will-change-transform">
        <div className="flex gap-16 px-8 animate-[marquee_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-[100px] md:text-[140px] font-[Instrument_Serif] tracking-tighter hover:text-black hover:-translate-y-2 transition-all duration-300 cursor-default">10,000+ ROOMS</span>
              <span className="text-4xl opacity-50">✦</span>
              <span className="text-[100px] md:text-[140px] font-[Instrument_Serif] tracking-tighter text-transparent hover:text-white transition-all duration-300 cursor-default" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}>99.9% UPTIME</span>
              <span className="text-4xl opacity-50">✦</span>
              <span className="text-[100px] md:text-[140px] font-[Instrument_Serif] tracking-tighter hover:text-black hover:-translate-y-2 transition-all duration-300 cursor-default">ZERO LATENCY</span>
              <span className="text-4xl opacity-50">✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Global Interactive Cursor effect
const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.animate({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        }, { duration: 1000, fill: "forwards" });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-96 h-96 bg-[#7b39fc] rounded-full mix-blend-screen blur-[150px] opacity-20 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
    />
  );
};

export default function Landing({ onEnter }: { onEnter: () => void }) {

  return (
    <main className="bg-black min-h-screen selection:bg-[#7b39fc]/30 selection:text-white relative overflow-hidden">
      <CursorGlow />
      
      {/* Navbar & Hero */}
      <Navbar onEnter={onEnter} />
      <div id="hero">
        <Hero onEnter={onEnter} />
      </div>
      
      {/* Features Grid */}
      <FeatureShowcase onEnter={onEnter} />
      
      {/* Marquee */}
      <MetricsSection />
      
      {/* Grids */}
      <AnimatedFeaturesGrid />
      
      {/* Footer CTA */}
      <section className="h-[70vh] relative flex items-center justify-center bg-[#0a0812] overflow-hidden border-t border-white/5 group">
         <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-auto">
           <FaultyTerminal
             scale={1.5}
             gridMul={[2, 1]}
             digitSize={1.2}
             timeScale={1}
             pause={false}
             scanlineIntensity={1}
             glitchAmount={1}
             flickerAmount={1}
             noiseAmp={1}
             chromaticAberration={0}
             dither={0}
             curvature={0}
             tint="#7b39fc"
             mouseReact={true}
             mouseStrength={0.5}
             pageLoadAnimation={false}
             brightness={1}
           />
         </div>
         <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7b39fc] rounded-full blur-[200px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
           <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7b39fc]/50 to-transparent"></div>
         </div>
         <BorderGlow borderRadius={24} glowRadius={50} glowIntensity={0.7} className="z-10 max-w-3xl w-full">
           <GlassCard className="text-center p-12 md:p-16 border-white/5 bg-[#1a1528]/50 w-full h-full" hoverEffect={false}>
              <h2 className="text-5xl md:text-7xl font-[Instrument_Serif] text-white mb-6 tracking-tight">ABSOLUTE CONTROL.</h2>
              <p className="text-[--text-muted] font-[Inter] mb-10 text-lg max-w-lg mx-auto">Stop managing your infrastructure blindly. Transition your operations to a deterministic architecture today.</p>
              <button onClick={onEnter} className="bg-white text-black px-12 py-4 rounded-[4px] text-[11px] font-[Manrope] font-bold hover:bg-[#7b39fc] hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(123,57,252,0.5)] uppercase tracking-[0.3em] flex items-center gap-3 mx-auto will-change-transform active:scale-95">
                <Lock size={14} /> Initiate Handshake
              </button>
           </GlassCard>
         </BorderGlow>
      </section>

      {/* Comprehensive Footer */}
      <Footer onEnter={onEnter} />
    </main>
  );
}
