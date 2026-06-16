import React, { useEffect, useState } from 'react';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const testimonials = [
    { quote: "The workflow feels ordained by the gods. We moved our entire enterprise to Olympus in 3 days.", author: "Marcus Aurelius", company: "Rome Inc.", initials: "MA" },
    { quote: "A masterpiece of UI architecture. The columns frame our data like a museum exhibit.", author: "Athena", company: "Strategy Labs", initials: "A" },
    { quote: "Our engineering velocity doubled. The AI assistant literally writes our tickets now.", author: "Hephaestus", company: "Forge & Co.", initials: "H" },
    { quote: "Beautiful, fast, and ruthlessly efficient. Exactly what a modern task tracker should be.", author: "Apollo", company: "Sun Microsystems", initials: "AP" },
    { quote: "Finally, a tool that matches our ambition. The Gantt charts are legendary.", author: "Alexander", company: "Macedon Group", initials: "AL" },
    { quote: "It brings order to the chaos. The command palette alone saves me 2 hours a day.", author: "Aristotle", company: "Academy", initials: "AR" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-32 bg-[--marble] relative overflow-hidden flex flex-col items-center">
      {/* Amphitheater Background SVG */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full opacity-30 pointer-events-none" viewBox="0 0 1000 500" fill="none">
        <circle cx="500" cy="500" r="400" stroke="rgba(201,168,76,0.1)" strokeWidth="2"/>
        <circle cx="500" cy="500" r="300" stroke="rgba(201,168,76,0.1)" strokeWidth="2"/>
        <circle cx="500" cy="500" r="200" stroke="rgba(201,168,76,0.1)" strokeWidth="2"/>
      </svg>

      <h2 className="font-display text-5xl gold-text mb-20 z-10">Voices from the Agora</h2>

      <div className="relative w-full max-w-6xl h-96 flex justify-center items-center z-10 perspective-1000">
        {testimonials.map((t, i) => {
          // Calculate arc position
          // Total 6 items. Index 0 is far left, index 5 is far right.
          const offset = i - 2.5; // -2.5, -1.5, -0.5, 0.5, 1.5, 2.5
          const rotation = offset * 15; // deg
          const translateY = -40 + Math.abs(offset) * 20; // center is highest (most negative)
          
          const isActive = i === activeIndex;

          return (
            <div 
              key={i}
              className={`absolute marble-glass rounded-2xl p-6 w-72 transition-all duration-700 ease-in-out cursor-default hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:border-[--gold] ${isActive ? 'scale-105 z-20 border-[--gold] shadow-[0_0_20px_rgba(201,168,76,0.2)]' : 'z-10'}`}
              style={{
                transform: `translateX(${offset * 180}px) translateY(${translateY}px) rotate(${rotation}deg)`,
              }}
            >
              <div className="flex gap-1 text-[--gold] mb-4 text-sm">★★★★★</div>
              <p className="italic font-sans text-[--obsidian]/80 text-sm mb-6 leading-relaxed line-clamp-4">"{t.quote}"</p>
              
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 rounded-full bg-[--med-blue] text-white flex items-center justify-center text-xs font-medium">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[--obsidian] text-sm">{t.author}</span>
                  <span className="text-[10px] text-[--obsidian]/50 uppercase tracking-wider">{t.company}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
