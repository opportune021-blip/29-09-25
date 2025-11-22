// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'kf-derive-s-learning',
    conceptId: 'kf-derive-s',
    conceptName: 'Deriving s = ut + ½at²',
    type: 'learning',
    description: 'Deriving the kinematic equation using graphs.'
  },
  {
    id: 'kf-derive-s-quiz',
    conceptId: 'kf-derive-s-quiz',
    conceptName: 'Derivation Quiz',
    type: 'learning',
    description: 'Quiz on derivation of kinematic formula.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'In v–t graph, displacement is given by:',
    options: [
      'Slope of graph',
      'Area under graph',
      'Intercept',
      'Double the area'
    ],
    correctIndex: 1
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Deriving the Displacement Formula</h2>
      <p className="text-slate-600 mb-3">
        We use v–t graph area to derive:
      </p>

      <p className="bg-blue-50 p-3 rounded font-semibold text-center">
        s = ut + ½at²
      </p>

      <p className="mt-3">
        The area under the v–t graph forms a rectangle + triangle.
      </p>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      Triangle + rectangle demo (placeholder)  
      <div className="text-4xl mt-3">📐</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="kf-derive-s"
      slideTitle="Deriving displacement formula"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
