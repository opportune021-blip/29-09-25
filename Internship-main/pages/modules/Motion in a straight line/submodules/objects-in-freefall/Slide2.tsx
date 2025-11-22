// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'freefall-height-time-learning',
    conceptId: 'freefall-height-time',
    conceptName: 'Height from Time',
    type: 'learning',
    description: 'Calculate height using s = ut + ½gt².'
  },
  {
    id: 'freefall-height-time-quiz',
    conceptId: 'freefall-height-time-quiz',
    conceptName: 'Height Quiz',
    type: 'learning',
    description: 'Quiz on height–time calculations.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If an object is dropped from rest, after 2 seconds it falls:',
    options: ['≈ 10 m', '≈ 20 m', '≈ 40 m', '≈ 5 m'],
    correctIndex: 1,
    explanation: 's = ½ g t² ≈ ½ × 10 × 4 = 20 m'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Projectile Height Given Time</h2>

      <p className="text-slate-600 mb-3">
        For an object dropped with initial velocity u = 0:
      </p>

      <p className="bg-blue-50 p-3 rounded font-semibold text-center">
        s = ½gt²
      </p>

      <p className="mt-3">Height increases as t² — freefall is quadratic.</p>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Time → height slider placeholder  
      <div className="text-4xl mt-3">📏⬇️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="freefall-height-time"
      slideTitle="Projectile height given time"
      moduleId="motion-in-a-straight-line"
      submoduleId="objects-in-freefall"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
