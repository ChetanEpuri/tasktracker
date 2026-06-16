import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#000000] border-t border-white/5 py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[--accent-purple] to-[--accent-blue] flex items-center justify-center text-white font-bold text-sm">
              O
            </div>
            <span className="font-semibold tracking-wide text-[--text-main] text-sm">
              Olympus
            </span>
          </div>
          <p className="text-[--text-muted] max-w-sm text-sm leading-relaxed mb-6">
            The operating system for modern, high-velocity teams. Designed for absolute focus.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[--text-muted] flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold">X</div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[--text-muted] flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold">G</div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-[--text-muted] flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold">in</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 text-sm">Product</h4>
          <ul className="space-y-4 text-sm text-[--text-muted]">
            <li className="hover:text-white cursor-pointer transition-colors">Features</li>
            <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 text-sm">Legal</h4>
          <ul className="space-y-4 text-sm text-[--text-muted]">
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Security</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[--text-muted] text-sm">
          © {new Date().getFullYear()} Olympus Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[--accent-green]"></div>
          <span className="text-[--text-muted] text-sm font-medium">All systems operational</span>
        </div>
      </div>
    </footer>
  );
};
