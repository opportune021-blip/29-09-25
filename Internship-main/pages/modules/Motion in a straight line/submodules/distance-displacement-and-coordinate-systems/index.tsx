import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';

export const distanceDisplacementSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Distance and displacement introduction',
    component: Slide1,
    id: 'distance-displacement-intro'
  },
  {
    type: 'interactive',
    title: 'Distance and displacement in one dimension',
    component: Slide2,
    id: 'distance-displacement-1d'
  },
  {
    type: 'interactive',
    title: 'Position-time graphs',
    component: Slide3,
    id: 'position-time-graphs'
  },
  {
    type: 'interactive',
    title: 'Worked example: distance and displacement from graphs',
    component: Slide4,
    id: 'worked-example-distance-displacement'
  },
  {
    type: 'interactive',
    title: 'Distance and displacement properties',
    component: Slide5,
    id: 'distance-displacement-properties'
  },
  {
    type: 'interactive',
    title: 'Distance and displacement review',
    component: Slide6,
    id: 'distance-displacement-review'
  }
];

function DistanceDisplacementSubmodule() {
  return <div>This is the Distance & Displacement submodule.</div>;
}

export default DistanceDisplacementSubmodule;
