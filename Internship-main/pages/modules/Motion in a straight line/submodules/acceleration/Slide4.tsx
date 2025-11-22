// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'a-t-learning',
    conceptId: 'a-t-graphs',
    conceptName: 'Acceleration-Time Graphs',
    type: 'learning',
    description: 'Understanding a–t graphs.'
  },
  {
    id: 'a-t-quiz',
    conceptId: 'a-t-quiz',
    conceptName: 'Acceleration-Time Quiz',
    type: 'learning',
    description: 'Quiz on acceleration-time graphs.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Area under acceleration-time graph gives:',
    options: ['Velocity', 'Displacement', 'Time', 'Distance'],
    correctIndex: 0,
    explanation: '∫a dt = Δv'
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Acceleration vs Time Graphs</h2>
      <p className="text-slate-600 mb-3">
        These graphs show how acceleration varies with time.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Constant a → horizontal line</li>
        <li>Area under curve → change in velocity</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <p className="text-sm text-slate-500 mb-2">Area under curve demo placeholder</p>
      <div>📊 Shaded A–T Graph</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="acceleration-vs-time"
      slideTitle="Acceleration vs time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
