import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide4() {
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
            Photosynthesis and the Environment 🌍
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            This single process is the foundation for nearly all ecosystems on Earth.
          </p>
        </motion.div>

        {/* Section 1: The Base of Food Chains */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">The Planet's "Producers"</h2>
          <p className="text-lg leading-relaxed">
            Organisms that perform photosynthesis, like plants, are called **autotrophs** or **producers**. They are the only organisms that can create their own food (glucose) from inorganic sources.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            All other organisms, including humans, are **heterotrophs** or **consumers**. We must get our energy by eating other organisms.
          </p>
          <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
            <li>A cow (herbivore) eats grass, getting energy that the grass made through photosynthesis.</li>
            <li>A human (omnivore) eats a salad (producer) or a steak (consumer that ate a producer).</li>
            <li>This flow of energy, which begins with photosynthesis, is the basis for all **food webs**.</li>
          </ul>
        </motion.div>

        {/* Section 2: Shaping the Atmosphere */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Making the Air We Breathe</h2>
          <p className="text-lg leading-relaxed">
            Photosynthesis also plays two critical roles in regulating Earth's atmosphere:
          </p>
          <ul className="mt-4 space-y-3 text-lg">
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold text-lg">1. Oxygen Production:</span> The **oxygen (O₂)** released as a byproduct is essential for **aerobic respiration**—the process most living things, including us, use to get energy from food.
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <span className="font-bold text-lg">2. Carbon Sequestration:</span> By taking **carbon dioxide (CO₂)** out of the atmosphere, photosynthesis helps regulate the climate. CO₂ is a greenhouse gas, and plants act as a massive "carbon sink."
            </li>
          </ul>
        </motion.div>
        
        {/* Image - Carbon Cycle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">A Global Impact</h3>
          <div className="flex justify-center">
            

[Image of simple global carbon cycle]

          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
            Photosynthesis (by plants) and respiration (by animals and plants) are key parts of the global carbon cycle, moving carbon between the atmosphere and living organisms.
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="photosynthesis-and-environment"
      slideTitle="Photosynthesis and the environment"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}