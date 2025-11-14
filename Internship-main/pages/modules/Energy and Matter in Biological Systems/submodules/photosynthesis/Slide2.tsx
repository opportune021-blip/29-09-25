import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// This is a "video" slide.
// The main content is the video itself, supplemented by key concepts.

export default function PhotosynthesisSlide2() {
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
            Video: Breaking Down Photosynthesis Stages
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Let's look at the two main parts of this amazing process.
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
              The Two Stages
            </h2>
            {/* VIDEO PLAYER COMPONENT */}
            <div className="w-full aspect-video bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-slate-500 dark:text-slate-400">(Video Player Placeholder)</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
              Video: Explaining the Light-Dependent Reactions and the Calvin Cycle.
            </p>
          </motion.div>

          {/* Key Concepts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-1 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Key Stages</h2>
            <p className="text-lg leading-relaxed mb-4">
              The video will cover these two stages, which occur in the **chloroplast**:
            </p>
            <ul className="space-y-4 text-lg">
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">1. Light-Dependent Reactions</span>
                <p className="text-base">Occur in the thylakoid membranes. Uses **light** and **water** to create **ATP** and **NADPH** (energy carriers). Releases **oxygen**.</p>
              </li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">2. Calvin Cycle (Light-Independent)</span>
                <p className="text-base">Occurs in the stroma. Uses **ATP**, **NADPH**, and **CO₂** from the air to build **glucose** (sugar).</p>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="photosynthesis-stages"
      slideTitle="Breaking down photosynthesis stages"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions} // Pass empty object for now
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}