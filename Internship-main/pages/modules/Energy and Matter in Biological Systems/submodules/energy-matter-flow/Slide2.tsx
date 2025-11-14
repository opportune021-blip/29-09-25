import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function EnergyFlowSlide2() {
  const { isDarkMode } = useThemeContext();

  // No interactive quiz state needed for an article slide
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
            Food Chains vs. Food Webs
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Energy flows through an ecosystem in a series of feeding relationships.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Food Chain */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">What is a Food Chain?</h2>
            <p className="text-lg leading-relaxed">
              A **food chain** shows a single, linear pathway of how energy is transferred by eating.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              The arrows point from the organism being eaten to the organism that eats it.
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Simple Example:</h3>
              <p className="text-xl font-bold text-center">
                <span className="text-green-600 dark:text-green-400">Grass</span> → 
                <span className="text-blue-600 dark:text-blue-400"> Rabbit</span> → 
                <span className="text-red-600 dark:text-red-400"> Fox</span>
              </p>
              <ul className="mt-4 text-base space-y-1">
                <li><strong>Producer:</strong> Grass (makes its own food)</li>
                <li><strong>Primary Consumer:</strong> Rabbit (eats producer)</li>
                <li><strong>Secondary Consumer:</strong> Fox (eats primary consumer)</li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              A food chain is simple, but often **too simple** to show what really happens in an ecosystem.
            </p>
          </motion.div>

          {/* Food Web */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">What is a Food Web?</h2>
            <p className="text-lg leading-relaxed">
              A **food web** is a more realistic model. It's a network of many interconnected food chains.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              It shows that most organisms eat more than one thing and are eaten by more than one thing.
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg flex justify-center items-center">
              

[Image of a simple food web]

            </div>
            <p className="text-lg leading-relaxed mt-4">
              Food webs show the **complexity and interdependence** of an ecosystem. A change in one population (like the rabbits) can affect many other organisms, including the foxes, the grass, and even organisms that eat foxes.
            </p>
          </motion.div>
        </div>

        {/* Decomposers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            The Unsung Heroes: Decomposers 🍄
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            What happens when organisms die? They are consumed by **decomposers** (like bacteria and fungi).
          </p>
          <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            Decomposers are critical because they break down dead organic material and waste products, returning essential **nutrients** (like nitrogen and carbon) back to the soil.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            This recycling of **matter** is what allows producers to grow and start the food chain all over again. While energy flows, matter *cycles*.
          </p>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="food-chains-and-webs"
      slideTitle="Food chains and food webs"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="energy-matter-flow"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}