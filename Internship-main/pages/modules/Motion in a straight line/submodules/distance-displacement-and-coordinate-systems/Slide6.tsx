// Slide6.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'dd-review-learning', conceptId: 'dd-review', conceptName: 'DD Review', type: 'learning', description: '' },
  { id: 'dd-review-quiz', conceptId: 'dd-review-quiz', conceptName: 'DD Review Quiz', type: 'learning', description: '' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which quantity needs direction to be fully specified?',
    options: ['Speed', 'Distance', 'Velocity', 'Temperature'],
    correctIndex: 2,
    explanation: 'Velocity is vector, needs direction.'
  }
];

export default function Slide6() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Distance & Displacement — Review</h2>
      <p className="text-slate-600">Summary of definitions and quick tips for graph reading and sign conventions.</p>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Wrap-up: quick checklist to remember.</p>
      <div className="mt-4 p-4 border rounded">Checklist placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="distance-displacement-review"
      slideTitle="Distance and displacement review"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
