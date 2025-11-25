import React from 'react';
import { Slide } from '../../../common-components/concept';

import CombinedOpsSlide from './Slide1';
import OpsReviewSlide from './Slide2';

export const combinedVectorOperationsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Combined vector operations',
    component: CombinedOpsSlide,
    id: 'combined-ops'
  },
  {
    type: 'quiz',
    title: 'Vector operations review',
    component: OpsReviewSlide,
    id: 'ops-review'
  }
];

function CombinedVectorOperationsSubmodule() {
  return <div>Combined Vector Operations Submodule</div>;
}

export default CombinedVectorOperationsSubmodule;