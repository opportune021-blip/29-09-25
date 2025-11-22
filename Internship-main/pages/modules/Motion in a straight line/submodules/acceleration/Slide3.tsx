// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'v-t-learning',
    conceptId: 'v-t-graphs',
    conceptName: 'Velocity-Time Graphs',
    type: 'learning',
    description: 'Understanding velocity-time graph behaviour.'
  },
  {
    id: 'v-t-quiz',
    conceptId: 'v-t-quiz',
    conceptName: 'Velocity-Time Quiz',
    type: 'learning',
    description: 'Quiz on velocity-time graphs.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Slope of velocity-time graph gives:',
    options: ['Velocity', 'Acceleration', 'Distance', 'Jerk'],
    correctIndex: 1
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Velocity vs Time Graphs</h2>
      <p className="text-slate-600 mb-3">
        v–t graphs show how velocity changes with time.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Positive slope → acceleration</li>
        <li>Negative slope → deceleration</li>
        <li>Flat line → zero acceleration</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <p className="text-sm text-slate-500 mb-2">Graph slope demo placeholder</p>
      <div>📈 Velocity-Time Graph</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="velocity-vs-time"
      slideTitle="Velocity vs time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
