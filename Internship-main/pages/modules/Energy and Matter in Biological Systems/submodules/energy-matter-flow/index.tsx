import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: Create these component files
import EnergyFlowSlide1 from './Slide1';
import EnergyFlowSlide2 from './Slide2';
import EnergyFlowSlide3 from './Slide3';
import EnergyFlowSlide4 from './Slide4';

export const energyFlowSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Flow of energy and matter through ecosystems',
    component: EnergyFlowSlide1,
    id: 'flow-of-energy-and-matter'
  },
  {
    type: 'interactive',
    title: 'Food chains and food webs',
    component: EnergyFlowSlide2,
    id: 'food-chains-and-webs'
  },
  {
    type: 'interactive',
    title: 'Impact of changes to trophic pyramids',
    component: EnergyFlowSlide3,
    id: 'impact-on-trophic-pyramids'
  },
  {
    type: 'interactive',
    title: 'Trophic levels and energy loss',
    component: EnergyFlowSlide4,
    id: 'trophic-levels-energy-loss'
  }
];

function EnergyMatterFlowComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default EnergyMatterFlowComponent;