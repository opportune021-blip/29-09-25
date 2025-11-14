import React from 'react';
import { motion } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide6() {
  const { isDarkMode } = useThemeContext();

  // No interactive quiz state needed for an article slide
  // We pass an empty interactions object to the wrapper
  const localInteractions: Record<string, InteractionResponse> = {};

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Summary: The Four Types of Biomolecules
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            A quick comparison of the building blocks of life.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Biomolecule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Monomer (Building Block)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Polymer (Example)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Key Functions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700 text-lg">
                <tr>
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">Carbohydrates</td>
                  <td className="px-6 py-4">Monosaccharide</td>
                  <td className="px-6 py-4">Polysaccharide (Starch, Glycogen)</td>
                  <td className="px-6 py-4">Short-term energy, structure (Cellulose)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">Lipids</td>
                  <td className="px-6 py-4">Glycerol & Fatty Acids (common)</td>
                  <td className="px-6 py-4">Triglyceride (Fats)</td>
                  <td className="px-6 py-4">Long-term energy storage, insulation, cell membranes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">Proteins</td>
                  <td className="px-6 py-4">Amino Acid</td>
                  <td className="px-6 py-4">Polypeptide (Protein)</td>
                  <td className="px-6 py-4">Enzymes, structure (muscle, hair), transport, defense</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">Nucleic Acids</td>
                  <td className="px-6 py-4">Nucleotide</td>
                  <td className="px-6 py-4">Polynucleotide (DNA, RNA)</td>
                  <td className="px-6 py-4">Store & transmit genetic info, energy currency (ATP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Detailed Summary Cards */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The "Why" Behind Each Molecule</h2>
            <p className="text-lg leading-relaxed">
              Think of a cell as a complex factory:
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Carbohydrates</strong> are the <strong>"fast fuel"</strong> and raw materials. They provide the immediate energy to keep the factory machines running.</li>
              <li><strong>Lipids</strong> are the <strong>"energy reserves"</strong> and factory walls. They store massive amounts of backup power and form the protective barriers (cell membranes) that separate the inside from the outside.</li>
              <li><strong>Proteins</strong> are the <strong>"machines and workers"</strong>. They do almost all the jobs: building structures, speeding up reactions (enzymes), and transporting materials.</li>
              <li><strong>Nucleic Acids</strong> are the <strong>"blueprints and managers"</strong>. DNA is the master plan in the head office, and RNA is the set of instructions sent to the factory floor to build the specific protein machines.</li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="types-of-biomolecules"
      slideTitle="Types of biomolecules"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions} // Pass empty object for a non-interactive slide
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}