// Slide5.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'kf-choose-equation-learning',
    conceptId: 'kf-choose-equation',
    conceptName: 'Choosing Kinematic Equations',
    type: 'learning',
    description: 'When to use which kinematic formula.'
  },
  {
    id: 'kf-choose-equation-quiz',
    conceptId: 'kf-choose-equation-quiz',
    conceptName: 'Choosing Equation Quiz',
    type: 'learning',
    description: 'Quiz on identifying correct kinematic equations.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which formula is used when time is NOT known?',
    options: [
      's = ut + ½at²',
      'v = u + at',
      'v² = u² + 2as',
      'v = s / t'
    ],
    correctIndex: 2
  }
];

export default function Slide5() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choosing Kinematic Equations</h2>
      <p className="text-slate-600 mb-3">
        You select equations based on which variables are known.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>If time is missing → use v² = u² + 2as</li>
        <li>If acceleration is zero → use uniform motion equations</li>
        <li>If displacement is missing → use v = u + at</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      Flowchart placeholder  
      <div className="text-4xl mt-3">🧠</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="kf-choose-equation"
      slideTitle="Choosing kinematic equations"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
