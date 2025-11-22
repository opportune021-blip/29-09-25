// Slide4.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'kf-derive-s-learning',
    conceptId: 'kf-derive-s',
    conceptName: 'Deriving s = ut + ½at²',
    type: 'learning',
    description: 'Interactive geometric derivation of the displacement formula using graph area.'
  },
  {
    id: 'kf-derive-s-quiz',
    conceptId: 'kf-derive-s-quiz',
    conceptName: 'Derivation Quiz',
    type: 'learning',
    description: 'Quiz on the components of the kinematic derivation.'
  }
];

const quizQuestions = [
  {
    question: 'In a Velocity-Time graph, what does the area of the rectangular section represent?',
    options: [
      'Displacement due to acceleration (½at²)',
      'Displacement due to initial velocity (ut)',
      'Total displacement',
      'Average velocity'
    ],
    correctIndex: 1,
    explanation: 'The rectangle has height "u" and width "t", so its area is "ut". This represents the distance covered if the object didn\'t accelerate.'
  },
  {
    question: 'Why is the triangle\'s area ½at²?',
    options: [
      'Area of triangle = ½ × base × height = ½ × t × (v-u), and v-u = at',
      'It represents circle area',
      'It is just a constant',
      'Because gravity is involved'
    ],
    correctIndex: 0,
    explanation: 'The height of the triangle is the change in velocity (v-u). Since v = u + at, the height is "at". Area = ½ × t × at = ½at².'
  }
];

// --- ANIMATION COMPONENT (The Visualizer) ---

