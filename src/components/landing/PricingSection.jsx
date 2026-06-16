import React, { useState } from 'react';

export const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-32 px-6 md:px-32 bg-[--ivory]">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl gold-text mb-8">Choose Your Rank</h2>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!annual ? 'text-[--obsidian]' : 'text-[--obsidian]/50'}`}>Monthly</span>
          <button 
            onClick={() => setAnnual(!annual)}
            className="w-14 h-7 rounded-full bg-[--obsidian] p-1 relative flex items-center"
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${annual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${annual ? 'text-[--obsidian]' : 'text-[--obsidian]/50'}`}>
            Annual
            <span className="bg-[--gold]/20 text-[--gold] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-6xl mx-auto items-center lg:items-stretch">
        
        {/* Free */}
        <div className="marble-glass rounded-3xl p-8 w-full max-w-sm flex flex-col">
          <h3 className="font-display text-2xl mb-2">Citizen</h3>
          <div className="text-4xl font-display text-[--obsidian] mb-6">$0<span className="text-sm font-sans text-[--obsidian]/50">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-sm text-[--obsidian]/80">
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> 5 Projects</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Basic Task Tracking</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> 7-Day History</li>
          </ul>
          <button className="w-full border border-[--obsidian]/20 rounded-full px-8 py-3 text-sm font-medium hover:border-[--obsidian] transition-colors">Start Free</button>
        </div>

        {/* Pro */}
        <div className="bg-[--obsidian] text-white rounded-3xl p-8 w-full max-w-sm flex flex-col relative transform -translate-y-4 lg:-translate-y-8 scale-105 shadow-2xl border border-[--gold]/30 z-10">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M2 20h20M4 16l2-10 4 4 2-6 2 6 4-4 2 10H4z"/>
            </svg>
          </div>
          <div className="absolute top-4 right-4 bg-[--gold] text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium">Most Popular</div>
          
          <h3 className="font-display text-2xl mb-2 text-[--gold]">Strategist</h3>
          <div className="text-4xl font-display mb-6">${annual ? '18' : '24'}<span className="text-sm font-sans text-white/50">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-sm text-white/80">
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Infinite Projects</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Omniscient AI Agents</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Eternal History</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Advanced Analytics</li>
          </ul>
          <button className="w-full bg-[--gold] text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-[#b59543] transition-colors shadow-[0_4px_14px_rgba(201,168,76,0.4)]">Forge Alliance</button>
        </div>

        {/* Enterprise */}
        <div className="marble-glass rounded-3xl p-8 w-full max-w-sm flex flex-col">
          <h3 className="font-display text-2xl mb-2">Emperor</h3>
          <div className="text-4xl font-display text-[--obsidian] mb-6">Custom</div>
          <ul className="space-y-4 mb-8 flex-1 text-sm text-[--obsidian]/80">
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Dedicated Oracle Server</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> Custom Workflows</li>
            <li className="flex items-center gap-2"><span className="text-[--gold]">✓</span> 24/7 Support</li>
          </ul>
          <button className="w-full border border-[--obsidian]/20 rounded-full px-8 py-3 text-sm font-medium hover:border-[--obsidian] transition-colors">Contact Sales</button>
        </div>

      </div>
    </section>
  );
};
