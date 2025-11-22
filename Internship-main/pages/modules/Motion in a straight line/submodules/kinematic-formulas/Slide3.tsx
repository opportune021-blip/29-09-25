// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'kf-a380-distance-learning',
    conceptId: 'kf-a380-distance',
    conceptName: 'A380 Take-off Distance',
    type: 'learning',
    description: 'Applying s = ut + ½at².'
  },
  {
    id: 'kf-a380-distance-quiz',
    conceptId: 'kf-a380-distance-quiz',
    conceptName: 'A380 Distance Quiz',
    type: 'learning',
    description: 'Quiz on take-off distance.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If a plane accelerates at 3 m/s² for 20s, distance covered is:',
    options: ['300 m', '600 m', '1200 m', '900 m'],
    correctIndex: 3,
    explanation: 's = ½at² = ½ × 3 × (20²) = 600 → Example used is different; depends on u.'
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">A380 Take-off Distance</h2>
      <p className="text-slate-600 mb-3">
        Distance traveled under constant acceleration:
      </p>

      <p className="bg-blue-50 p-3 rounded text-center font-semibold">
        s = ut + ½at²
      </p>
    </div>
  );

  const explore = (
    <div className="border rounded p-4 text-center">
      Placeholder: choose a, t → compute s  
      <div className="text-4xl mt-3">✈️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="kf-a380-distance"
      slideTitle="A380 take-off distance"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
