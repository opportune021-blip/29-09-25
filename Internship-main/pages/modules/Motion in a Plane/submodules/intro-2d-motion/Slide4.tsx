import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'displacement-vector-sim',
    conceptId: 'displacement-vector',
    conceptName: 'Displacement Vector',
    type: 'learning',
    description: 'Interactive tool to visualize displacement as the difference between two position vectors.'
  },
  {
    id: 'displacement-vector-quiz',
    conceptId: 'displacement-vector-quiz',
    conceptName: 'Displacement Quiz',
    type: 'learning',
    description: 'Quiz on calculating displacement in 2D.'
  }
];

const quizQuestions = [
  {
    question: 'A particle moves from point A(2, 3) to point B(5, 7). What is the displacement vector?',
    options: [
      '3i + 4j',
      '7i + 10j',
      '-3i - 4j',
      '5i + 7j'
    ],
    correctIndex: 0,
    explanation: 'Displacement is Final - Initial. Δx = 5 - 2 = 3. Δy = 7 - 3 = 4. So, Δr = 3i + 4j.'
  },
  {
    question: 'How does the magnitude of displacement compare to the distance traveled?',
    options: [
      'Displacement is always greater than distance',
      'Displacement is always equal to distance',
      'Displacement is less than or equal to distance',
      'They are unrelated'
    ],
    correctIndex: 2,
    explanation: 'Displacement is the shortest straight-line path. Distance is the total path length. Therefore, magnitude of displacement ≤ distance.'
  }
];

// --- INTERACTIVE COMPONENT ---

