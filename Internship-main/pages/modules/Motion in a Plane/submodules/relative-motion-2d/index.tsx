import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const relativeMotion2DSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Relative velocity in 2D: The formula',
    component: Slide1,
    id: 'relative-velocity-formula'
  },
  {
    type: 'interactive',
    title: 'The "Rain-Man" problem concept',
    component: Slide2,
    id: 'rain-man-concept'
  },
  {
    type: 'interactive',
    title: 'Solving for the umbrella angle',
    component: Slide3,
    id: 'umbrella-angle'
  },
  {
    type: 'interactive',
    title: 'River-Boat: Shortest path vs. Minimum time',
    component: Slide4,
    id: 'river-boat-cases'
  },
  {
    type: 'interactive',
    title: 'Practice: Relative motion scenarios',
    component: Slide5,
    id: 'practice-relative-motion'
  }
];

function RelativeMotion2DSubmodule() {
  return <div>This is the Relative motion in 2D submodule.</div>;
}

export default RelativeMotion2DSubmodule;