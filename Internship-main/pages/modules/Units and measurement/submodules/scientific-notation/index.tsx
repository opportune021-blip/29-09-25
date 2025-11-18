import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: specific slide components
import ScientificNotationExampleSmallSlide from './Slide1';
import ScientificNotationExamplesSlide from './Slide2';
import ScientificNotationReviewSlide from './Slide3';

export const scientificNotationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Scientific notation example: 0.0000000003457',
    component: ScientificNotationExampleSmallSlide,
    id: 'notation-example-small'
  },
  {
    type: 'interactive',
    title: 'Scientific notation examples',
    component: ScientificNotationExamplesSlide,
    id: 'notation-examples-general'
  },
  {
    type: 'interactive',
    title: 'Scientific notation review',
    component: ScientificNotationReviewSlide,
    id: 'notation-review'
  }
];

function ScientificNotationSubmodule() {
  return (
    <div>
      This is the Scientific Notation submodule component.
    </div>
  );
}

export default ScientificNotationSubmodule;