// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'position-time-learning', conceptId: 'position-time', conceptName: 'Position-time graphs', type: 'learning', description: '' },
  { id: 'position-time-quiz', conceptId: 'position-time-quiz', conceptName: 'position-time quiz', type: 'learning', description: '' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'On a position-time graph, the slope represents:',
    options: ['Acceleration', 'Velocity', 'Distance', 'Displacement only'],
    correctIndex: 1,
    explanation: 'Slope (Δx/Δt) gives velocity.'
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Position — time graphs</h2>
      <p className="text-slate-600 mb-3">Position-time graphs show how position changes with time. Slope = velocity.</p>

      <div className="bg-blue-50 p-3 rounded">
        <p className="font-medium">Quick tip:</p>
        <p>If the graph is horizontal → velocity = 0. If slope is steep → high velocity.</p>
      </div>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Interactive graph placeholder (drag to change slope).</p>
      <div className="mt-4 p-4 border rounded">Position-time graph demo placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="position-time-graphs"
      slideTitle="Position-time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
