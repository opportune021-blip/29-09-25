import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function CellularRespirationSlide2() {
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
            Introduction to Cellular Respiration 🔋
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            This is how all living cells—including yours—convert food (glucose) into usable energy (ATP).
          </p>
        </motion.div>

        {/* The Chemical Equation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-400">The Overall Equation</h2>
          <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <p className="text-xl md:text-2xl font-mono text-slate-800 dark:text-slate-100">
              C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP Energy
            </p>
            <p className="text-lg md:text-xl font-mono mt-2 text-slate-600 dark:text-slate-300">
              (Glucose + Oxygen → Carbon Dioxide + Water + Energy)
            </p>
          </div>
          <p className="text-center text-lg mt-4 text-slate-600 dark:text-slate-300">
            Notice anything? This is the exact **reverse** of the photosynthesis equation!
          </p>
        </motion.div>

        {/* Main Content - Inputs and Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The Inputs (Reactants)</h2>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Glucose (C₆H₁₂O₆):</strong> The "food" molecule. This comes from photosynthesis (in plants) or from eating (in animals).</li>
              <li><strong>Oxygen (O₂):</strong> The gas we breathe in. It is required for the process to be *aerobic*.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The Outputs (Products)</h2>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>ATP (Energy):</strong> The main product! This is the usable energy "currency" that powers all cell activities.</li>
              <li><strong>Carbon Dioxide (CO₂):</strong> A waste product that we breathe out.</li>
              <li><strong>Water (H₂O):</strong> Another waste product.</li>
            </ul>
          </motion.div>
        </div>

        {/* Section on Mitochondria */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Where Does It Happen?
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <p className="text-lg leading-relaxed mb-4">
                While the first small step (glycolysis) happens in the cytoplasm, the main, energy-producing stages of aerobic respiration take place in the **mitochondria**.
              </p>
              <p className="text-xl font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                The mitochondrion is known as the "powerhouse" of the cell for this very reason: it's where glucose is converted into large amounts of ATP.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                **Important:** Both plant and animal cells have mitochondria and perform cellular respiration. Plants photosynthesize to *make* their food (glucose) and then use respiration to *break down* that food for energy, just like we do.
              </p>
            </div>
            <div className="flex-shrink-0">
              
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="intro-to-cellular-respiration"
      slideTitle="An introduction to cellular respiration"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="cellular-respiration"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}