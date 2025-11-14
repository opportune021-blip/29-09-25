import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide8() {
  const { isDarkMode } = useThemeContext();

  // No interactive quiz state needed for an article slide
  const localInteractions: Record<string, InteractionResponse> = {};

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Changed to 2-column grid */}
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Food, Biomolecules, and Energy
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              How does what we eat connect to the molecules and energy we've been learning about?
            </p>
          </div>

          {/* Main Content - From Food to Cells */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">1. Food as a Source of Matter</h2>
              <p className="text-lg leading-relaxed">
                The food we eat (e.g., a sandwich) is a collection of complex biomolecules (polymers).
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li>The bread and vegetables provide **carbohydrates** (starch, cellulose).</li>
                <li>The meat or cheese provides **proteins** and **lipids**.</li>
                <li>The cells of the plants and animals provide **nucleic acids**.</li>
              </ul>
              <p className="text-lg leading-relaxed mt-4">
                During **digestion**, catabolic reactions (hydrolysis) break these large polymers back down into their simple monomers:
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li>Starch → **Monosaccharides** (like glucose)</li>
                <li>Proteins → **Amino Acids**</li>
                <li>Fats → **Glycerol & Fatty Acids**</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">2. Food as a Source of Energy</h2>
              <p className="text-lg leading-relaxed">
                Once these monomers are absorbed into your cells, they have two main fates:
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li><strong>Building Blocks (Anabolism):</strong> The amino acids are used to build your specific proteins. The nucleotides build your DNA.</li>
                <li><strong>Fuel (Catabolism):</strong> Monomers, especially **glucose**, are broken down in a process called **Cellular Respiration**. This process releases the chemical energy stored in their bonds.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* NEW IMAGE SECTION */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Energy from Food</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/77938451e8c5c8119a4f8bcacd10377205016d67.png"
                alt="Diagram showing food biomolecules being used for biosynthesis and cellular respiration"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Monomers from food are used as building blocks (biosynthesis) or as fuel for cellular respiration to make ATP.
            </p>
          </div>

          {/* Section on ATP */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              ATP: The Cell's Energy Currency 🔋
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              The energy released from breaking down glucose isn't used directly. It's too much, too fast.
            </p>
            <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              Instead, the energy from glucose is captured and stored in small, usable packets called **ATP (Adenosine Triphosphate)**.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              ATP is the universal, rechargeable battery of the cell. It powers every process, from building proteins to moving muscles.
            </p>
          </div>
          
          {/* Bridge to Next Modules */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Connecting the Dots</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              This leads us to the two most important questions in this module:
            </p>
            <ul className="mt-4 space-y-4">
              <li className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
                <span className="font-bold text-lg text-green-700 dark:text-green-300">UP NEXT: Photosynthesis</span>
                <p className="text-lg text-slate-700 dark:text-slate-200">Where does the glucose (food) come from in the first place? How is light energy from the sun converted into chemical energy (glucose)?</p>
              </li>
              <li className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700">
                <span className="font-bold text-lg text-orange-700 dark:text-orange-300">UP NEXT: Cellular Respiration</span>
                <p className="text-lg text-slate-700 dark:text-slate-200">How do *all* cells (plant and animal) break down that glucose to capture its energy and recharge their ATP batteries?</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="food-biomolecules-energy"
      slideTitle="Food, biomolecules, and energy"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}