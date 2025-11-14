import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function EnergyFlowSlide4() {
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
            Trophic Levels and Energy Loss
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Why are there fewer predators than prey? It all comes down to energy.
          </p>
        </motion.div>

        {/* Section 1: Trophic Levels */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">What is a Trophic Level?</h2>
          <p className="text-lg leading-relaxed">
            A **trophic level** is the position an organism holds in a food chain. It's a "feeding level."
          </p>
          <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
            <li>**Trophic Level 1: Producers** (e.g., Plants, Algae) - Create their own food.</li>
            <li>**Trophic Level 2: Primary Consumers** (e.g., Rabbits, Grasshoppers) - Herbivores that eat producers.</li>
            <li>**Trophic Level 3: Secondary Consumers** (e.g., Foxes, Frogs) - Carnivores/omnivores that eat primary consumers.</li>
            <li>**Trophic Level 4: Tertiary Consumers** (e.g., Hawks, Lions) - Carnivores/omnivores that eat secondary consumers.</li>
          </ul>
        </motion.div>

        {/* Section 2: The 10% Rule */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">Why Energy is Lost</h2>
          <p className="text-lg leading-relaxed">
            When an organism is eaten, not all of its energy is passed to the predator. Most of it is lost!
          </p>
          <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
            <li>**Metabolic Processes:** The organism used most of its energy just to stay alive (moving, breathing, keeping warm). This is lost as **heat**.</li>
            <li>**Not Eaten:** Not all parts of an organism are eaten (e.g., bones, roots).</li>
            <li>**Waste:** Not all eaten parts are digested (lost as feces).</li>
          </ul>
          <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mt-4">
            This is known as the **"10% Rule"**: On average, only about **10%** of the energy from one trophic level is stored in the next trophic level.
          </p>
        </motion.div>
        
        {/* Image - Energy Pyramid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Energy Pyramid</h3>
          <div className="flex justify-center">
            
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
            An energy pyramid shows how energy decreases at each level.
          </p>
          <ul className="mt-4 text-lg text-center">
            <li><strong>Producers:</strong> 100% Energy</li>
            <li><strong>Primary Consumers:</strong> 10% Energy</li>
            <li><strong>Secondary Consumers:</strong> 1% Energy</li>
            <li><strong>Tertiary Consumers:</strong> 0.1% Energy</li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            This massive energy loss is why food chains are rarely longer than 4-5 levels and why it takes a huge amount of grass (producers) to support a single hawk (tertiary consumer).
          </p>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="trophic-levels-energy-loss"
      slideTitle="Trophic levels and energy loss"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="energy-matter-flow"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}