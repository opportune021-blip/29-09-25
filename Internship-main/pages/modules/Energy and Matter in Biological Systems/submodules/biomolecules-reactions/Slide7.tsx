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
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Header (adjusted for left column) */}
          <div className="text-left">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Biomolecules & Metabolism
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              The sum of all chemical reactions in an organism is called metabolism.
            </p>
          </div>

          {/* Anabolism Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">1. Anabolism: Building Up</h2>
            <p className="text-lg leading-relaxed">
              Anabolic reactions build complex molecules from simpler ones. This process requires energy.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Key Process:</strong> Dehydration Synthesis.</li>
              <li><strong>Example:</strong> Joining amino acids to build a protein (muscle growth).</li>
              <li><strong>Energy:</strong> It is endergonic (consumes energy).</li>
              <li><strong>Analogy:</strong> Building a complex Lego model from individual bricks.</li>
            </ul>
          </div>

          {/* Catabolism Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">2. Catabolism: Breaking Down</h2>
            <p className="text-lg leading-relaxed">
              Catabolic reactions break down complex molecules into simpler ones. This process releases energy.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Key Process:</strong> Hydrolysis.</li>
              <li><strong>Example:</strong> Breaking down a starch (polysaccharide) into glucose (monosaccharide).</li>
              <li><strong>Energy:</strong> It is exergonic (releases energy).</li>
              <li><strong>Analogy:</strong> Breaking a Lego model apart into its individual bricks.</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* New Image at Top Right */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Metabolic Processes</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/8458aae8426f6f42576373432e868d3cf124c918.png"
                alt="Diagram illustrating anabolism and catabolism in metabolism"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Anabolism (building up) consumes energy, while catabolism (breaking down) releases energy.
            </p>
          </div>

          {/* Section on Enzymes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              The Role of Enzymes 🔑
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              These metabolic reactions would happen far too slowly on their own to support life. They need a helper.
            </p>
            <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              Enzymes are (almost always) proteins that act as biological catalysts. They dramatically speed up chemical reactions without being consumed in the process.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li>Enzymes are highly specific; each enzyme typically works on only one molecule (its substrate).</li>
              <li>They work by lowering the activation energy the "startup cost" needed to get a reaction going.</li>
              <li>The substrate fits into a specific part of the enzyme called the active site.</li>
              <li>Every major metabolic process, like photosynthesis and cellular respiration, is controlled by a series of enzymes.</li>
            </ul>
          </div>

          {/* Image - Enzyme Action (moved here) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">How Enzymes Work: Lock and Key</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/0246b11cf6817ed99ab8549412b35cec6057cc8f.png"
                alt="Diagram showing enzyme action (induced fit model)"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The substrate binds to the enzyme's active site. The enzyme changes shape slightly (induced fit), the reaction occurs, and the products are released. The enzyme is then free to work again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="biomolecules-and-reactions"
      slideTitle="Biomolecules and reactions"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}