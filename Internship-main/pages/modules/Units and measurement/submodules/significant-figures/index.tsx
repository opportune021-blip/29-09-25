import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: specific slide components
import IntroToSigFigsSlide from './Slide1';
import RulesOfSigFigsSlide from './Slide2';
import MultiplyingDividingSigFigsSlide from './Slide3';
import AdditionSubtractionSigFigsSlide from './Slide4';

export const significantFiguresSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Intro to significant figures',
    component: IntroToSigFigsSlide,
    id: 'intro-to-sig-figs'
  },
  {
    type: 'interactive',
    title: 'Rules of significant figures',
    component: RulesOfSigFigsSlide,
    id: 'rules-of-sig-figs'
  },
  {
    type: 'interactive',
    title: 'Multiplying and dividing with significant figures',
    component: MultiplyingDividingSigFigsSlide,
    id: 'multiplying-dividing-sig-figs'
  },
  {
    type: 'interactive',
    title: 'Addition and subtraction with significant figures',
    component: AdditionSubtractionSigFigsSlide,
    id: 'addition-subtraction-sig-figs'
  }
];

function SignificantFiguresSubmodule() {
  return (
    <div>
      This is the Significant Figures submodule component.
    </div>
  );
}

export default SignificantFiguresSubmodule;