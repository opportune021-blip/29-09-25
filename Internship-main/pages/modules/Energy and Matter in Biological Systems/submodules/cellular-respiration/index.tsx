import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: Create these component files
import CellularRespirationSlide1 from './Slide1';
import CellularRespirationSlide2 from './Slide2';
import CellularRespirationSlide3 from './Slide3';

export const cellularRespirationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Cellular respiration',
    component: CellularRespirationSlide1,
    id: 'cellular-respiration-video'
  },
  {
    type: 'interactive',
    title: 'An introduction to cellular respiration',
    component: CellularRespirationSlide2,
    id: 'intro-to-cellular-respiration'
  },
  {
    type: 'interactive',
    title: 'Anaerobic respiration and fermentation',
    component: CellularRespirationSlide3,
    id: 'anaerobic-respiration-fermentation'
  }
];

function CellularRespirationComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default CellularRespirationComponent;