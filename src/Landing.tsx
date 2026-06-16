import { motion, useScroll, useTransform } from 'framer-motion';

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="ionic-column-bg" style={{ margin: '0 2rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', borderBottom: 'var(--border-monument)' }}>
        
        <motion.div 
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', zIndex: 10, opacity: opacityText }}
        >
          <h1 className="title-massive" data-text="SCULPT">SCULPT</h1>
          <h1 className="title-massive" data-text="YOUR">YOUR</h1>
          <h1 className="title-massive" data-text="LEGACY">LEGACY</h1>
          
          <p style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, marginTop: '4rem', 
            background: 'var(--color-obsidian)', color: 'var(--color-limestone)', display: 'inline-block', padding: '1.5rem 3rem',
            border: '8px solid var(--color-terracotta)', alignSelf: 'flex-start'
          }}>
            THE LABORS OF MODERNITY REQUIRE ANCIENT DISCIPLINE.
          </p>
        </motion.div>

        {/* Right Statue Parallax */}
        <motion.div style={{ flex: 1, position: 'relative', y: yImage }}>
          <img 
            src="/greek-statue.png" 
            alt="Hercules Fragmented" 
            style={{ width: '100%', height: '120vh', objectFit: 'cover', filter: 'contrast(1.5) grayscale(0.2)', borderLeft: 'var(--border-monument)' }} 
          />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 100 }}>
        <a href="#agora" className="chiseled-text" style={{ fontSize: '1.5rem', marginBottom: '1rem', background: 'var(--color-bg)', color: 'var(--color-obsidian)', padding: '0.5rem 1rem', border: 'var(--border-monument)', textDecoration: 'none', display: 'inline-block' }}>
          DESCEND INTO THE AGORA
        </a>
        <div style={{ width: '8px', height: '100px', background: 'var(--color-obsidian)', margin: '1rem auto 0 auto', animation: 'pulse 2s infinite' }} />
      </div>

    </div>
  );
};

export default Landing;
