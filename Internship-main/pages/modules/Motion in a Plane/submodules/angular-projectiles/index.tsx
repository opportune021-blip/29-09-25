import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const angularProjectilesSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Components of initial velocity',
    component: Slide1,
    id: 'initial-velocity-components'
  },
  {
    type: 'interactive',
    title: 'Vertical analysis: Max Height (H) and Time (T)',
    component: Slide2,
    id: 'deriving-h-and-t'
  },
  {
    type: 'interactive',
    title: 'Horizontal analysis: Range (R)',
    component: Slide3,
    id: 'deriving-range'
  },
  {
    type: 'interactive',
    title: 'The Equation of Trajectory',
    component: Slide4,
    id: 'equation-of-trajectory'
  },
  {
    type: 'interactive',
    title: 'Practice: Ground-to-ground problems',
    component: Slide5,
    id: 'practice-angular-projectiles'
  }
];

function AngularProjectilesSubmodule() {
  return <div>This is the Projectiles launched at an angle submodule.</div>;
}

export default AngularProjectilesSubmodule;