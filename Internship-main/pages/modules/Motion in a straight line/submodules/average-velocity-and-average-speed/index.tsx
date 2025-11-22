import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const averageVelocitySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intro to vectors and scalars',
    component: Slide1,
    id: 'intro-vectors-scalars'
  },
  {
    type: 'interactive',
    title: 'Calculating average velocity or speed',
    component: Slide2,
    id: 'calc-average-velocity'
  },
  {
    type: 'interactive',
    title: 'Average velocity and speed worked example',
    component: Slide3,
    id: 'avg-velocity-example'
  },
  {
    type: 'interactive',
    title: 'Displacement from time and velocity example',
    component: Slide4,
    id: 'displacement-velocity-example'
  },
  {
    type: 'interactive',
    title: 'Average velocity and speed review',
    component: Slide5,
    id: 'avg-velocity-review'
  }
];

function AverageVelocitySubmodule() {
  return <div>This is the Average Velocity & Speed submodule.</div>;
}

export default AverageVelocitySubmodule;
