import React from 'react';
import { Slide } from '../../../common-components/concept';

import WordProblemCompSlide from './Slide1';
import WordProblemHikingSlide from './Slide2';

export const applicationsOfVectorsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vector components from magnitude & direction: word problem',
    component: WordProblemCompSlide,
    id: 'word-problem-comp'
  },
  {
    type: 'interactive',
    title: 'Vector word problem: hiking',
    component: WordProblemHikingSlide,
    id: 'word-problem-hiking'
  }
];

function ApplicationsOfVectorsSubmodule() {
  return <div>Applications of Vectors Submodule</div>;
}

export default ApplicationsOfVectorsSubmodule;