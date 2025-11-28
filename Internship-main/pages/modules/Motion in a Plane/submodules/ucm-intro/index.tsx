import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const ucmIntroSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Defining Uniform Circular Motion (UCM)',
    component: Slide1,
    id: 'defining-ucm'
  },
  {
    type: 'interactive',
    title: 'Angular displacement (θ) and velocity (ω)',
    component: Slide2,
    id: 'angular-variables'
  },
  {
    type: 'interactive',
    title: 'Period (T) and Frequency (f)',
    component: Slide3,
    id: 'period-frequency'
  },
  {
    type: 'interactive',
    title: 'Relating linear and angular velocity (v = rω)',
    component: Slide4,
    id: 'relating-v-omega'
  },
  {
    type: 'interactive',
    title: 'Practice: Angular motion calculations',
    component: Slide5,
    id: 'practice-angular-motion'
  }
];

function UcmIntroSubmodule() {
  return <div>This is the Uniform circular motion introduction submodule.</div>;
}

export default UcmIntroSubmodule;