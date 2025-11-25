import React from 'react';
import { Slide } from '../../../common-components/concept';

import UnitVectorsIntroSlide from './Slide1';
import FindingUnitVectorSlide from './Slide2';
import ScalingUnitVectorsSlide from './Slide3';

export const unitVectorsSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Unit vectors intro',
    component: UnitVectorsIntroSlide,
    id: 'unit-vectors-intro'
  },
  {
    type: 'interactive',
    title: 'Worked example: finding unit vector with given direction',
    component: FindingUnitVectorSlide,
    id: 'finding-unit-vector'
  },
  {
    type: 'interactive',
    title: 'Worked example: Scaling unit vectors',
    component: ScalingUnitVectorsSlide,
    id: 'scaling-unit-vectors'
  }
];

function UnitVectorsSubmodule() {
  return <div>Unit Vectors Submodule</div>;
}

export default UnitVectorsSubmodule;