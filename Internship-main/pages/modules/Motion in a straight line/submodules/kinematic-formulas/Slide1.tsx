// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'kf-avg-vel-learning',
    conceptId: 'kf-avg-vel',
    conceptName: 'Average Velocity (Constant Acceleration)',
    type: 'learning',
    description: 'Understanding average velocity under constant acceleration.'
  },
  {
    id: 'kf-avg-vel-quiz',
    conceptId: 'kf-avg-vel-quiz',
    conceptName: 'Average Velocity Quiz',
    type: 'learning',
    description: 'Quiz on average velocity formula.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Average velocity under constant acceleration is:',
    options: [
      '(u + v) / 2',
      'u × v',
      'u / t',
      'v² - u²'
    ],
    correctIndex: 0,
    explanation: 'For constant acceleration: v_avg = (u + v) / 2'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Average Velocity — Constant Acceleration</h2>
      <p className="text-slate-600 mb-3">
        When acceleration is constant, average velocity is simply the mean of initial and final velocities:
      </p>

      <p className="bg-blue-50 p-3 rounded font-semibold text-center">
        v<sub>avg</sub> = (u + v) / 2
      </p>
    </div>
  );

  const explore = (
    <div className="border rounded p-4 text-center">
      Velocity slider demo (placeholder)  
      <div className="text-4xl mt-2">🎚️</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="kf-average-velocity"
      slideTitle="Average velocity for constant acceleration"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
