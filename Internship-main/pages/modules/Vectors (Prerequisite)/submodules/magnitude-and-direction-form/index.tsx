import React from 'react';
import { Slide } from '../../../common-components/concept';

import DirFromComp12Slide from './Slide1';
import DirFromComp34Slide from './Slide2';
import VectorFormsReviewSlide from './Slide3';

export const magnitudeDirectionFormSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Direction of vectors from components: 1st & 2nd quadrants',
    component: DirFromComp12Slide,
    id: 'dir-from-comp-1-2'
  },
  {
    type: 'interactive',
    title: 'Direction of vectors from components: 3rd & 4th quadrants',
    component: DirFromComp34Slide,
    id: 'dir-from-comp-3-4'
  },
  {
    type: 'quiz',
    title: 'Vector forms review',
    component: VectorFormsReviewSlide,
    id: 'vector-forms-review'
  }
];

function MagnitudeDirectionFormSubmodule() {
  return <div>Magnitude and Direction Form Submodule</div>;
}

export default MagnitudeDirectionFormSubmodule;