import React, { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';

export const Navbar = ({ onEnter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-20 bg-transparent px-6 md:px-[120px] py-[16px]">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-white">
              <path d="M1.04356 6.35771L13.6437 0.666504C14.0729 0.472596 14.5684 0.551608 14.919 0.869408L23.4981 8.64731C23.9576 9.06385 24.0863 9.72145 23.8188 10.2831L16.2917 26.0827C16.0354 26.6206 15.4285 26.8778 14.8617 26.6896L1.86016 22.3735C1.35338 22.2052 1.00282 21.7371 0.985955 21.2057L0.598583 9.00688C0.581561 8.47055 0.871092 7.97159 1.35032 7.70586L1.04356 6.35771Z" fill="white"/>
              <circle cx="12" cy="12" r="10" fill="white" />
            </svg>
            <span className="ml-2 text-white font-[Manrope] font-bold text-xl">Datacore</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            <a href="#" className="font-[Manrope] font-medium text-[14px] text-white hover:opacity-80 transition-opacity">Home</a>
            <a href="#" className="font-[Manrope] font-medium text-[14px] text-white hover:opacity-80 transition-opacity flex items-center gap-1">
              Services <ChevronDown size={14} />
            </a>
            <a href="#" className="font-[Manrope] font-medium text-[14px] text-white hover:opacity-80 transition-opacity">Reviews</a>
            <a href="#" className="font-[Manrope] font-medium text-[14px] text-white hover:opacity-80 transition-opacity">Contact us</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <button className="bg-white border border-[#d4d4d4] rounded-[8px] text-[#171717] font-[Manrope] font-semibold text-[14px] px-4 py-2 hover:bg-gray-50 transition-colors">
              Sign In
            </button>
            <button 
              onClick={onEnter}
              className="bg-[#7b39fc] rounded-[8px] text-[#fafafa] font-[Manrope] font-semibold text-[14px] px-4 py-2 shadow-sm hover:bg-[#6a2ce3] transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <span className="text-white font-[Manrope] font-bold text-xl">Datacore</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <a href="#" className="font-[Manrope] font-medium text-2xl text-white">Home</a>
            <a href="#" className="font-[Manrope] font-medium text-2xl text-white">Services</a>
            <a href="#" className="font-[Manrope] font-medium text-2xl text-white">Reviews</a>
            <a href="#" className="font-[Manrope] font-medium text-2xl text-white">Contact us</a>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <button className="w-full bg-white rounded-[8px] text-[#171717] font-[Manrope] font-semibold text-[16px] px-4 py-4">
              Sign In
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onEnter(); }}
              className="w-full bg-[#7b39fc] rounded-[8px] text-[#fafafa] font-[Manrope] font-semibold text-[16px] px-4 py-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
};
