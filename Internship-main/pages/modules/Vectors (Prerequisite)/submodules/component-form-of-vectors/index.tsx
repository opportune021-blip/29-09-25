import React from 'react';
import { Slide } from '../../../common-components/concept';

import CompFromMagDirSlide from './Slide1';
import CompFromMagDirAdvSlide from './Slide2';
import ConvertReviewSlide from './Slide3';

export const componentFormSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vector components from magnitude & direction',
    component: CompFromMagDirSlide,
    id: 'comp-from-mag-dir'
  },
  {
    type: 'interactive',
    title: 'Vector components from magnitude & direction (advanced)',
    component: CompFromMagDirAdvSlide,
    id: 'comp-from-mag-dir-adv'
  },
  {
    type: 'interactive',
    title: 'Converting between vector components and magnitude & direction review',
    component: ConvertReviewSlide,
    id: 'convert-review'
  }
];

function ComponentFormSubmodule() {
  return <div>Component Form Submodule</div>;
}

export default ComponentFormSubmodule;