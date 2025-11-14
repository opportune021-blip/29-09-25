import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide2() {
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
            Article: The Carbon Cycle 🔄
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Carbon is the backbone of all biomolecules. The carbon cycle shows how this element moves between the living and non-living world.
          </p>
        </motion.div>

        {/* Section 1: Key Processes */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Key Processes that Move Carbon</h2>
          <ul className="mt-4 space-y-3 text-lg">
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">1. Photosynthesis:</span> Plants and algae pull **CO₂** from the atmosphere to build glucose (carbon fixation). This moves carbon from the air into the biosphere.
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">2. Respiration:</span> All living organisms (plants and animals) break down glucose for energy, releasing **CO₂** back into the atmosphere.
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">3. Decomposition:</span> Decomposers (bacteria, fungi) break down dead organisms, releasing **CO₂** into the atmosphere and carbon into the soil.
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">4. Combustion:</span> The burning of fossil fuels (coal, oil, gas)—which are the ancient, compressed remains of dead organisms—releases massive amounts of **CO₂** into the atmosphere.
            </li>
          </ul>
        </motion.div>

        {/* Section 2: Reservoirs */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Where is Carbon Stored? (Reservoirs)</h2>
          <p className="text-lg leading-relaxed">
            Carbon is stored in four main "spheres" on Earth:
          </p>
          <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
            <li><strong>Atmosphere:</strong> As CO₂ gas.</li>
            <li><strong>Biosphere:</strong> In all living (and dead) organisms (plants, animals, soil).</li>
            <li><strong>Hydrosphere:</strong> Dissolved in water, especially the oceans, which are a huge carbon sink.</li>
            <li><strong>Geosphere:</strong> Trapped in rocks (like limestone) and as **fossil fuels** (coal, oil, gas) deep underground.</li>
          </ul>
        </motion.div>
        
        {/* Image - Carbon Cycle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Carbon Cycle Diagram</h3>
          <div className="flex justify-center">
            

[Image of the carbon cycle diagram]

          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
            This diagram shows the movement (arrows) of carbon between the different reservoirs (land, air, ocean).
          </p>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="carbon-cycle-article"
      slideTitle="The carbon cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}