import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- DATA & HELPERS ---

const TRIPLES = [
  { x: 3, y: 4 }, { x: -3, y: 4 }, { x: 4, y: -3 },
  { x: 5, y: 12 }, { x: -5, y: -12 },
  { x: 6, y: 8 }, { x: 8, y: 15 }, { x: -8, y: 15 }
];

const getRandomProblem = (isAdvanced: boolean) => {
  if (!isAdvanced) {
    return TRIPLES[Math.floor(Math.random() * TRIPLES.length)];
  } else {
    return {
      x: Math.floor(Math.random() * 20) - 10 || 5, 
      y: Math.floor(Math.random() * 20) - 10 || 5
    };
  }
};

export default function MagnitudeFromComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Game State
  const [problem, setProblem] = useState(TRIPLES[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // Calculations
  const actualMagnitude = Math.sqrt(problem.x ** 2 + problem.y ** 2);
  const isIntegerAnswer = Number.isInteger(actualMagnitude);

  // Grid Scaling for Visualization
  const maxCoord = Math.max(Math.abs(problem.x), Math.abs(problem.y), 10);
  const scale = 140 / maxCoord; // Scale to fit in ~300px box

  const slideInteraction: Interaction = {
    id: 'magnitude-components-practice',
    conceptId: 'magnitude-formula',
    conceptName: 'Magnitude Formula Practice',
    type: 'learning',
    description: 'Drill on calculating vector magnitude from components.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const checkAnswer = () => {
    const val = parseFloat(userAnswer);
    if (isNaN(val)) return;

    const tolerance = 0.1;
    if (Math.abs(val - actualMagnitude) < tolerance) {
      setStatus('correct');
      setStreak(s => s + 1);
      setShowSolution(true); 
      
      if (streak >= 2) {
         handleInteractionComplete({
           interactionId: 'magnitude-components-practice',
           value: 'mastered',
           timestamp: Date.now()
         });
      }
    } else {
      setStatus('wrong');
    }
  };

  const nextProblem = () => {
    const next = getRandomProblem(streak > 3);
    if (next.x === problem.x && next.y === problem.y) {
        setProblem({ x: next.y, y: -next.x });
    } else {
        setProblem(next);
    }
    
    setUserAnswer('');
    setStatus('idle');
    setShowSolution(false);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY (40%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Calculating Magnitude</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                From components to length using the Distance Formula.
            </p>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Formula Block */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">The Formula</h3>
                <div className="text-lg">
                    <BlockMath>{`|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}`}</BlockMath>
                </div>
            </div>

            {/* Explanation */}
            <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2">Why this works?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Since the x and y components are perpendicular, they form the legs of a right triangle. The vector itself is the hypotenuse.
                </p>
            </div>

            {/* Step-by-Step Example */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-2">Example: <InlineMath>{`\\vec{u} = \\langle -3, 4 \\rangle`}</InlineMath></h3>
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2">
                        <span className="font-bold text-blue-500">1.</span>
                        <span>Square components: <InlineMath>{`(-3)^2 = 9`}</InlineMath>, <InlineMath>{`4^2 = 16`}</InlineMath></span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-blue-500">2.</span>
                        <span>Add them: <InlineMath>{`9 + 16 = 25`}</InlineMath></span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-blue-500">3.</span>
                        <span>Square root: <InlineMath>{`\\sqrt{25} = 5`}</InlineMath></span>
                    </li>
                </ul>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                <strong>Remember:</strong> Squaring a negative number always gives a positive result!
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUAL & QUIZ (60%)         */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: VISUALIZATION (Animation) */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden flex items-center justify-center min-h-[300px]">
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: 'center center' }}>
            </div>
            
            {/* Axes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-slate-600"></div>
                <div className="h-full w-px bg-slate-600 absolute"></div>
            </div>

            {/* Dynamic Vector Graph */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 400 400">
                <defs>
                    <marker id="arrow-quiz" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#3B82F6" />
                    </marker>
                </defs>
                
                <g transform="translate(200, 200)">
                    {/* Components (Dashed) */}
                    <line x1={0} y1={0} x2={problem.x * scale} y2={0} stroke="#F97316" strokeWidth="2" strokeDasharray="4,4" opacity="0.8" />
                    <line x1={problem.x * scale} y1={0} x2={problem.x * scale} y2={-problem.y * scale} stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" opacity="0.8" />
                    
                    {/* The Vector */}
                    <motion.line 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        x1="0" y1="0" 
                        x2={problem.x * scale} y2={-problem.y * scale} 
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrow-quiz)" 
                    />

                    {/* Labels */}
                    <text x={problem.x * scale / 2} y={15} fill="#F97316" fontSize="12" fontWeight="bold" textAnchor="middle">{problem.x}</text>
                    <text x={problem.x * scale + (problem.x > 0 ? 10 : -10)} y={-problem.y * scale / 2} fill="#10B981" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{problem.y}</text>
                    
                    {/* Hypotenuse Label (Question Mark or Answer) */}
                    <AnimatePresence mode="wait">
                        {showSolution ? (
                            <motion.text
                                key="ans"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                x={problem.x * scale / 2 - 10} 
                                y={-problem.y * scale / 2 - 10} 
                                fill="#ffffff" fontSize="14" fontWeight="bold"
                                className="bg-slate-900"
                            >
                                {actualMagnitude.toFixed(isIntegerAnswer ? 0 : 1)}
                            </motion.text>
                        ) : (
                            <motion.text
                                key="qm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                x={problem.x * scale / 2 - 10} 
                                y={-problem.y * scale / 2 - 10} 
                                fill="#ffffff" fontSize="16" fontWeight="bold"
                            >
                                ?
                            </motion.text>
                        )}
                    </AnimatePresence>
                </g>
            </svg>
            
            <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">
                grid scale: auto
            </div>
        </div>

        {/* BOTTOM RIGHT: QUIZ INTERFACE */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 flex flex-col justify-between min-h-[250px]">
            
            {/* Header / Problem Statement */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Solve for Magnitude</h3>
                    <div className="text-3xl font-mono font-bold text-slate-800 dark:text-slate-100 mt-1">
                        <InlineMath>{`\\vec{v} = \\langle ${problem.x}, ${problem.y} \\rangle`}</InlineMath>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
                    <div className="text-xl font-bold text-orange-500">🔥 {streak}</div>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => {
                            setUserAnswer(e.target.value);
                            setStatus('idle');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        placeholder="?"
                        className={`w-full text-center text-2xl p-4 rounded-xl border-2 outline-none transition-all font-mono ${
                            status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800' :
                            status === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                            'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                        }`}
                        disabled={status === 'correct'}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                        |v|
                    </div>
                </div>

                {/* Actions */}
                {status === 'correct' ? (
                     <button
                        onClick={nextProblem}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>Next Problem</span>
                        <span>➜</span>
                    </button>
                ) : (
                    <button
                        onClick={checkAnswer}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                    >
                        Check Answer
                    </button>
                )}
            </div>
            
            {/* Feedback Message */}
            <div className="h-6 mt-2 text-center text-sm font-medium">
                {status === 'wrong' && <span className="text-red-500 animate-pulse">Try again! Remember to square root.</span>}
                {status === 'correct' && <span className="text-green-600">Correct! Great job.</span>}
            </div>

        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="mag-from-components"
      slideTitle="Vector magnitude from components"
      moduleId="vectors-prerequisite"
      submoduleId="magnitude-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}