// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'disp-from-vel-learning',
    conceptId: 'disp-from-vel',
    conceptName: 'Displacement from velocity',
    type: 'learning',
    description: 'Using velocity to compute displacement.'
  },
  {
    id: 'disp-from-vel-quiz',
    conceptId: 'disp-from-vel-quiz',
    conceptName: 'Velocity → displacement quiz',
    type: 'learning',
    description: 'Quiz on displacement from velocity.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If v = 5 m/s for 4 s, displacement is:',
    options: ['5 m', '10 m', '20 m', '25 m'],
    correctIndex: 2,
    explanation: 'Displacement = v × t = 5 × 4 = 20 m'
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Displacement from Velocity</h2>
      <p className="text-slate-600">For constant velocity: displacement = velocity × time</p>
      <p className="mt-3">If velocity is negative → displacement is also negative.</p>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500 mb-4">Use the slider to change velocity.</p>
      <div className="border p-4 rounded">
        Placeholder interactive velocity slider  
        <br />
        <span className="text-4xl">📉</span>
      </div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="disp-from-velocity-example"
      slideTitle="Displacement from time and velocity example"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
