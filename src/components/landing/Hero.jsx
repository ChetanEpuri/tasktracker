import React from 'react';

export const Hero = ({ onEnter }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center text-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-32 px-4 w-full">
        
        {/* Tagline Pill */}
        <div className="bg-[rgba(85,80,110,0.4)] backdrop-blur-md border border-[rgba(164,132,215,0.5)] rounded-[10px] h-[38px] flex items-center px-1.5 pr-4 gap-2 mb-6 shadow-lg">
          <span className="bg-[#7b39fc] text-white font-[Cabin] font-medium text-[12px] px-2 py-0.5 rounded-[6px]">
            New
          </span>
          <span className="text-white font-[Cabin] font-medium text-[14px]">
            Say Hello to Datacore v3.2
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-white font-[Instrument_Serif] text-5xl md:text-[96px] leading-[1.1] tracking-tight max-w-[900px] mb-6">
          Book your perfect stay instantly <i className="italic mr-2">and</i> hassle-free
        </h1>

        {/* Subtext */}
        <p className="text-white/70 font-[Inter] font-normal text-[18px] max-w-[662px] mb-10 leading-relaxed">
          Discover handpicked hotels, resorts, and stays across your favorite destinations. Enjoy exclusive deals, fast booking, and 24/7 support.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onEnter}
            className="bg-[#7b39fc] text-white font-[Cabin] font-medium text-[16px] px-8 py-3.5 rounded-[10px] hover:bg-[#8b4ffc] transition-colors"
          >
            Book a Free Demo
          </button>
          <button 
            onClick={onEnter}
            className="bg-[#2b2344] text-[#f6f7f9] font-[Cabin] font-medium text-[16px] px-8 py-3.5 rounded-[10px] hover:bg-[#3c315e] transition-colors"
          >
            Get Started Now
          </button>
        </div>

      </div>
    </section>
  );
};
