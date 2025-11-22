// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'a380-learning',
    conceptId: 'a380',
    conceptName: 'A380 Take-off',
    type: 'learning',
    description: 'Understanding acceleration using real aircraft data.'
  },
  {
    id: 'a380-quiz',
    conceptId: 'a380-quiz',
    conceptName: 'A380 Quiz',
    type: 'learning',
    description: 'Quiz based on Airbus A380 acceleration.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If an A380 accelerates at 3 m/s² for 20 seconds, its velocity becomes:',
    options: ['20 m/s', '40 m/s', '50 m/s', '60 m/s'],
    correctIndex: 1,
    explanation: 'v = a × t = 3 × 20 = 60 m/s'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Airbus A380 Take-off Time</h2>
      <p className="text-slate-600 mb-3">
        Large aircraft like the A380 need long runways because their mass is huge and thus acceleration is lower.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Typical acceleration: 2–3 m/s²</li>
        <li>Take-off speed: ~70–80 m/s</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      <p className="text-sm text-slate-500 mb-2">Real acceleration demo (placeholder)</p>
      <span className="text-4xl">✈️</span>
    </div>
  );

  return (
    <SlideTemplate
      slideId="a380-takeoff-time"
      slideTitle="Airbus A380 take-off time"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
