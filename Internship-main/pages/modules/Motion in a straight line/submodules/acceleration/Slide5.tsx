// Slide5.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'acc-review-learning',
    conceptId: 'acc-review',
    conceptName: 'Acceleration Review',
    type: 'learning',
    description: 'End of submodule summary.'
  },
  {
    id: 'acc-review-quiz',
    conceptId: 'acc-review-quiz',
    conceptName: 'Acceleration Review Quiz',
    type: 'learning',
    description: 'Final quiz for acceleration.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If acceleration = 0, velocity is:',
    options: ['Increasing', 'Decreasing', 'Constant', 'Zero always'],
    correctIndex: 2
  }
];

export default function Slide5() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Acceleration — Review</h2>
      <ul className="list-disc ml-5 text-slate-600">
        <li>a = Δv / Δt</li>
        <li>Positive → speeding up</li>
        <li>Negative → slowing down</li>
        <li>Zero → constant velocity</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <div>📘 Summary Visual</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="acceleration-review"
      slideTitle="Acceleration review"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
