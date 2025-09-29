import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule
import SlopeSlide1 from './Slide1';
import SlopeSlide2 from './Slide2';
import SlopeSlide3 from './Slide3';
import SlopeSlide4 from './Slide4';
import SlopeAssessment from './Slide5'; // Assessment is the 5th slide

// Define and export the slide array for this submodule
export const slopeSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'What is Slope?',
    component: SlopeSlide1,
    id: 'what-is-slope'
  },
  {
    type: 'interactive',
    title: 'Finding Slope from a Graph',
    content: 'How to visually count the rise (vertical change) and run (horizontal change) between two points on a line.',
    component: SlopeSlide2,
    id: 'finding-slope-from-graph'
  },
  {
    type: 'interactive',
    title: 'The Slope Formula',
    component: SlopeSlide3,
    id: 'slope-formula'
  },
  {
    type: 'interactive',
    title: 'Special Cases: Horizontal and Vertical Lines',
    component: SlopeSlide4,
    id: 'special-slope-cases'
  },
  {
    type: 'question',
    title: 'Slope Assessment',
    content: React.createElement(() => <SlopeAssessment />),
    persistResponse: true,
    component: SlopeAssessment,
    id: 'slope-assessment'
    // The 'questions' array has been removed from this object.
  }
];

// Dummy React component to satisfy Next.js/module requirements
function SlopeComponent() {
  return (
    <div>
      This is a submodule data file, not a page.
    </div>
  );
}

export default SlopeComponent;