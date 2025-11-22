// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'kf-aircraft-acc-learning',
    conceptId: 'kf-aircraft-acc',
    conceptName: 'Aircraft Carrier Acceleration',
    type: 'learning',
    description: 'Real-world application of kinematics.'
  },
  {
    id: 'kf-aircraft-acc-quiz',
    conceptId: 'kf-aircraft-acc-quiz',
    conceptName: 'Aircraft Acc Quiz',
    type: 'learning',
    description: 'Quiz on aircraft carrier acceleration.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If an aircraft accelerates from 0 to 60 m/s in 3 seconds, acceleration is:',
    options: ['10 m/s²', '15 m/s²', '20 m/s²', '5 m/s²'],
    correctIndex: 0,
    explanation: 'a = (v - u)/t = 60/6 = 10 m/s²'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Acceleration of Aircraft Carrier Take-off</h2>
      <p className="text-slate-600">
        Aircraft on carriers must reach take-off speed in very short runway distances, requiring high acceleration.
      </p>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      Catapult launch demo placeholder  
      <div className="text-4xl mt-3">🚀</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="kf-aircraft-acc"
      slideTitle="Acceleration of aircraft carrier take-off"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
