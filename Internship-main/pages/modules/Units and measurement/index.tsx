import React from 'react';
import { Slide } from '../common-components/concept';

// Imports for the Submodule content
// Note: Ensure these files exist in your 'submodules' folder or comment them out until created
import { physicalQuantitiesSlides } from './submodules/physical-quantities';
import { scientificNotationSlides } from './submodules/scientific-notation';
import { significantFiguresSlides } from './submodules/significant-figures';

// Define the interface for a submodule
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define all the submodules for the Units and Measurement module
export const submodules: Submodule[] = [
  {
    id: 'physical-quantities-and-measurement',
    title: 'Physical quantities and their measurement',
    description: 'Explore the vast scales of the universe, from the size of atoms to stars, and learn how we measure distances using methods like Parallax.',
    slides: physicalQuantitiesSlides,
    estimatedTime: '35 min',
    difficulty: 'Beginner',
    topics: ['Parallax', 'Angular Measure', 'Macro & Micro Scales', 'Measurement']
  },
  {
    id: 'scientific-notation',
    title: 'Scientific notation',
    description: 'Learn the standard language of science for handling extremely large and incredibly small numbers efficiently using powers of ten.',
    slides: scientificNotationSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Powers of 10', 'Standard Form', 'Exponents']
  },
  {
    id: 'significant-figures',
    title: 'Significant figures',
    description: 'Master the rules of precision. Learn how to report measurements accurately and handle significant digits in calculations.',
    slides: significantFiguresSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Precision', 'Rounding', 'Error Analysis', 'Arithmetic Rules']
  }
];

// Main component for the module
function UnitsAndMeasurementModule() {
  return (
    <div>
      {/* The framework will render the submodules based on the 'submodules' export above. */}
    </div>
  );
}

export default UnitsAndMeasurementModule;