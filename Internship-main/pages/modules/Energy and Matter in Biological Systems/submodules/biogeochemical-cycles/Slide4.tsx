import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide4() {
  const { isDarkMode } = useThemeContext();

  // No interactive quiz state needed for an article slide
  const localInteractions: Record<string, InteractionResponse> = {};

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Article: The Nitrogen Cycle
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Nitrogen is a critical component of proteins (amino acids) and nucleic acids (DNA/RNA). But for most life, it's locked away.
          </p>
        </motion.div>

        {/* Section 1: The Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-400">The Nitrogen Problem</h2>
          <p className="text-lg leading-relaxed text-center">
            Our atmosphere is 78% nitrogen gas (N₂). But N₂ is extremely stable and unusable by most organisms. It must be "fixed."
          </p>
          <p className="text-xl font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mt-4 text-center">
            This entire cycle is driven almost completely by **bacteria**.
          </p>
        </motion.div>

        {/* --- MODIFIED SECTION: Left/Right Format --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          // This parent div now controls the L/R layout
          className="flex flex-col md:flex-row gap-8" 
        >
          
          {/* Left Column (Text) */}
          <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The Key Steps of the Cycle</h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">1. Nitrogen Fixation:</span> Special bacteria (some living in plant root nodules) convert N₂ gas from the air into usable **ammonia (NH₃)**.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">2. Nitrification:</span> Other bacteria convert ammonia (NH₃) into **nitrites (NO₂⁻)** and then into **nitrates (NO₃⁻)**.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">3. Assimilation:</span> This is how it enters the food chain. **Plants absorb nitrates (NO₃⁻)** from the soil to make proteins and DNA. Animals get nitrogen by eating plants.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">4. Ammonification:</span> When organisms die or produce waste, **decomposers (bacteria and fungi)** break them down, returning the nitrogen to the soil as **ammonia (NH₃)**.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">5. Denitrification:</span> Finally, denitrifying bacteria convert nitrates (NO₃⁻) in the soil back into **N₂ gas**, which returns to the atmosphere, completing the cycle.
              </li>
            </ul>
          </div>
          
          {/* Right Column (Image) */}
          <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Nitrogen Cycle Diagram</h3>
            <div className="flex justify-center">
              <img
                src="https://www.studyacs.com/database/files/Garden/Nitrogen%20Cycle%20www.acs.edu.au%20.jpg"
                alt="A diagram illustrating the steps of the Nitrogen Cycle"
                className="rounded-xl shadow-lg w-full h-auto" // Removed max-w-2xl to let it fit the column
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Notice how bacteria are involved in every major step of the cycle, moving nitrogen between the air, soil, and living things.
            </p>
          </div>

        </motion.div>
        {/* --- END OF MODIFIED SECTION --- */}

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="nitrogen-cycle-article"
      slideTitle="The nitrogen cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}