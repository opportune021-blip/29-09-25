import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: Create these component files
import BiogeochemicalCyclesSlide1 from './Slide1';
import BiogeochemicalCyclesSlide2 from './Slide2';
import BiogeochemicalCyclesSlide3 from './Slide3';
import BiogeochemicalCyclesSlide4 from './Slide4';
import BiogeochemicalCyclesSlide5 from './Slide5';

export const biogeochemicalCyclesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The carbon cycle',
    component: BiogeochemicalCyclesSlide1,
    id: 'carbon-cycle-video'
  },
  {
    type: 'interactive',
    title: 'The carbon cycle',
    component: BiogeochemicalCyclesSlide2,
    id: 'carbon-cycle-article'
  },
  {
    type: 'interactive',
    title: 'The nitrogen cycle',
    component: BiogeochemicalCyclesSlide3,
    id: 'nitrogen-cycle-video'
  },
  {
    type: 'interactive',
    title: 'The nitrogen cycle',
    component: BiogeochemicalCyclesSlide4,
    id: 'nitrogen-cycle-article'
  },
  {
    type: 'interactive',
    title: 'Human impacts on biogeochemical cycles',
    component: BiogeochemicalCyclesSlide5,
    id: 'human-impacts-on-cycles'
  }
];

function BiogeochemicalCyclesComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default BiogeochemicalCyclesComponent;