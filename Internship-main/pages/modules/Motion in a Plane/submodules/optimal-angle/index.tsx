import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const optimalAngleSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Range as a function of angle',
    component: Slide1,
    id: 'range-function-angle'
  },
  {
    type: 'interactive',
    title: 'Maximum Range: The 45° rule',
    component: Slide2,
    id: 'max-range-45'
  },
  {
    type: 'interactive',
    title: 'Complementary angles: Same range',
    component: Slide3,
    id: 'complementary-angles'
  },
  {
    type: 'interactive',
    title: 'Comparing trajectories: High lob vs. Low drive',
    component: Slide4,
    id: 'comparing-trajectories'
  },
  {
    type: 'interactive',
    title: 'Practice: Angle optimization problems',
    component: Slide5,
    id: 'practice-optimization'
  }
];

function OptimalAngleSubmodule() {
  return <div>This is the Optimal angle for a projectile submodule.</div>;
}

export default OptimalAngleSubmodule;