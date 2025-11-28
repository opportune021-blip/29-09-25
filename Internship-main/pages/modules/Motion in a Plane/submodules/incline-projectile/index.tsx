import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const inclineProjectileSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Rotating the coordinate axes',
    component: Slide1,
    id: 'rotating-axes'
  },
  {
    type: 'interactive',
    title: 'Resolving gravity components (g-parallel, g-perpendicular)',
    component: Slide2,
    id: 'resolving-gravity'
  },
  {
    type: 'interactive',
    title: 'Time of flight on an inclined plane',
    component: Slide3,
    id: 'time-of-flight-incline'
  },
  {
    type: 'interactive',
    title: 'Range on an inclined plane',
    component: Slide4,
    id: 'range-incline'
  },
  {
    type: 'interactive',
    title: 'Practice: Up vs. Down the incline',
    component: Slide5,
    id: 'practice-up-down-incline'
  }
];

function InclineProjectileSubmodule() {
  return <div>This is the Projectile on an incline submodule.</div>;
}

export default InclineProjectileSubmodule;