import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const velocityFromGraphsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Instantaneous speed and velocity',
    component: Slide1,
    id: 'instantaneous-speed-velocity'
  },
  {
    type: 'interactive',
    title: 'What is velocity?',
    component: Slide2,
    id: 'what-is-velocity'
  },
  {
    type: 'interactive',
    title: 'Position vs time graphs',
    component: Slide3,
    id: 'position-vs-time'
  },
  {
    type: 'interactive',
    title: 'Why distance is area under velocity-time line',
    component: Slide4,
    id: 'distance-under-velocity-graph'
  },
  {
    type: 'interactive',
    title: 'Instantaneous speed and velocity review',
    component: Slide5,
    id: 'velocity-graphs-review'
  }
];

function VelocityFromGraphsSubmodule() {
  return <div>This is the Velocity & Speed from Graphs submodule.</div>;
}

export default VelocityFromGraphsSubmodule;
