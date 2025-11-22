// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'acceleration-intro-learning',
    conceptId: 'acceleration-intro',
    conceptName: 'Acceleration Intro',
    type: 'learning',
    description: 'Understanding the meaning of acceleration.'
  },
  {
    id: 'acceleration-intro-quiz',
    conceptId: 'acceleration-intro-quiz',
    conceptName: 'Acceleration Quiz',
    type: 'learning',
    description: 'Quiz on basic acceleration concept.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Acceleration is defined as:',
    options: [
      'Rate of change of velocity',
      'Rate of change of distance',
      'Velocity × time',
      'Force per unit time'
    ],
    correctIndex: 0,
    explanation: 'Acceleration = Δv / Δt'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">What is Acceleration?</h2>
      <p className="text-slate-600 mb-3">
        Acceleration tells us how fast velocity is changing.  
        It can be positive, negative, or zero.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Positive acceleration → speeding up</li>
        <li>Negative acceleration (deceleration) → slowing down</li>
        <li>Zero acceleration → constant velocity</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      <p className="text-sm text-slate-500 mb-2">Velocity change slider (placeholder)</p>
      <span className="text-4xl">⚡</span>
    </div>
  );

  return (
    <SlideTemplate
      slideId="what-is-acceleration"
      slideTitle="What is acceleration?"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
