import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// This is a "video" slide.
// The main content is the video itself, supplemented by key concepts.

export default function BiogeochemicalCyclesSlide1() {
  const { isDarkMode } = useThemeContext();
  
  // No interactive quiz state needed for a video slide
  const localInteractions: Record<string, InteractionResponse> = {};

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Video: The Carbon Cycle
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Learn how carbon, the building block of life, moves through Earth's systems.
          </p>
        </motion.div>

        {/* Video Player and Key Concepts Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Video Player (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">
              Cycling Carbon
            </h2>
            {/* VIDEO PLAYER COMPONENT */}
            <div className="w-full aspect-video bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-slate-500 dark:text-slate-400">(Video Player Placeholder)</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
              Video: An overview of the carbon cycle's major reservoirs and processes.
            </p>
          </motion.div>

          {/* Key Concepts (from your module summary) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-1 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Learning Goals</h2>
            <p className="text-lg leading-relaxed mb-4">
              By the end of this submodule, you will be able to:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span>Investigate how **carbon and nitrogen** move through Earth's natural systems.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span>Understand how they cycle among the **atmosphere, biosphere, hydrosphere, and geosphere**.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span>Examine how **human activities** disrupt these natural cycles.</span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="carbon-cycle-video"
      slideTitle="The carbon cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions} // Pass empty object for now
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}