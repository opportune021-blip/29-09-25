// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'area-vt-learning',
    conceptId: 'area-vt',
    conceptName: 'Area under V–T graph',
    type: 'learning',
    description: 'Understanding why distance = area under velocity graph.'
  },
  {
    id: 'area-vt-quiz',
    conceptId: 'area-vt-quiz',
    conceptName: 'V–T Area Quiz',
    type: 'learning',
    description: 'Quiz on V–T area concept.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Area under velocity-time graph gives:',
    options: ['Velocity', 'Acceleration', 'Distance/Displacement', 'Slope'],
    correctIndex: 2
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Why Distance = Area Under V–T Graph</h2>
      <p className="text-slate-600 mb-3">
        Velocity × time = displacement.  
        So area under the velocity curve gives displacement.
      </p>

      <p>For constant velocity: area = rectangle = v × t</p>
      <p>For changing velocity: area = sum of small rectangles (integration)</p>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      <p className="text-sm text-slate-500">Area shading demo placeholder</p>
      <div>📊 Shaded V–T Area</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="distance-under-velocity-graph"
      slideTitle="Why distance is area under velocity-time graph"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
