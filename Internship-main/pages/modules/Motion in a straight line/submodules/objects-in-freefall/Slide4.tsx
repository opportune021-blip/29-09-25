// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'freefall-review-learning',
    conceptId: 'freefall-review',
    conceptName: 'Freefall Review',
    type: 'learning',
    description: 'Review of all concepts in freefall.'
  },
  {
    id: 'freefall-review-quiz',
    conceptId: 'freefall-review-quiz',
    conceptName: 'Freefall Review Quiz',
    type: 'learning',
    description: 'Final quiz for freefall.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which formula does NOT apply in freefall (u=0)?',
    options: ['v = gt', 's = ½gt²', 'v² = 2gs', 's = vt'],
    correctIndex: 3
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Freefall — Review</h2>

      <ul className="list-disc ml-5 text-slate-600 space-y-1">
        <li>a = g downward</li>
        <li>v = gt (for u=0)</li>
        <li>s = ½gt² (for u=0)</li>
        <li>v² = 2gs</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border rounded p-4 text-center">
      Summary icons placeholder  
      <div className="text-4xl mt-2">📘⬇️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="freefall-review"
      slideTitle="Freefall review"
      moduleId="motion-in-a-straight-line"
      submoduleId="objects-in-freefall"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
