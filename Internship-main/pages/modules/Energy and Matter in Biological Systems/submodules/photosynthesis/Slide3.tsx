import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide3() {
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
            Introduction to Photosynthesis ☀️
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy, in the form of glucose.
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
              6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
            </p>
            <p className="text-lg md:text-xl font-mono mt-2 text-slate-600 dark:text-slate-300">
              (Carbon Dioxide + Water + Light → Glucose + Oxygen)
            </p>
          </div>
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
              <li><strong>Carbon Dioxide (CO₂):</strong> A gas taken from the atmosphere, usually through tiny pores in leaves called stomata.</li>
              <li><strong>Water (H₂O):</strong> Absorbed from the soil by the plant's roots.</li>
              <li><strong>Light Energy:</strong> The "power" for the reaction, absorbed by pigments.</li>
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
              <li><strong>Glucose (C₆H₁₂O₆):</strong> A sugar (carbohydrate) that stores the chemical energy. This is the plant's "food."</li>
              <li><strong>Oxygen (O₂):</strong> A waste product for the plant, which is released into the atmosphere (and is what we breathe!).</li>
            </ul>
          </motion.div>
        </div>

        {/* Section on Chloroplasts */}
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
                The entire process of photosynthesis takes place inside a specialized organelle called the **chloroplast**.
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li>Chloroplasts are found mainly in the cells of leaves.</li>
                <li>They contain a green pigment called **chlorophyll**, which is what makes plants green.</li>
                <li>It is chlorophyll's job to absorb the light energy needed to start the reaction.</li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/58/Photosynthesis_en.svg"
                alt="Diagram showing the inputs and outputs of photosynthesis"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="intro-to-photosynthesis"
      slideTitle="An introduction to photosynthesis"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}