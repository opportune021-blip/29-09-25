import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the slide components for this submodule (assuming they will be created)
import WritingSlopeInterceptSlide1 from './Slide1';
import WritingSlopeInterceptSlide2 from './Slide2';
import WritingSlopeInterceptSlide3 from './Slide3';
import WritingSlopeInterceptSlide4 from './Slide4';
import WritingSlopeInterceptAssessment from './Slide5';

// Define and export the slide array for this submodule
export const writingSlopeInterceptSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Be a Graph Detective: Finding the Equation',
    component: WritingSlopeInterceptSlide1,
    id: 'equation-from-graph'
  },
  {
    type: 'interactive',
    title: 'Finding the Equation with the Y-Intercept and Another Point',
    component: WritingSlopeInterceptSlide2,
    id: 'finding-b-from-graph'
  },
  {
    type: 'interactive',
    title: 'Finding the Equation: Two Common Methods',
    component: WritingSlopeInterceptSlide3,
    id: 'calculating-m-from-graph'
  },
  {
    type: 'interactive',
    title: 'Advanced Methods: Finding the Equation',
    component: WritingSlopeInterceptSlide4,
    id: 'equation-from-point-slope'
  },
  {
    type: 'question',
    title: 'Assessment: Writing Equations',
    component: WritingSlopeInterceptAssessment,
    id: 'writing-equations-assessment',
    questions: [
      {
        id: 'write-from-info',
        questionText: 'A graph crosses the y-axis at (0, 5) and has a slope of -2. What is its equation in slope-intercept form?',
        inputType: 'text',
        required: true
      },
      {
        id: 'write-from-points',
        questionText: 'A line passes through the points (0, 1) and (2, 7). What is the equation of the line?',
        inputType: 'text',
        required: true
      },
      {
        id: 'real-world-model',
        questionText: 'An auto-rickshaw ride has a starting fee and a cost per km. The total cost (y) for (x) km is modeled by y = 15x + 23. What is the starting fee?',
        inputType: 'text',
        required: true
      }
    ]
  }
];

// Dummy React component
function WritingSlopeInterceptEquationsComponent() {
  return <div>This is a submodule data file, not a page.</div>;
}

export default WritingSlopeInterceptEquationsComponent;