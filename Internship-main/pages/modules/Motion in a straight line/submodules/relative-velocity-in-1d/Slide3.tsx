// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'rv-review-learning',
    conceptId: 'rv-review',
    conceptName: 'Relative Velocity Review',
    type: 'learning',
    description: 'Final review of relative velocity concepts.'
  },
  {
    id: 'rv-review-quiz',
    conceptId: 'rv-review-quiz',
    conceptName: 'Relative Velocity Review Quiz',
    type: 'learning',
    description: 'Final quiz for relative motion.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If A = 15 m/s and B = 25 m/s (same direction), v(A wrt B) =',
    options: ['10 m/s', '-10 m/s', '40 m/s', 'Zero'],
    correctIndex: 1,
    explanation: 'vA/B = 15 - 25 = -10 → A moves backward relative to B.'
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Relative Velocity — Review</h2>

      <ul className="list-disc ml-5 text-slate-600 space-y-1">
        <li>vA/B = vA − vB</li>
        <li>Positive → forward relative</li>
        <li>Negative → backward relative</li>
        <li>Opposite directions → add speeds</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Summary graphic placeholder  
      <div className="text-4xl mt-3">📘🚗</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="relative-velocity-review"
      slideTitle="Relative velocity review"
      moduleId="motion-in-a-straight-line"
      submoduleId="relative-velocity-in-1d"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
