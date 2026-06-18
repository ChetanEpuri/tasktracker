import React from 'react';
import { Globe, Mail, MessageSquare, Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = ({ onEnter }) => {
  return (
    <footer className="bg-black pt-32 pb-12 px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-70">
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#7b39fc]/30 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="font-[Instrument_Serif] text-5xl md:text-6xl text-white tracking-tighter mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#7b39fc] flex items-center justify-center border border-white/20"></span>
              Olympus AI
            </h2>
            <p className="text-[--text-muted] font-[Inter] text-sm leading-relaxed max-w-sm mb-8">
              The deterministic infrastructure engine for high-end property operations. Built for those who demand absolute control and zero latency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[--text-muted] hover:text-white hover:bg-[#7b39fc]/20 border border-white/5 hover:border-[#7b39fc]/50 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[--text-muted] hover:text-white hover:bg-[#7b39fc]/20 border border-white/5 hover:border-[#7b39fc]/50 transition-all">
                <Mail size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[--text-muted] hover:text-white hover:bg-[#7b39fc]/20 border border-white/5 hover:border-[#7b39fc]/50 transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[--text-muted] hover:text-white hover:bg-[#7b39fc]/20 border border-white/5 hover:border-[#7b39fc]/50 transition-all">
                <Terminal size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-[Manrope] text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Platform</h4>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-[#7b39fc] transition-colors">Neural Routing</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-[#7b39fc] transition-colors">State Sync Protocol</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-[#7b39fc] transition-colors">Command Terminal</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-[#7b39fc] transition-colors">Predictive Analytics</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-[Manrope] text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Company</h4>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors">About Us</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors flex items-center gap-2">Careers <span className="bg-[#10b981]/20 text-[#10b981] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Hiring</span></a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors">Engineering Blog</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors">Press Kit</a>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h4 className="font-[Manrope] text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Access</h4>
              <button onClick={onEnter} className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors text-left flex items-center gap-2 group">
                Client Login <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#7b39fc]" />
              </button>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors">Request Instance</a>
              <a href="#" className="font-[Inter] text-sm text-[--text-muted] hover:text-white transition-colors">Documentation</a>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[Inter] text-xs text-[--text-muted]">
            © {new Date().getFullYear()} Olympus AI Technologies Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-[Inter] text-xs text-[--text-muted] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="font-[Inter] text-xs text-[--text-muted] hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="font-[Inter] text-xs text-[--text-muted] hover:text-white transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
