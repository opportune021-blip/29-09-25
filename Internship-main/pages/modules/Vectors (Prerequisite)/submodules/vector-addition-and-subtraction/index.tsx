import React from 'react';
import { Slide } from '../../../common-components/concept';

import AddSubtractVectorsSlide from './Slide1';
import AddSubtractEndToEndSlide from './Slide2';
import SubtractEndToEndSlide from './Slide3';
import AddAlgGraphicalSlide from './Slide4';

export const vectorAdditionSubtractionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Adding & subtracting vectors',
    component: AddSubtractVectorsSlide,
    id: 'add-sub-vectors'
  },
  {
    type: 'interactive',
    title: 'Adding & subtracting vectors end-to-end',
    component: AddSubtractEndToEndSlide,
    id: 'add-sub-end-to-end'
  },
  {
    type: 'interactive',
    title: 'Subtracting vectors end-to-end',
    component: SubtractEndToEndSlide,
    id: 'sub-end-to-end'
  },
  {
    type: 'interactive',
    title: 'Adding vectors algebraically & graphically',
    component: AddAlgGraphicalSlide,
    id: 'add-alg-graph'
  }
];

function VectorAdditionSubtractionSubmodule() {
  return <div>Vector Addition and Subtraction Submodule</div>;
}

export default VectorAdditionSubtractionSubmodule;