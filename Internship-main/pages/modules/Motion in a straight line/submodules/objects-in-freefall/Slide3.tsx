// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'freefall-impact-velocity-learning',
    conceptId: 'freefall-impact-velocity',
    conceptName: 'Impact Velocity',
    type: 'learning',
    description: 'Finding final velocity from height.'
  },
  {
    id: 'freefall-impact-velocity-quiz',
    conceptId: 'freefall-impact-velocity-quiz',
    conceptName: 'Impact Velocity Quiz',
    type: 'learning',
    description: 'Quiz on final velocity formula.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If dropped from 20 m (u = 0), impact speed is:',
    options: ['10 m/s', '20 m/s', '√(40g)', '√(2gh)'],
    correctIndex: 3,
    explanation: 'Use v = √(2gh). For h=20: v ≈ 20 m/s.'
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Impact Velocity from Height</h2>

      <p className="text-slate-600 mb-3">
        When an object falls from height h:
      </p>

      <p className="bg-blue-50 p-3 rounded font-semibold text-center">
        v = √(2gh)
      </p>

      <p className="mt-3">This formula comes from energy/kinematic relations.</p>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Height → impact velocity preview  
      <div className="text-4xl mt-3">💥🟡</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="freefall-impact-velocity"
      slideTitle="Impact velocity from height"
      moduleId="motion-in-a-straight-line"
      submoduleId="objects-in-freefall"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
