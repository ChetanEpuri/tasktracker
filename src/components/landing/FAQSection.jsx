import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Can I import my existing tasks?", a: "Yes, Olympus supports one-click imports from Jira, Asana, Linear, and Trello via our sacred bridge API." },
    { q: "How secure is my data?", a: "Your data is encrypted at rest and in transit. We run daily automated backups to cold storage in an undisclosed bunker." },
    { q: "What makes the AI Assistant different?", a: "Our AI is context-aware across all your projects. It doesn't just answer questions; it actively manages your schedule, identifies blockers, and writes subtasks." },
    { q: "Do you offer a self-hosted option?", a: "Yes, our Emperor tier includes an on-premise Docker deployment option with full source code escrow." },
    { q: "Is there a limit on API requests?", a: "The Citizen tier is limited to 1,000 requests per day. Strategist and Emperor tiers have unlimited API access." },
    { q: "How does the Command Palette work?", a: "Press Cmd+K from anywhere to search across tasks, projects, teammates, and documents instantly with sub-50ms latency." },
    { q: "Can I customize the marble theme?", a: "Sacrilege! (But yes, Dark Mode and Obsidian themes are available in Settings)." },
  ];

  return (
    <section className="py-32 px-6 md:px-32 max-w-4xl mx-auto bg-[--ivory]">
      <h2 className="font-display text-4xl gold-text text-center mb-16">Scrolls of Wisdom</h2>

      <div className="flex flex-col">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-[--gold]/20 py-6">
              <button 
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-sans font-medium text-lg text-[--obsidian]">{faq.q}</span>
                <motion.span 
                  animate={{ rotate: isOpen ? 45 : 0 }} 
                  transition={{ duration: 0.2 }}
                  className="text-[--gold] text-2xl leading-none ml-4"
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-[--obsidian]/70 pt-3 pr-8 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
