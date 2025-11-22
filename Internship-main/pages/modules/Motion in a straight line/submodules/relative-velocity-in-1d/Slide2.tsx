// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'rv-two-objects-learning',
    conceptId: 'rv-two-objects',
    conceptName: 'Two-Object Relative Velocity',
    type: 'learning',
    description: 'Relative velocity when both objects are moving.'
  },
  {
    id: 'rv-two-objects-quiz',
    conceptId: 'rv-two-objects-quiz',
    conceptName: 'Two-Object RV Quiz',
    type: 'learning',
    description: 'Quiz on A wrt B and B wrt A.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If A = 20 m/s and B = 10 m/s (same direction), v(A wrt B) =',
    options: ['10 m/s', '30 m/s', '-10 m/s', 'Zero'],
    correctIndex: 0,
    explanation: 'vA/B = vA - vB = 20 - 10 = 10'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Relative Velocity of Two Moving Objects</h2>

      <p className="text-slate-600 mb-3">Case 1: Same direction</p>
      <p className="bg-blue-50 p-3 rounded font-semibold text-center">vA/B = vA − vB</p>

      <p className="text-slate-600 mt-4 mb-3">Case 2: Opposite directions</p>
      <p className="bg-blue-50 p-3 rounded font-semibold text-center">vA/B = vA + vB</p>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      Demo placeholder: two sliders for vA and vB  
      <div className="text-4xl mt-3">🎚️🚗🎚️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="relative-velocity-two-objects"
      slideTitle="Relative velocity of two moving objects"
      moduleId="motion-in-a-straight-line"
      submoduleId="relative-velocity-in-1d"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
