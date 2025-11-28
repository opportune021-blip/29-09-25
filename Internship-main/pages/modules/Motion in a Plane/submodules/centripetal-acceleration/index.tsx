import React from 'react';
import { Slide } from '../../../common-components/concept';

// Import the specific slide components for this submodule
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';


// The variable name matches the import in your main module file
export const centripetalAccelerationSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Acceleration without change in speed',
    component: Slide1,
    id: 'acceleration-direction-change'
  },
  {
    type: 'interactive',
    title: 'Direction of centripetal acceleration',
    component: Slide2,
    id: 'direction-center-seeking'
  },
  {
    type: 'interactive',
    title: 'Formulas: Linear (v²/r) vs. Angular (rω²)',
    component: Slide3,
    id: 'centripetal-formulas'
  },
  {
    type: 'interactive',
    title: 'Dynamics: Centripetal Force connection',
    component: Slide4,
    id: 'centripetal-force-intro'
  },
  {
    type: 'interactive',
    title: 'Total Acceleration: Radial vs. Tangential',
    component: Slide5,
    id: 'total-acceleration-vector'
  }
];

function CentripetalAccelerationSubmodule() {
  return <div>This is the Centripetal acceleration submodule.</div>;
}

export default CentripetalAccelerationSubmodule;