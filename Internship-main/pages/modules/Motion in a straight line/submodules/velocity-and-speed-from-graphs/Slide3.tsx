// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'pos-time-learning',
    conceptId: 'pos-time',
    conceptName: 'Position-Time Graphs',
    type: 'learning',
    description: 'Understanding x–t graphs.'
  },
  {
    id: 'pos-time-quiz',
    conceptId: 'pos-time-quiz',
    conceptName: 'Position-Time Quiz',
    type: 'learning',
    description: 'Quiz on x–t graphs.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If x–t graph is horizontal, velocity is:',
    options: ['Positive', 'Negative', 'Zero', 'Cannot say'],
    correctIndex: 2
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Position vs Time Graphs</h2>
      <p className="text-slate-600 mb-2">
        These graphs show how position changes with time.
      </p>
      <ul className="list-disc ml-5 text-slate-600">
        <li>Slope gives velocity</li>
        <li>Flat line → no movement</li>
        <li>Curved line → changing velocity</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <p className="text-sm text-slate-500 mb-3">Interactive graph placeholder</p>
      <div>📉 Position-Time Graph</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="position-vs-time"
      slideTitle="Position vs time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
