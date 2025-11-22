import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

export const relativeVelocitySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Relative velocity basics',
    component: Slide1,
    id: 'relative-velocity-basics'
  },
  {
    type: 'interactive',
    title: 'Calculating relative velocity',
    component: Slide2,
    id: 'calc-relative-velocity'
  },
  {
    type: 'interactive',
    title: 'Relative velocity review',
    component: Slide3,
    id: 'relative-velocity-review'
  }
];

function RelativeVelocitySubmodule() {
  return <div>This is the Relative Velocity in 1D submodule.</div>;
}

export default RelativeVelocitySubmodule;
