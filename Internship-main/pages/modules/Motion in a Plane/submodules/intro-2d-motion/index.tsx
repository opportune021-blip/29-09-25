import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
// You will need to create these Slide files (Slide1.tsx to Slide5.tsx) in the same folder
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const introTo2DMotionSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is 2D motion?',
    component: Slide1,
    id: 'what-is-2d-motion'
  },
  {
    type: 'interactive',
    title: 'Position vectors',
    component: Slide2,
    id: 'position-vectors'
  },
  {
    type: 'interactive',
    title: 'The principle of independence',
    component: Slide3,
    id: 'principle-of-independence'
  },
  {
    type: 'interactive',
    title: 'Displacement in a plane',
    component: Slide4,
    id: 'displacement-in-a-plane'
  },
  {
    type: 'interactive',
    title: 'Review: 2D motion concepts',
    component: Slide5,
    id: 'review-2d-motion'
  }
];

function IntroTo2DMotionSubmodule() {
  return <div>This is the Introduction to vectors and two-dimensional motion submodule.</div>;
}

export default IntroTo2DMotionSubmodule;