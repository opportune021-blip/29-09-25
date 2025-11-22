// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'avg-vel-scalars-vectors-learning',
    conceptId: 'scalars-vectors',
    conceptName: 'Scalars & Vectors',
    type: 'learning',
    description: 'Understanding scalar and vector quantities in motion.'
  },
  {
    id: 'avg-vel-scalars-vectors-quiz',
    conceptId: 'scalars-vectors-quiz',
    conceptName: 'Scalars & Vectors Quiz',
    type: 'learning',
    description: 'Quiz about scalar–vector basics.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which of the following is a vector?',
    options: ['Speed', 'Distance', 'Velocity', 'Mass'],
    correctIndex: 2,
    explanation: 'Velocity includes both magnitude and direction.'
  },
  {
    question: 'Which is a scalar quantity?',
    options: ['Displacement', 'Velocity', 'Acceleration', 'Speed'],
    correctIndex: 3,
    explanation: 'Speed has no direction.'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vectors and Scalars</h2>
      <p className="text-slate-600 mb-3">
        Physical quantities are classified as <strong>scalars</strong> or <strong>vectors</strong>.
      </p>

      <ul className="list-disc ml-5 text-slate-600 space-y-2">
        <li><strong>Scalars:</strong> Have only magnitude (e.g., speed, distance, mass).</li>
        <li><strong>Vectors:</strong> Have magnitude and direction (e.g., velocity, displacement, acceleration).</li>
        <li>Vectors require sign (+ or −) on a 1D axis.</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center">
      <h3 className="font-bold mb-3">Scalar vs Vector Demo</h3>
      <p className="text-slate-500 text-sm mb-4">Imagine a number line with direction arrows.</p>
      <div className="border p-4 rounded">
        Placeholder: drag arrows showing direction 👇  
        <br />
        <span className="text-4xl">⬅️ ➡️</span>
      </div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="avg-vel-scalar-vector-intro"
      slideTitle="Intro to vectors and scalars"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
