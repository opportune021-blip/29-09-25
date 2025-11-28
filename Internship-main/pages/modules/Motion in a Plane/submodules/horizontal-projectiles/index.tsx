import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const horizontalProjectilesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'The "Cliff Problem": Initial conditions',
    component: Slide1,
    id: 'cliff-problem-setup'
  },
  {
    type: 'interactive',
    title: 'Time of flight: Dependent on height only',
    component: Slide2,
    id: 'time-of-flight-height'
  },
  {
    type: 'interactive',
    title: 'Horizontal range calculations',
    component: Slide3,
    id: 'horizontal-range'
  },
  {
    type: 'interactive',
    title: 'Velocity at any instant',
    component: Slide4,
    id: 'instantaneous-velocity'
  },
  {
    type: 'interactive',
    title: 'Review: Horizontal projectile practice',
    component: Slide5,
    id: 'review-horizontal-projectile'
  }
];

function HorizontalProjectilesSubmodule() {
  return <div>This is the Horizontally launched projectiles submodule.</div>;
}

export default HorizontalProjectilesSubmodule;