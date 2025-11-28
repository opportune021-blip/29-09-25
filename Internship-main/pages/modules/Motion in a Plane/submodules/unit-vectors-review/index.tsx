import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const unitVectorsReviewSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Introduction to i-hat and j-hat',
    component: Slide1,
    id: 'intro-ij-notation'
  },
  {
    type: 'interactive',
    title: 'Writing vectors in component form',
    component: Slide2,
    id: 'writing-vectors-component-form'
  },
  {
    type: 'interactive',
    title: 'Vector arithmetic with unit vectors',
    component: Slide3,
    id: 'vector-arithmetic-algebraic'
  },
  {
    type: 'interactive',
    title: 'Position and displacement vectors',
    component: Slide4,
    id: 'position-displacement-vectors'
  },
  {
    type: 'interactive',
    title: 'Review: Unit vector notation',
    component: Slide5,
    id: 'review-unit-vectors'
  }
];

function UnitVectorsReviewSubmodule() {
  return <div>This is the Review: Unit vectors submodule.</div>;
}

export default UnitVectorsReviewSubmodule;