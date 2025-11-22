// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'calc-avg-vel-learning',
    conceptId: 'calc-avg-vel',
    conceptName: 'Calculating average velocity',
    type: 'learning',
    description: 'Understanding average speed and velocity.'
  },
  {
    id: 'calc-avg-vel-quiz',
    conceptId: 'calc-avg-vel-quiz',
    conceptName: 'Average velocity quiz',
    type: 'learning',
    description: 'Quiz on average speed and velocity.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Average speed = total distance / total time. True or false?',
    options: ['True', 'False'],
    correctIndex: 0
  },
  {
    question: 'If displacement = 20 m and time = 5 s, average velocity is:',
    options: ['2 m/s', '4 m/s', '5 m/s', '10 m/s'],
    correctIndex: 1
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Average Speed & Velocity</h2>

      <p className="text-slate-600 mb-3">
        <strong>Average speed</strong> = total distance / total time
      </p>
      <p className="text-slate-600 mb-3">
        <strong>Average velocity</strong> = displacement / time
      </p>

      <div className="bg-blue-50 p-4 rounded">
        <p className="font-medium">Key difference:</p>
        <ul className="list-disc ml-5">
          <li>Speed ignores direction.</li>
          <li>Velocity depends on direction.</li>
        </ul>
      </div>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500 mb-4">Move sliders to change distance and displacement.</p>
      <div className="border p-4 rounded">
        Placeholder UI: Distance & Time sliders  
        <br />  
        <span className="text-3xl">🎚️</span>
      </div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="average-velocity-calculation"
      slideTitle="Calculating average velocity or speed"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
