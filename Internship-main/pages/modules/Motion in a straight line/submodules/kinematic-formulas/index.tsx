import React from 'react';
import { Slide } from '../../../common-components/concept';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';

export const kinematicFormulasSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Average velocity for constant acceleration',
    component: Slide1,
    id: 'avg-velocity-constant-acc'
  },
  {
    type: 'interactive',
    title: 'Acceleration of aircraft carrier take-off',
    component: Slide2,
    id: 'aircraft-carrier-acc'
  },
  {
    type: 'interactive',
    title: 'A380 take-off distance',
    component: Slide3,
    id: 'a380-takeoff-distance'
  },
  {
    type: 'interactive',
    title: 'Deriving displacement formula',
    component: Slide4,
    id: 'derive-displacement'
  },
  {
    type: 'interactive',
    title: 'Choosing kinematic equations',
    component: Slide5,
    id: 'choosing-kinematic-equations'
  }
];

function KinematicFormulasSubmodule() {
  return <div>This is the Kinematic Formulas submodule.</div>;
}

export default KinematicFormulasSubmodule;
