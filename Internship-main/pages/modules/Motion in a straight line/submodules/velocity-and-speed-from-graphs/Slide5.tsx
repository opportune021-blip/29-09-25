// Slide5.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'vel-graphs-review-learning',
    conceptId: 'vel-graphs-review',
    conceptName: 'Velocity Graphs Review',
    type: 'learning',
    description: 'Review of graph-based motion concepts.'
  },
  {
    id: 'vel-graphs-review-quiz',
    conceptId: 'vel-graphs-review-quiz',
    conceptName: 'Graphs Review Quiz',
    type: 'learning',
    description: 'End-of-submodule quiz.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Slope of x–t graph gives:',
    options: ['Displacement', 'Acceleration', 'Velocity', 'Distance only'],
    correctIndex: 2
  }
];

export default function Slide5() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Velocity & Graphs — Review</h2>
      <ul className="list-disc ml-5 text-slate-600">
        <li>x–t slope → velocity</li>
        <li>v–t slope → acceleration</li>
        <li>Area under v–t → displacement</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <div>Summary visual placeholder 📘</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="velocity-graphs-review"
      slideTitle="Instantaneous speed and velocity review"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
