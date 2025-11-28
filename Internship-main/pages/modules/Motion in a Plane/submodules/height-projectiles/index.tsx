import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const heightProjectilesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Why standard formulas fail here',
    component: Slide1,
    id: 'limitations-of-formulas'
  },
  {
    type: 'interactive',
    title: 'Case 1: Launching at an angle of elevation',
    component: Slide2,
    id: 'launch-elevation'
  },
  {
    type: 'interactive',
    title: 'Case 2: Launching at an angle of depression',
    component: Slide3,
    id: 'launch-depression'
  },
  {
    type: 'interactive',
    title: 'Calculating final impact velocity',
    component: Slide4,
    id: 'impact-velocity'
  },
  {
    type: 'interactive',
    title: 'Practice: The "Tower" problems',
    component: Slide5,
    id: 'practice-tower-problems'
  }
];

function HeightProjectilesSubmodule() {
  return <div>This is the Projectiles launched from/to a height submodule.</div>;
}

export default HeightProjectilesSubmodule;