import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

export const rectilinearMotionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Motion problems with integrals',
    component: Slide1,
    id: 'motion-integrals'
  },
  {
    type: 'interactive',
    title: 'Worked example: velocity to displacement',
    component: Slide2,
    id: 'velocity-to-displacement'
  },
  {
    type: 'interactive',
    title: 'Rectilinear motion integral review',
    component: Slide3,
    id: 'rectilinear-motion-review'
  }
];

function RectilinearMotionSubmodule() {
  return <div>This is the Rectilinear Motion (Integral Calculus) submodule.</div>;
}

export default RectilinearMotionSubmodule;
