// Slide5.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'avg-vel-review-learning',
    conceptId: 'avg-vel-review',
    conceptName: 'Average velocity review',
    type: 'learning',
    description: 'End-of-submodule recap.'
  },
  {
    id: 'avg-vel-review-quiz',
    conceptId: 'avg-vel-review-quiz',
    conceptName: 'Final quiz',
    type: 'learning',
    description: 'Review quiz for average speed & velocity.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Speed is always:',
    options: ['Positive', 'Negative', 'Zero', 'A vector'],
    correctIndex: 0
  }
];

export default function Slide5() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Average Speed & Velocity — Review</h2>
      <ul className="list-disc ml-5 text-slate-600">
        <li>Speed = distance / time (scalar)</li>
        <li>Velocity = displacement / time (vector)</li>
        <li>Velocity can be negative</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center">
      <div className="border p-4 rounded">
        Summary visual placeholder  
        <br />
        <span className="text-4xl">📝</span>
      </div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="average-velocity-review"
      slideTitle="Average velocity and speed review"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
