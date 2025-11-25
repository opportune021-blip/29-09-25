import React from 'react';
import { Slide } from '../../../common-components/concept';

import IntroVectorsScalarsSlide from './Slide1';
import RecognizingVectorsSlide from './Slide2';
import RecognizingVectorsPracticeSlide from './Slide3';
import EquivalentVectorsSlide from './Slide4';
import FindingComponentsSlide from './Slide5';
import ComparingComponentsSlide from './Slide6';

export const vectorBasicsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intro to vectors and scalars',
    component: IntroVectorsScalarsSlide,
    id: 'intro-vectors-scalars'
  },
  {
    type: 'interactive',
    title: 'Recognizing vectors',
    component: RecognizingVectorsSlide,
    id: 'recognizing-vectors'
  },
  {
    type: 'quiz',
    title: 'Recognizing vectors practice',
    component: RecognizingVectorsPracticeSlide,
    id: 'recognizing-vectors-practice'
  },
  {
    type: 'interactive',
    title: 'Equivalent vectors',
    component: EquivalentVectorsSlide,
    id: 'equivalent-vectors'
  },
  {
    type: 'interactive',
    title: 'Finding the components of a vector',
    component: FindingComponentsSlide,
    id: 'finding-components'
  },
  {
    type: 'interactive',
    title: 'Comparing the components of vectors',
    component: ComparingComponentsSlide,
    id: 'comparing-components'
  }
];

function VectorBasicsSubmodule() {
  return <div>Vector Basics Submodule</div>;
}

export default VectorBasicsSubmodule;