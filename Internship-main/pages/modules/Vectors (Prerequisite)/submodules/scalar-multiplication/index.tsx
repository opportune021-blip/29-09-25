import React from 'react';
import { Slide } from '../../../common-components/concept';

import ScalarMultComponentSlide from './Slide1';
import ScalarMultMagDirSlide from './Slide2';

export const scalarMultiplicationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Scalar multiplication: component form',
    component: ScalarMultComponentSlide,
    id: 'scalar-mult-component'
  },
  {
    type: 'interactive',
    title: 'Scalar multiplication: magnitude and direction',
    component: ScalarMultMagDirSlide,
    id: 'scalar-mult-mag-dir'
  }
];

function ScalarMultiplicationSubmodule() {
  return <div>Scalar Multiplication Submodule</div>;
}

export default ScalarMultiplicationSubmodule;