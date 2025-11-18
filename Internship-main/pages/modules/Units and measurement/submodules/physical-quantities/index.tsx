import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: specific slide components
import ScaleOfTheLargeSlide from './Slide1';
import AngularMeasure1Slide from './Slide2';
import AngularMeasure2Slide from './Slide3';
import IntroToParallaxSlide from './Slide4';
import ParallaxDistanceSlide from './Slide5';
import ParallaxObservingStarsSlide from './Slide6';
import StellarDistanceSlide from './Slide7';
import StellarParallaxClarificationSlide from './Slide8';
import ScaleOfTheSmallSlide from './Slide9';

export const physicalQuantitiesSlides: Slide[] = [
  {
    type: 'interactive', // Assuming video/interactive mix based on icons
    title: 'Scale of the large',
    component: ScaleOfTheLargeSlide,
    id: 'scale-of-the-large'
  },
  {
    type: 'interactive',
    title: 'Angular measure 1',
    component: AngularMeasure1Slide,
    id: 'angular-measure-1'
  },
  {
    type: 'interactive',
    title: 'Angular Measure 2',
    component: AngularMeasure2Slide,
    id: 'angular-measure-2'
  },
  {
    type: 'interactive',
    title: 'Intro to parallax',
    component: IntroToParallaxSlide,
    id: 'intro-to-parallax'
  },
  {
    type: 'interactive',
    title: 'Parallax: distance',
    component: ParallaxDistanceSlide,
    id: 'parallax-distance'
  },
  {
    type: 'interactive',
    title: 'Parallax in observing stars',
    component: ParallaxObservingStarsSlide,
    id: 'parallax-observing-stars'
  },
  {
    type: 'interactive',
    title: 'Stellar distance using parallax',
    component: StellarDistanceSlide,
    id: 'stellar-distance-using-parallax'
  },
  {
    type: 'interactive',
    title: 'Stellar parallax clarification',
    component: StellarParallaxClarificationSlide,
    id: 'stellar-parallax-clarification'
  },
  {
    type: 'interactive',
    title: 'Scale of the small',
    component: ScaleOfTheSmallSlide,
    id: 'scale-of-the-small'
  }
];

function PhysicalQuantitiesSubmodule() {
  return (
    <div>
      This is the Physical Quantities submodule component.
    </div>
  );
}

export default PhysicalQuantitiesSubmodule;