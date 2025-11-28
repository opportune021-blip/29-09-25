import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

// The variable name matches the import in your main module file
export const projectileGraphsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Visualizing independence of motion',
    component: Slide1,
    id: 'visualizing-independence'
  },
  {
    type: 'interactive',
    title: 'Horizontal motion graphs (x, vx, ax)',
    component: Slide2,
    id: 'horizontal-motion-graphs'
  },
  {
    type: 'interactive',
    title: 'Vertical motion graphs (y, vy, ay)',
    component: Slide3,
    id: 'vertical-motion-graphs'
  },
  {
    type: 'interactive',
    title: 'Analyzing velocity-time slopes',
    component: Slide4,
    id: 'analyzing-slopes'
  },
  {
    type: 'interactive',
    title: 'Review: Matching graphs to trajectories',
    component: Slide5,
    id: 'review-matching-graphs'
  }
];

function ProjectileGraphsSubmodule() {
  return <div>This is the Graphs of projectile motion submodule.</div>;
}

export default ProjectileGraphsSubmodule;