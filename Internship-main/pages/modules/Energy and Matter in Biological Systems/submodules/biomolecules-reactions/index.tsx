import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: Create these component files (Slide1.tsx, Slide2.tsx, etc.)
import BiomoleculesSlide1 from './Slide1';
import BiomoleculesSlide2 from './Slide2';
import BiomoleculesSlide3 from './Slide3';
import BiomoleculesSlide4 from './Slide4';
import BiomoleculesSlide5 from './Slide5';
import BiomoleculesSlide6 from './Slide6';
import BiomoleculesSlide7 from './Slide7';
import BiomoleculesSlide8 from './Slide8';

export const biomoleculesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Formation of biomolecules',
    component: BiomoleculesSlide1,
    id: 'formation-of-biomolecules'
  },
  {
    type: 'interactive',
    title: 'Introduction to carbohydrates',
    component: BiomoleculesSlide2,
    id: 'introduction-to-carbohydrates'
  },
  {
    type: 'interactive',
    title: 'Introduction to proteins and amino acids',
    component: BiomoleculesSlide3,
    id: 'introduction-to-proteins'
  },
  {
    type: 'interactive',
    title: 'Introduction to nucleic acids and nucleotides',
    component: BiomoleculesSlide4,
    id: 'introduction-to-nucleic-acids'
  },
  {
    type: 'interactive',
    title: 'Introduction to lipids',
    component: BiomoleculesSlide5,
    id: 'introduction-to-lipids'
  },
  {
    type: 'interactive',
    title: 'Types of biomolecules',
    component: BiomoleculesSlide6,
    id: 'types-of-biomolecules'
  },
  {
    type: 'interactive',
    title: 'Biomolecules and reactions',
    component: BiomoleculesSlide7,
    id: 'biomolecules-and-reactions'
  },
  {
    type: 'interactive',
    title: 'Food, biomolecules, and energy',
    component: BiomoleculesSlide8,
    id: 'food-biomolecules-energy'
  }
];

function BiomoleculesReactionsComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default BiomoleculesReactionsComponent;