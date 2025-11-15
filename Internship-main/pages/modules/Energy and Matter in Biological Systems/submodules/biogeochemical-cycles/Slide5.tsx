import React from 'react';
// import { motion } from 'framer-motion'; // Removed framer-motion
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide5() {
  const { isDarkMode } = useThemeContext();

  // No interactive quiz state needed for an article slide
  const localInteractions: Record<string, InteractionResponse> = {};

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- FULL SLIDE TWO-COLUMN LAYOUT --- */}
      <div className=" mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* --- LEFT COLUMN --- */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Human Impacts on Biogeochemical Cycles
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Natural cycles have a balanced budget. Human activities have been disrupting this balance, with major consequences.
              </p>
            </div>

            {/* Section 1: Carbon Cycle */}
            <div
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">Disrupting the Carbon Cycle</h2>
              <p className="text-lg leading-relaxed">
                The main human impact is the massive release of carbon dioxide (CO₂) into the atmosphere.
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li>
                  <strong>Combustion of Fossil Fuels:</strong> Burning coal, oil, and gas for energy releases carbon that has been locked in the geosphere for millions of years, overwhelming the natural cycle.
                </li>
                <li>
                  <strong>Deforestation:</strong> Cutting down forests removes producers that are vital for absorbing CO₂ from the atmosphere via photosynthesis.
                </li>
              </ul>
              <p className="text-xl leading-relaxed font-semibold p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg mt-4">
                Consequence: This excess CO₂ is a greenhouse gas, which traps heat and is the primary driver of global climate change.
              </p>
            </div>
            
          </div>
          {/* --- END OF LEFT COLUMN --- */}


          {/* --- RIGHT COLUMN --- */}
          
          <div className="w-full md:w-1/2 space-y-8">

  <div
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Eutrophication (Algal Bloom)</h3>
              <div className="flex justify-center">
                <img
                  src="https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/3960/2019/01/14192128/Picture-1.png"
                  alt="A diagram illustrating eutrophication or an algal bloom"
                  className="rounded-xl shadow-lg w-full h-auto max-w-2xl"
                />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                Fertilizer runoff leads to algal blooms, which choke off oxygen for aquatic life.
              </p>
            </div>

            {/* Section 2: Nitrogen Cycle */}
            <div
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">Disrupting the Nitrogen Cycle</h2>
              <p className="text-lg leading-relaxed">
                The main human impact comes from artificial fertilizers. Humans have learned to "fix" nitrogen (like bacteria do) to create fertilizers that boost crop growth.
              </p>
              <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
                <li>
                  <strong>Fertilizer Runoff:</strong> Excess nitrogen fertilizer washes off fields into rivers, lakes, and oceans.
                </li>
              </ul>
              <p className="text-xl leading-relaxed font-semibold p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg mt-4">
                Consequence: This nitrogen overload in water causes eutrophication. The excess nutrients fuel a massive "bloom" of algae. When the algae die, decomposers consume all the oxygen in the water, creating "dead zones" where fish and other aquatic organisms cannot survive.
              </p>
            </div>
            
            {/* Image - Eutrophication */}
           {/*  <div
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Eutrophication (Algal Bloom)</h3>
              <div className="flex justify-center">
                <img
                  src="https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/3960/2019/01/14192128/Picture-1.png"
                  alt="A diagram illustrating eutrophication or an algal bloom"
                  className="rounded-xl shadow-lg w-full h-auto max-w-2xl"
                />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                Fertilizer runoff leads to algal blooms, which choke off oxygen for aquatic life.
              </p>
            </div> */}

          </div>
          {/* --- END OF RIGHT COLUMN --- */}
          
        </div>
      </div>
      {/* --- END OF FULL SLIDE TWO-COLUMN LAYOUT --- */}
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="human-impacts-on-cycles"
      slideTitle="Human impacts on biogeochemical cycles"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}