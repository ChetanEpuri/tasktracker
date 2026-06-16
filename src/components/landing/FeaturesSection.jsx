import React from 'react';
import { Shield, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../ui/GlassCard';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Terminal size={24} className="text-[--accent-blue]" />,
      title: "Command Palette",
      desc: "Navigate instantly, execute actions, and find anything in milliseconds."
    },
    {
      icon: <Zap size={24} className="text-[--accent-purple]" />,
      title: "Real-time Sync",
      desc: "Changes propagate across your team instantly with zero perceived latency."
    },
    {
      icon: <Shield size={24} className="text-[--accent-green]" />,
      title: "Enterprise Security",
      desc: "End-to-end encryption for all your sensitive project data out of the box."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Everything you need. <br/> Nothing you don't.
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[--text-muted] text-lg leading-relaxed"
          >
            We stripped away the clutter so you can focus on the work that actually matters.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-[--text-muted] leading-relaxed text-sm">
                  {f.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
