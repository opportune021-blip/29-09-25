// Slide5.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'dd-properties-learning', conceptId: 'dd-properties', conceptName: 'DD Properties', type: 'learning', description: '' },
  { id: 'dd-properties-quiz', conceptId: 'dd-properties-quiz', conceptName: 'DD properties quiz', type: 'learning', description: '' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which statement is true?',
    options: ['Distance is always ≥ displacement magnitude', 'Displacement is always ≥ distance', 'They are always equal', 'None'],
    correctIndex: 0,
    explanation: 'Distance (scalar) is the path length and is always ≥ |displacement|.'
  }
];

export default function Slide5() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Distance & displacement — properties</h2>
      <ul className="list-disc ml-5 text-slate-600">
        <li>Distance is additive over path segments.</li>
        <li>Displacement depends only on endpoints.</li>
        <li>Distance ≥ |displacement|.</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Compare two routes between the same points (placeholder).</p>
      <div className="mt-4 p-4 border rounded">Route comparison placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="distance-displacement-properties"
      slideTitle="Distance and displacement properties"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
