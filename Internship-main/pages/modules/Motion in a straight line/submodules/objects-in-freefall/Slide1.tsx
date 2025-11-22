// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'freefall-disp-vel-learning',
    conceptId: 'freefall-disp-vel',
    conceptName: 'Projectile Displacement & Velocity',
    type: 'learning',
    description: 'Understanding displacement and velocity in freefall.'
  },
  {
    id: 'freefall-disp-vel-quiz',
    conceptId: 'freefall-disp-vel-quiz',
    conceptName: 'Freefall Quiz',
    type: 'learning',
    description: 'Quiz on displacement and velocity in freefall.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'In freefall (ignoring air resistance), acceleration is:',
    options: ['0 m/s²', '9.8 m/s² downward', '9.8 m/s² upward', 'Depends on mass'],
    correctIndex: 1
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Projectile Displacement & Velocity</h2>

      <p className="text-slate-600 mb-2">
        In freefall, the only force acting on the object is gravity (<strong>g = 9.8 m/s² downward</strong>).
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Velocity increases linearly: v = u + gt</li>
        <li>Displacement increases quadratically: s = ut + ½gt²</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Freefall ball animation placeholder  
      <div className="text-4xl mt-2">🟡⬇️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="freefall-disp-vel"
      slideTitle="Projectile displacement and velocity"
      moduleId="motion-in-a-straight-line"
      submoduleId="objects-in-freefall"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
