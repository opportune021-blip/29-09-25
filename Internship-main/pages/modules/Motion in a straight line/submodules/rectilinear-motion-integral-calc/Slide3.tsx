// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'rectilinear-integral-review-learning',
    conceptId: 'rectilinear-integral-review',
    conceptName: 'Integral Motion Review',
    type: 'learning',
    description: 'Review of integral-based motion.'
  },
  {
    id: 'rectilinear-integral-review-quiz',
    conceptId: 'rectilinear-integral-review-quiz',
    conceptName: 'Integral Review Quiz',
    type: 'learning',
    description: 'Quiz on integral rectilinear motion.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If v(t) is known, displacement is found by:',
    options: ['Differentiation', 'Integration', 'Multiplying by mass', 'Using F=ma'],
    correctIndex: 1
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Rectilinear Motion (Integral Calc) — Review</h2>

      <ul className="list-disc ml-5 text-slate-600 space-y-1">
        <li>s = ∫ v dt</li>
        <li>If a(t) is known → v = ∫ a dt</li>
        <li>Area under graph = physical quantity</li>
        <li>Calculus helps solve non-uniform motion</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border p-4 text-center rounded">
      Summary graphic placeholder  
      <div className="text-4xl mt-2">📘➗</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="rectilinear-motion-review"
      slideTitle="Rectilinear motion (integral calc) review"
      moduleId="motion-in-a-straight-line"
      submoduleId="rectilinear-motion-integral-calc"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
