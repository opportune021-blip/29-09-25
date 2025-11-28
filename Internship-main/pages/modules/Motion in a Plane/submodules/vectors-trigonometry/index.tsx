import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const vectorsTrigonometrySlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Visualizing vector components',
    component: Slide1,
    id: 'visualizing-components'
  },
  {
    type: 'interactive',
    title: 'Trigonometry review: SOH CAH TOA',
    component: Slide2,
    id: 'trig-review'
  },
  {
    type: 'interactive',
    title: 'Resolving vectors into X and Y',
    component: Slide3,
    id: 'resolving-vectors'
  },
  {
    type: 'interactive',
    title: 'Finding magnitude and direction from components',
    component: Slide4,
    id: 'finding-mag-dir'
  },
  {
    type: 'interactive',
    title: 'Practice: Vector decomposition',
    component: Slide5,
    id: 'practice-vector-decomposition'
  }
];

function VectorsTrigonometrySubmodule() {
  return <div>This is the Analyzing vectors using trigonometry submodule.</div>;
}

export default VectorsTrigonometrySubmodule;