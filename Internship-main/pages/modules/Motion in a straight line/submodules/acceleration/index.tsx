import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const accelerationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is acceleration?',
    component: Slide1,
    id: 'what-is-acceleration'
  },
  {
    type: 'interactive',
    title: 'Airbus A380 take-off time',
    component: Slide2,
    id: 'a380-takeoff-time'
  },
  {
    type: 'interactive',
    title: 'Velocity vs time graphs',
    component: Slide3,
    id: 'velocity-vs-time'
  },
  {
    type: 'interactive',
    title: 'Acceleration vs time graphs',
    component: Slide4,
    id: 'acceleration-vs-time'
  },
  {
    type: 'interactive',
    title: 'Acceleration review',
    component: Slide5,
    id: 'acceleration-review'
  }
];

function AccelerationSubmodule() {
  return <div>This is the Acceleration submodule.</div>;
}

export default AccelerationSubmodule;