const DisplacementPlayground = () => {
  // State for Point 1 (Initial) and Point 2 (Final)
  const [p1, setP1] = useState({ x: 2, y: 3 });
  const [p2, setP2] = useState({ x: 6, y: 6 });

  // Calculations
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Helper to convert cartesian unit to percentage (Assuming 0-10 scale for simplicity)
  const toPct = (val: number) => val * 10; 

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
        
        {/* Graph Area */}
        <div className="relative w-full aspect-square max-w-[350px] bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 mb-6 mx-auto overflow-hidden shadow-sm">
          
          {/* Grid */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
                 backgroundSize: '10% 10%'
               }}>
          </div>

          {/* Axes */}
          <div className="absolute bottom-0 top-0 left-0 w-[2px] bg-slate-800 dark:bg-slate-400"></div> {/* Y Axis at left edge for positive quadrant view */}
          <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-slate-800 dark:bg-slate-400"></div> {/* X Axis at bottom edge */}

          {/* SVG Layer for Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
             <defs>
               <marker id="arrowhead-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                 <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
               </marker>
               <marker id="arrowhead-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                 <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
               </marker>
               <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
               </marker>
             </defs>

             {/* r1 vector (Origin to P1) - Dashed/Faint */}
             <line 
               x1="0%" y1="100%" 
               x2={`${toPct(p1.x)}%`} y2={`${100 - toPct(p1.y)}%`}
               stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" opacity="0.6"
               markerEnd="url(#arrowhead-blue)"
             />

             {/* r2 vector (Origin to P2) - Dashed/Faint */}
             <line 
               x1="0%" y1="100%" 
               x2={`${toPct(p2.x)}%`} y2={`${100 - toPct(p2.y)}%`}
               stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" opacity="0.6"
               markerEnd="url(#arrowhead-green)"
             />

             {/* Displacement Vector (P1 to P2) - Bold Red */}
             <line 
               x1={`${toPct(p1.x)}%`} y1={`${100 - toPct(p1.y)}%`}
               x2={`${toPct(p2.x)}%`} y2={`${100 - toPct(p2.y)}%`}
               stroke="#ef4444" strokeWidth="3"
               markerEnd="url(#arrowhead-red)"
             />
          </svg>

          {/* Draggable Point P1 */}
          <div 
             className="absolute w-6 h-6 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-700 shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
             style={{ left: `${toPct(p1.x)}%`, bottom: `${toPct(p1.y)}%`, transform: 'translate(-50%, 50%)' }}
             title="Initial Position (r1)"
          >
             1
          </div>

          {/* Draggable Point P2 */}
          <div 
             className="absolute w-6 h-6 bg-green-100 border-2 border-green-500 rounded-full flex items-center justify-center text-[10px] font-bold text-green-700 shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
             style={{ left: `${toPct(p2.x)}%`, bottom: `${toPct(p2.y)}%`, transform: 'translate(-50%, 50%)' }}
             title="Final Position (r2)"
          >
             2
          </div>

          {/* Labels */}
          <div className="absolute text-xs text-blue-500 font-bold" style={{ left: `${toPct(p1.x/2)}%`, bottom: `${toPct(p1.y/2)}%` }}>r₁</div>
          <div className="absolute text-xs text-green-500 font-bold" style={{ left: `${toPct(p2.x/2) + 5}%`, bottom: `${toPct(p2.y/2)}%` }}>r₂</div>
          <div className="absolute text-sm text-red-600 font-bold bg-white/80 dark:bg-slate-900/80 px-1 rounded" 
               style={{ left: `${toPct((p1.x + p2.x)/2)}%`, bottom: `${toPct((p1.y + p2.y)/2)}%`, transform: 'translate(-50%, 50%)' }}>
               Δr
          </div>

        </div>

        {/* Controls & Math */}
        <div className="space-y-4">
           
           {/* Sliders Grid */}
           <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-1 mb-1">
                 Initial Position (P1)
              </div>
              <div>
                 <label className="text-[10px] text-blue-600 font-bold block">x₁: {p1.x}</label>
                 <input type="range" min="0" max="10" step="1" value={p1.x} onChange={(e) => setP1({...p1, x: Number(e.target.value)})} className="w-full h-1 bg-blue-200 rounded accent-blue-500" />
              </div>
              <div>
                 <label className="text-[10px] text-blue-600 font-bold block">y₁: {p1.y}</label>
                 <input type="range" min="0" max="10" step="1" value={p1.y} onChange={(e) => setP1({...p1, y: Number(e.target.value)})} className="w-full h-1 bg-blue-200 rounded accent-blue-500" />
              </div>

              <div className="col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-1 mb-1 mt-2">
                 Final Position (P2)
              </div>
              <div>
                 <label className="text-[10px] text-green-600 font-bold block">x₂: {p2.x}</label>
                 <input type="range" min="0" max="10" step="1" value={p2.x} onChange={(e) => setP2({...p2, x: Number(e.target.value)})} className="w-full h-1 bg-green-200 rounded accent-green-500" />
              </div>
              <div>
                 <label className="text-[10px] text-green-600 font-bold block">y₂: {p2.y}</label>
                 <input type="range" min="0" max="10" step="1" value={p2.y} onChange={(e) => setP2({...p2, y: Number(e.target.value)})} className="w-full h-1 bg-green-200 rounded accent-green-500" />
              </div>
           </div>

           {/* Result Box */}
           <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30 text-center">
              <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                 <InlineMath math={`\\Delta \\vec{r} = (${p2.x} - ${p1.x})\\hat{i} + (${p2.y} - ${p1.y})\\hat{j}`} />
              </div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                 <InlineMath math={`\\Delta \\vec{r} = ${deltaX}\\hat{i} ${deltaY >= 0 ? '+' : ''} ${deltaY}\\hat{j}`} />
              </div>
              <div className="text-xs text-slate-500">
                 Magnitude: <InlineMath math={`|\\Delta \\vec{r}| = \\sqrt{${deltaX}^2 + ${deltaY}^2} \\approx ${magnitude.toFixed(2)}`} />
              </div>
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
        interactionId: 'displacement-vector-quiz',
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

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Displacement in a Plane</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <p>
              When a particle moves from an initial position <InlineMath math="P_1" /> to a final position <InlineMath math="P_2" /> in a plane, the <strong>displacement</strong> is the vector connecting the start directly to the end.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <p className="text-base text-slate-700 dark:text-slate-300 mb-2 font-bold">
                 The Formula:
              </p>
              <div className="text-center py-2">
                 <BlockMath math="\Delta \vec{r} = \vec{r}_2 - \vec{r}_1" />
                 <BlockMath math="\Delta \vec{r} = (x_2 - x_1)\hat{i} + (y_2 - y_1)\hat{j}" />
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Important Properties:</h3>
                <ul className="space-y-3 list-disc pl-5">
                    <li>It represents the <strong>shortest path</strong> between two points.</li>
                    <li>It is independent of the origin (the red vector stays the same even if you move the axes).</li>
                    <li>
                      <InlineMath math="\Delta x" /> is the horizontal displacement.
                      <br/>
                      <InlineMath math="\Delta y" /> is the vertical displacement.
                    </li>
                </ul>
            </div>

          </div>
        </div>
        
        {/* Right Panel: Interactive */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📍 Visualize
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
                    <div className="flex-grow flex flex-col items-center justify-center h-full">
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Displacement Calculator</h3>
                         <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
                            Move the Initial (1) and Final (2) points to see the displacement vector (red).
                         </p>
                         <DisplacementPlayground />
                    </div>
                ) : (
                    // Quiz Layout
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
}