import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function CellularRespirationSlide3() {
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
            What Happens Without Oxygen?
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            When oxygen isn't available, cells can't perform aerobic respiration. They must use an alternative path called **anaerobic respiration** or **fermentation**.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-400">Aerobic vs. Anaerobic</h2>
          <p className="text-lg leading-relaxed mb-4">
            The first step, **glycolysis**, happens in both pathways and produces a small amount of 2 ATP. The real difference is what happens *after* glycolysis.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <li className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">Aerobic (With O₂):</span> Goes to the mitochondria, produces a **large amount of ATP** (approx. 32-38).
            </li>
            <li className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold">Anaerobic (No O₂):</span> Stays in the cytoplasm, goes through **fermentation**, produces **no additional ATP** (only the 2 from glycolysis).
            </li>
          </ul>
        </motion.div>

        {/* Main Content - Fermentation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Fermentation
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The main goal of fermentation is *not* to make more ATP. Its purpose is to regenerate a molecule (NAD+) that is needed to keep glycolysis running, allowing the cell to keep making at least a *little* bit of ATP (the 2 from glycolysis).
          </p>
          <p className="text-lg leading-relaxed font-semibold">There are two main types of fermentation:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">1. Lactic Acid Fermentation</h3>
              <p className="text-lg leading-relaxed">
                This happens in **muscle cells** during strenuous exercise when you can't get oxygen fast enough.
              </p>
              <ul className="mt-2 space-y-1 text-lg list-disc list-inside">
                <li>Byproduct: **Lactic Acid** (causes muscle soreness).</li>
                <li>Used by: Bacteria to make yogurt and cheese.</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">2. Alcoholic Fermentation</h3>
              <p className="text-lg leading-relaxed">
                This is carried out by **yeast** (a fungus) and some bacteria.
              </p>
              <ul className="mt-2 space-y-1 text-lg list-disc list-inside">
                <li>Byproducts: **Ethanol** (alcohol) and **Carbon Dioxide (CO₂) **.</li>
                <li>Used by: Humans to make bread (CO₂ makes it rise) and alcoholic beverages.</li>
              </ul>
            </div>
          </div>
          

[Image of alcoholic and lactic acid fermentation]

        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="anaerobic-respiration-fermentation"
      slideTitle="Anaerobic respiration and fermentation"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="cellular-respiration"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}