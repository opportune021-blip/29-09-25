import React from 'react';
import { Slide } from '../../../common-components/concept';

import AddMagDirSlide1 from './Slide1';
import AddMagDirSlide2 from './Slide2';
import AddMagReviewSlide from './Slide3';

export const addingVectorsMagDirSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Adding vectors in magnitude & direction form (1 of 2)',
    component: AddMagDirSlide1,
    id: 'add-mag-dir-1'
  },
  {
    type: 'interactive',
    title: 'Adding vectors in magnitude & direction form (2 of 2)',
    component: AddMagDirSlide2,
    id: 'add-mag-dir-2'
  },
  {
    type: 'interactive',
    title: 'Vector addition & magnitude',
    component: AddMagReviewSlide,
    id: 'add-mag-review'
  }
];

function AddingVectorsMagDirSubmodule() {
  return <div>Adding Vectors in Mag & Dir Submodule</div>;
}

export default AddingVectorsMagDirSubmodule;