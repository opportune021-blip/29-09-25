// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'distance-displacement-1d-learning', conceptId: 'distance-displacement-1d', conceptName: 'Distance & Displacement 1D', type: 'learning', description: '' },
  { id: 'distance-displacement-1d-quiz', conceptId: 'distance-displacement-1d-quiz', conceptName: '1D quiz', type: 'learning', description: '' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'An object moves from x = 2 m to x = -3 m. What is its displacement?',
    options: ['5 m', '-5 m', ' -1 m', '1 m'],
    correctIndex: 1,
    explanation: 'Displacement = final - initial = -3 - 2 = -5 m'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Distance & displacement in 1D</h2>
      <p className="text-slate-600 mb-3">Choose a coordinate axis (positive direction). Compute positions as signed numbers.</p>

      <div className="bg-slate-50 p-3 rounded">
        <p className="font-medium">Examples:</p>
        <ol className="ml-5 list-decimal">
          <li>From x=1 to x=4: displacement = +3 m.</li>
          <li>From x=4 to x=1: displacement = -3 m.</li>
        </ol>
      </div>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Slider to move a point on number line (placeholder).</p>
      <div className="mt-4 p-4 border rounded">Number-line slider placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="distance-displacement-1d"
      slideTitle="Distance and displacement in one dimension"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