const DerivationVisualizer = () => {
  const [u, setU] = useState(10); // Initial velocity
  const [a, setA] = useState(2);  // Acceleration
  const [t, setT] = useState(8);  // Time

  // Calculated values
  const v = u + (a * t);
  const rectArea = u * t;
  const triArea = 0.5 * t * (v - u);
  const totalArea = rectArea + triArea;

  // SVG Scaling
  const MAX_T = 10;
  const MAX_V = 40; // Max possible velocity for viewbox scaling
  const GRAPH_WIDTH = 250;
  const GRAPH_HEIGHT = 180;

  // Coordinates
  const x0 = 30; // Origin X padding
  const y0 = GRAPH_HEIGHT + 10; // Origin Y padding (bottom)
  
  const scaleX = (val: number) => x0 + (val / MAX_T) * GRAPH_WIDTH;
  const scaleY = (val: number) => y0 - (val / MAX_V) * GRAPH_HEIGHT;

  // Points
  const pOrigin = { x: scaleX(0), y: scaleY(0) };
  const pU = { x: scaleX(0), y: scaleY(u) };
  const pT_base = { x: scaleX(t), y: scaleY(0) };
  const pT_rect = { x: scaleX(t), y: scaleY(u) };
  const pFinal = { x: scaleX(t), y: scaleY(v) };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Graph Area */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative mb-6 p-4">
        <div className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Velocity-Time Graph Area</div>
        
        <div className="flex justify-center">
            <svg width="300" height="220" className="overflow-visible">
                {/* Axes */}
                <line x1={x0} y1={y0} x2={x0 + GRAPH_WIDTH} y2={y0} className="stroke-slate-400 stroke-2" markerEnd="url(#arrow)" />
                <line x1={x0} y1={y0} x2={x0} y2="10" className="stroke-slate-400 stroke-2" markerEnd="url(#arrow)" />
                
                {/* Labels */}
                <text x={x0 + GRAPH_WIDTH} y={y0 + 15} className="text-[10px] fill-slate-500 font-bold">Time (t)</text>
                <text x={x0 - 15} y="15" className="text-[10px] fill-slate-500 font-bold" transform={`rotate(-90, ${x0-15}, 15)`}>Velocity (v)</text>

                {/* Definitions */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" className="fill-slate-400" />
                    </marker>
                    <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="10" className="stroke-white/30" strokeWidth="1" />
                    </pattern>
                </defs>

                {/* SHAPE 1: The Rectangle (ut) */}
                <motion.path 
                    d={`M ${pOrigin.x} ${pOrigin.y} L ${pT_base.x} ${pT_base.y} L ${pT_rect.x} ${pT_rect.y} L ${pU.x} ${pU.y} Z`}
                    className="fill-blue-500/20 stroke-blue-500"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ d: `M ${pOrigin.x} ${pOrigin.y} L ${pT_base.x} ${pT_base.y} L ${pT_rect.x} ${pT_rect.y} L ${pU.x} ${pU.y} Z`, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {/* Rect Label */}
                <motion.text 
                    x={(pOrigin.x + pT_rect.x)/2} 
                    y={(pOrigin.y + pT_rect.y)/2} 
                    className="text-sm font-bold fill-blue-600" 
                    textAnchor="middle"
                    animate={{ x: (pOrigin.x + pT_rect.x)/2, y: (pOrigin.y + pT_rect.y)/2 }}
                >
                    Area = ut
                </motion.text>

                {/* SHAPE 2: The Triangle (1/2 at^2) */}
                <motion.path 
                    d={`M ${pU.x} ${pU.y} L ${pT_rect.x} ${pT_rect.y} L ${pFinal.x} ${pFinal.y} Z`}
                    className="fill-orange-500/20 stroke-orange-500"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ d: `M ${pU.x} ${pU.y} L ${pT_rect.x} ${pT_rect.y} L ${pFinal.x} ${pFinal.y} Z`, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Tri Label */}
                <motion.text 
                    x={(pU.x + pT_rect.x + pFinal.x)/3} 
                    y={(pU.y + pT_rect.y + pFinal.y)/3} 
                    className="text-sm font-bold fill-orange-600" 
                    textAnchor="middle"
                    dy="5" // Nudge down slightly
                    animate={{ x: (pU.x + pT_rect.x + pFinal.x)/3, y: (pU.y + pT_rect.y + pFinal.y)/3 }}
                >
                    Area = ½at²
                </motion.text>

                {/* Axis Values */}
                <text x={x0 - 5} y={pU.y + 4} textAnchor="end" className="text-[10px] fill-slate-500">u</text>
                <text x={x0 - 5} y={pFinal.y + 4} textAnchor="end" className="text-[10px] fill-slate-500">v</text>
                <text x={pT_base.x} y={y0 + 12} textAnchor="middle" className="text-[10px] fill-slate-500">t</text>

                {/* Height Annotation for Triangle */}
                <line x1={pT_rect.x + 10} y1={pT_rect.y} x2={pT_rect.x + 10} y2={pFinal.y} className="stroke-slate-400 stroke-1 stroke-dashed" />
                <text x={pT_rect.x + 15} y={(pT_rect.y + pFinal.y)/2} className="text-[10px] fill-slate-500" style={{writingMode: 'vertical-rl'}}>at</text>

            </svg>
        </div>
      </div>

      {/* 2. The Math Breakdown */}
      <div className="w-full grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700 flex flex-col justify-center items-center">
              <span className="text-xs font-bold text-blue-600 uppercase mb-1">Rectangle Area</span>
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300 mb-1">Base × Height</span>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-300"><InlineMath math="u \times t" /></span>
              <span className="text-xs text-slate-500 mt-1">= {rectArea.toFixed(0)} m</span>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-700 flex flex-col justify-center items-center">
              <span className="text-xs font-bold text-orange-600 uppercase mb-1">Triangle Area</span>
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300 mb-1">½ × Base × Height</span>
              <span className="text-lg font-bold text-orange-700 dark:text-orange-300"><InlineMath math="\frac{1}{2} \times t \times (at)" /></span>
              <span className="text-xs text-slate-500 mt-1">= {triArea.toFixed(0)} m</span>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Total Area (Displacement):</span>
              <span className="text-xl font-mono font-bold text-green-600 dark:text-green-400">
                  s = {totalArea.toFixed(0)} m
              </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      Initial Velocity (u)
                      <span>{u} m/s</span>
                  </label>
                  <input 
                      type="range" min="0" max="20" step="1"
                      value={u} onChange={(e) => setU(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
              </div>
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      Acceleration (a)
                      <span>{a} m/s²</span>
                  </label>
                  <input 
                      type="range" min="0" max="5" step="0.5"
                      value={a} onChange={(e) => setA(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
              </div>
          </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const currentQuestion = quizQuestions[currentQIndex];

  // --- QUIZ LOGIC ---
  const handleOptionClick = (index: number) => {
    if (showExplanation) return; 
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      handleInteractionComplete({
        interactionId: 'kf-derive-s-quiz',
        value: finalScore.toString(),
        timestamp: Date.now()
      });
    }
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // --- CONTENT RENDERING ---

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Deriving the Displacement Formula</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              We know that <strong>Area under a Velocity-Time graph = Displacement</strong>. Let's find this area geometrically.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">The Strategy</h4>
              <p className="text-sm mb-2">For an object accelerating from <InlineMath math="u" /> to <InlineMath math="v" />:</p>
              
              <ol className="list-decimal ml-5 text-sm space-y-2">
                  <li>
                      <strong>Rectangular Part:</strong> The velocity starts at <InlineMath math="u" />. Even without acceleration, it would cover <InlineMath math="s = ut" />.
                  </li>
                  <li>
                      <strong>Triangular Part:</strong> The extra velocity gained is <InlineMath math="at" />. The area of this "extra" triangle is <InlineMath math="\frac{1}{2} \times t \times at" />.
                  </li>
              </ol>
            </div>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Combining them gives the master formula:</div>
                <div className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-100">
                    <InlineMath math="s = ut + \frac{1}{2}at^2" />
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📐 Geometric Lab
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <DerivationVisualizer />
                ) : (
                    // Quiz View
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!quizCompleted ? (
                                <motion.div 
                                    key="question-card"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full max-w-md"
                                >
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
                                        <span>Score: {score}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
                                        {currentQuestion.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, idx) => {
                                            let btnClass = "w-full p-4 rounded-lg text-left border-2 transition-all ";
                                            if (showExplanation) {
                                                if (idx === currentQuestion.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200";
                                                else if (idx === selectedOption) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                                                else btnClass += "border-slate-200 dark:border-slate-700 opacity-50";
                                            } else {
                                                if (selectedOption === idx) btnClass += "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionClick(idx)}
                                                    disabled={showExplanation}
                                                    className={btnClass}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-sm">{option}</span>
                                                        {showExplanation && idx === currentQuestion.correctIndex && <span>✅</span>}
                                                        {showExplanation && idx === selectedOption && idx !== currentQuestion.correctIndex && <span>❌</span>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {showExplanation && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded text-sm text-slate-600 dark:text-slate-300">
                                            <strong>Explanation:</strong> {currentQuestion.explanation}
                                        </motion.div>
                                    )}

                                    <div className="mt-6">
                                        {!showExplanation ? (
                                            <button
                                                onClick={handleSubmitAnswer}
                                                disabled={selectedOption === null}
                                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-blue-500 transition-colors"
                                            >
                                                Submit Answer
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNextQuestion}
                                                className="w-full py-3 bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-opacity"
                                            >
                                                {currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="results"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="text-6xl mb-4">🏆</div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        You scored {score} out of {quizQuestions.length}
                                    </p>
                                    <button 
                                        onClick={resetQuiz}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors"
                                    >
                                        Retry Quiz
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="kf-derive-s"
      slideTitle="Deriving the Displacement Formula"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}