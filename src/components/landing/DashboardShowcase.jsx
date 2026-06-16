import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export const DashboardShowcase = () => {
  const [activeTab, setActiveTab] = useState('Tasks');
  const tabs = ['Tasks', 'AI Assistant', 'Analytics', 'Calendar'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Tasks':
        return (
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/50 border border-[--obsidian]/5">
                <div className="w-5 h-5 rounded-full border-2 border-[--obsidian]/20" />
                <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-red-500' : i === 2 ? 'bg-orange-400' : 'bg-blue-400'}`} />
                <span className="font-medium text-sm text-[--obsidian]">Build predictive models</span>
                <span className="ml-auto text-xs text-[--obsidian]/40 bg-[--obsidian]/5 px-2 py-1 rounded-full">Jun 1{i}</span>
                <div className="w-6 h-6 rounded-full bg-[--med-blue] text-white flex items-center justify-center text-[10px]">MA</div>
              </div>
            ))}
          </div>
        );
      case 'AI Assistant':
        return (
          <div className="flex flex-col h-full bg-white/50 rounded-xl p-4">
            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              <div className="self-end bg-[--obsidian] text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[80%]">
                Plan my product launch
              </div>
              <div className="self-start marble-glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[80%]">
                <p className="mb-2 font-medium">Product Launch Plan (4 Weeks)</p>
                <ul className="list-disc pl-4 space-y-1 text-[--obsidian]/70">
                  <li>Week 1: Finalize messaging & assets</li>
                  <li>Week 2: Beta testing & bug bashes</li>
                  <li>Week 3: Press outreach & influencer briefing</li>
                  <li>Week 4: Launch day coordination</li>
                </ul>
                <button className="mt-3 bg-[--gold] text-white px-3 py-1.5 rounded-lg text-xs font-medium">Create Tasks</button>
              </div>
            </div>
            <div className="mt-4 border border-[--obsidian]/10 rounded-xl p-2 flex gap-2">
              <input type="text" placeholder="Ask Olympus..." className="flex-1 bg-transparent text-sm outline-none px-2" />
              <div className="bg-[--obsidian] rounded-lg p-1.5 w-8 h-8 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        );
      case 'Analytics':
        return (
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="bg-white/50 p-4 rounded-xl flex flex-col justify-center">
              <Line 
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                  datasets: [{ label: 'Tasks', data: [12, 19, 15, 25, 22], borderColor: '#C9A84C', tension: 0.4 }]
                }} 
                options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
              />
            </div>
            <div className="bg-white/50 p-4 rounded-xl flex flex-col items-center justify-center">
              <div className="w-48 h-48">
                <Doughnut 
                  data={{
                    labels: ['Done', 'Review', 'Progress'],
                    datasets: [{ data: [300, 50, 100], backgroundColor: ['#1A6BAF', '#C9A84C', '#C4633A'] }]
                  }} 
                  options={{ maintainAspectRatio: false }} 
                />
              </div>
            </div>
          </div>
        );
      case 'Calendar':
        return (
          <div className="h-full bg-white/50 rounded-xl p-4 flex flex-col">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="text-center text-xs font-medium text-[--obsidian]/40">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 flex-1">
              {[...Array(28)].map((_, i) => (
                <div key={i} className="border border-[--obsidian]/5 rounded-lg p-1">
                  <span className="text-[10px] text-[--obsidian]/40">{i+1}</span>
                  {i === 14 && <div className="mt-1 h-4 bg-[--gold]/20 rounded border border-[--gold]/40 text-[8px] px-1 truncate">Launch</div>}
                  {i === 16 && <div className="mt-1 h-4 bg-[--med-blue]/20 rounded border border-[--med-blue]/40 text-[8px] px-1 truncate">Review</div>}
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <section className="py-32 px-6 md:px-32 bg-gradient-to-b from-[--ivory] to-[--sky]/30">
      <h2 className="font-display text-5xl gold-text text-center mb-10">Your Command Center</h2>
      
      <div className="flex justify-center gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-[--obsidian] text-white' : 'text-[--obsidian]/60 hover:bg-[--obsidian]/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="marble-glass rounded-3xl p-6 max-w-5xl mx-auto shadow-2xl min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="h-[372px]" // 420 - 48 (padding)
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
