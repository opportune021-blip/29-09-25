import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export const freefallSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Projectile displacement and velocity',
    component: Slide1,
    id: 'projectile-displacement'
  },
  {
    type: 'interactive',
    title: 'Projectile height given time',
    component: Slide2,
    id: 'projectile-height'
  },
  {
    type: 'interactive',
    title: 'Impact velocity from height',
    component: Slide3,
    id: 'impact-velocity'
  },
  {
    type: 'interactive',
    title: 'Freefall review',
    component: Slide4,
    id: 'freefall-review'
  }
];

function FreefallSubmodule() {
  return <div>This is the Freefall submodule.</div>;
}

export default FreefallSubmodule;
