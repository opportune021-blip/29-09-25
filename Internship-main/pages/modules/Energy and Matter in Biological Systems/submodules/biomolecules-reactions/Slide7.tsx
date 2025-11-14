import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide7() {
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
            Biomolecules and Reactions: Metabolism
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Biomolecules are constantly being built up and broken down. This sum of all chemical reactions in an organism is called **metabolism**.
          </p>
        </motion.div>

        {/* Main Content - Anabolism and Catabolism */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">1. Anabolism: Building Up</h2>
            <p className="text-lg leading-relaxed">
              **Anabolic reactions** build complex molecules from simpler ones. This process requires energy.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Key Process:</strong> Dehydration Synthesis (which you saw in Slide 1).</li>
              <li><strong>Example:</strong> Joining amino acids to build a protein (muscle growth).</li>
              <li><strong>Energy:</strong> It is **endergonic** (consumes energy).</li>
              <li><strong>Analogy:</strong> Building a complex Lego model from individual bricks.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">2. Catabolism: Breaking Down</h2>
            <p className="text-lg leading-relaxed">
              **Catabolic reactions** break down complex molecules into simpler ones. This process releases energy.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Key Process:</strong> Hydrolysis (which you also saw in Slide 1).</li>
              <li><strong>Example:</strong> Breaking down a starch (polysaccharide) into glucose (monosaccharide) during digestion.</li>
              <li><strong>Energy:</strong> It is **exergonic** (releases energy).</li>
              <li><strong>Analogy:</strong> Breaking a Lego model apart into its individual bricks.</li>
            </ul>
          </motion.div>
        </div>

        {/* Section on Enzymes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            The Role of Enzymes 🔑
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            These metabolic reactions (both anabolic and catabolic) would happen far too slowly on their own to support life. They need a helper.
          </p>
          <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            **Enzymes** are (almost always) proteins that act as biological **catalysts**. They dramatically speed up chemical reactions without being consumed in the process.
          </p>
          <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
            <li>Enzymes are highly **specific**; each enzyme typically works on only one molecule (its **substrate**).</li>
            <li>They work by lowering the **activation energy**—the "startup cost" needed to get a reaction going.</li>
            <li>The substrate fits into a specific part of the enzyme called the **active site**.</li>
            <li>Every major metabolic process, like photosynthesis and cellular respiration, is controlled by a series of enzymes.</li>
          </ul>
        </motion.div>
        
        {/* Image - Enzyme Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">How Enzymes Work: Lock and Key</h3>
          <div className="flex justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Induced_fit_diagram.png"
              alt="Diagram showing enzyme action (induced fit model)"
              className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
              style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
            The substrate binds to the enzyme's active site. The enzyme changes shape slightly (induced fit), the reaction occurs, and the products are released. The enzyme is then free to work again.
          </p>
        </motion.div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="biomolecules-and-reactions"
      slideTitle="Biomolecules and reactions"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}