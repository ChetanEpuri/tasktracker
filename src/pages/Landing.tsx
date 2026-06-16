import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import LiquidImage from '../components/LiquidImage';
import { GlassCard } from '../ui/GlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import { useRef } from 'react';

const Navbar = () => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000, background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold-gradient)', boxShadow: 'var(--shadow-glow)' }} />
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '2px', color: 'var(--color-river-teal)' }}>OLYMPUS</span>
    </div>
    <div style={{ display: 'flex', gap: '4rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500 }}>
      {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
        <span key={link} style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--text-light)' }} className="hover:text-gold">
          {link}
        </span>
      ))}
    </div>
    <Link to="/app" style={{ textDecoration: 'none' }}>
      <LiquidButton variant="outline">ENTER PLATFORM</LiquidButton>
    </Link>
  </motion.nav>
);

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', inset: -100, y, zIndex: -1 }}>
        <img src="https://images.unsplash.com/photo-1600854275096-2679805d76de?q=80&w=2574&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
      </motion.div>

      <motion.div style={{ opacity, textAlign: 'center', zIndex: 10, maxWidth: '1000px', padding: '0 2rem' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}>
          <span style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '50px', background: 'rgba(26, 75, 92, 0.05)', color: 'var(--color-river-teal)', fontFamily: 'var(--font-heading)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>
            THE NEW STANDARD
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ fontSize: '7rem', lineHeight: 1.1, marginBottom: '2rem', color: 'var(--color-river-teal)', whiteSpace: 'nowrap' }}
        >
          DIVINE <span className="text-gold">INTELLIGENCE</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ fontSize: '1.5rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.6 }}
        >
          The world's most advanced AI operating system. Architected for the elite, designed for the gods.
        </motion.p>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}
        >
          <Link to="/app" style={{ textDecoration: 'none' }}>
            <LiquidButton variant="gold">START DEPLOYMENT</LiquidButton>
          </Link>
          <LiquidButton variant="dark">WATCH KEYNOTE</LiquidButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

const InteractiveShowcase = () => {
  return (
    <section style={{ padding: '8rem 4rem', background: '#fafafa', position: 'relative', zIndex: 20, borderRadius: '40px 40px 0 0', boxShadow: '0 -20px 40px rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '4rem', color: 'var(--color-river-teal)', maxWidth: '600px', lineHeight: 1.1 }}>
            ENGINEERED FOR PERFECTION
          </h2>
          <p style={{ maxWidth: '400px', color: 'var(--text-light)', fontSize: '1.125rem' }}>
            Every micro-interaction is calculated. Experience true 60fps WebGL fluid dynamics deeply integrated into your DOM elements.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <GlassCard className="h-[700px] p-0 overflow-hidden" hoverIntensity={1.5}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <LiquidImage 
                image="https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=2574&auto=format&fit=crop" 
                strength={0.4} 
                speed={0.2} 
                borderRadius={24} 
                fit="cover"
              />
              <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Liquid Depth Maps</h3>
                  <p style={{ opacity: 0.8 }}>Real-time WebGL fragmentation.</p>
                </div>
                <LiquidButton variant="gold">INTERACT</LiquidButton>
              </div>
            </div>
          </GlassCard>

          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2rem' }}>
            <GlassCard hoverIntensity={2}>
              <h3 style={{ fontSize: '2rem', color: 'var(--color-river-teal)', marginBottom: '1rem' }}>Global State</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Powered by advanced Zustand stores handling 10,000+ data nodes seamlessly.</p>
              <LiquidButton variant="outline">VIEW ARCHITECTURE</LiquidButton>
            </GlassCard>
            
            <GlassCard hoverIntensity={2}>
              <h3 style={{ fontSize: '2rem', color: 'var(--color-river-teal)', marginBottom: '1rem' }}>Physics Engine</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Custom spring physics calculating sub-pixel interpolation on every frame.</p>
              <LiquidButton variant="outline">VIEW PHYSICS</LiquidButton>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  
  return (
    <section ref={ref} style={{ padding: '8rem 0', background: 'var(--color-river-teal)', color: 'white', overflow: 'hidden' }}>
      <motion.div style={{ scale }} className="marquee-container">
        <div className="marquee-content" style={{ gap: '4rem', paddingRight: '4rem' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '8rem', alignItems: 'center' }}>
              <span style={{ fontSize: '8rem', fontFamily: 'var(--font-heading)', fontWeight: 900, WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>10,000+ LINES</span>
              <span style={{ fontSize: '4rem' }}>✦</span>
              <span style={{ fontSize: '8rem', fontFamily: 'var(--font-heading)', fontWeight: 900 }}>60 FPS WEBGL</span>
              <span style={{ fontSize: '4rem' }}>✦</span>
              <span style={{ fontSize: '8rem', fontFamily: 'var(--font-heading)', fontWeight: 900, WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>ZERO LATENCY</span>
              <span style={{ fontSize: '4rem' }}>✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default function Landing() {
  return (
    <main style={{ background: 'var(--color-marble-pure)' }}>
      <Navbar />
      <HeroSection />
      <InteractiveShowcase />
      <MetricsSection />
      
      {/* Footer overlapping effect */}
      <section style={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div className="river-bg" />
         <GlassCard className="text-center z-10" hoverIntensity={0.5}>
            <h2 style={{ fontSize: '5rem', color: 'white', marginBottom: '2rem' }}>THE FUTURE IS BUILT</h2>
            <Link to="/app" style={{ textDecoration: 'none' }}>
              <LiquidButton variant="gold">ENTER THE PLATFORM</LiquidButton>
            </Link>
         </GlassCard>
      </section>
    </main>
  );
}
