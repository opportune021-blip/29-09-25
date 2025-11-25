import React from 'react';
import { Slide } from '../../../common-components/concept';

import MagnitudeFromGraphSlide from './Slide1';
import MagnitudeFromComponentsSlide from './Slide2';
import MagnitudeFromPointsSlide from './Slide3';

export const magnitudeOfVectorsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Vector magnitude from graph',
    component: MagnitudeFromGraphSlide,
    id: 'mag-from-graph'
  },
  {
    type: 'interactive',
    title: 'Vector magnitude from components',
    component: MagnitudeFromComponentsSlide,
    id: 'mag-from-components'
  },
  {
    type: 'interactive',
    title: 'Vector magnitude from initial & terminal points',
    component: MagnitudeFromPointsSlide,
    id: 'mag-from-points'
  }
];

function MagnitudeOfVectorsSubmodule() {
  return <div>Magnitude of Vectors Submodule</div>;
}

export default MagnitudeOfVectorsSubmodule;