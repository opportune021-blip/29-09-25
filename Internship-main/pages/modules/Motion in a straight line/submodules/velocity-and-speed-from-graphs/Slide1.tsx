import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- 1. DATA & CONFIG ---

const interactions: Interaction[] = [
  {
    id: 'instantaneous-speed-velocity-learning',
    conceptId: 'instantaneous-speed-velocity',
    conceptName: 'Instantaneous Speed & Velocity',
    type: 'learning',
    description: 'Understanding instantaneous values on motion graphs.'
  },
  {
    id: 'instantaneous-speed-velocity-quiz',
    conceptId: 'instantaneous-speed-velocity-quiz',
    conceptName: 'Instantaneous Quiz',
    type: 'learning',
    description: 'Quiz on instantaneous velocity.'
  }
];

const quizQuestions = [
  {
    question: 'Instantaneous velocity at a point on a position-time graph is given by:',
    options: ['The area under the graph', 'The slope at that point', 'The y-value of the graph', 'The intercept'],
    correctIndex: 1,
    explanation: 'Instantaneous velocity = slope of x–t graph at that point.'
  }
];

// --- 2. ANIMATION COMPONENT (The Lab) ---

const TangentSlopeLab = () => {
  // State: t represents time (0 to 100%)
  const [t, setT] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // --- PHYSICS MATH ---
  // Position x = sin(t)
  // Velocity v = cos(t)
  
  // Map slider (0-100) to Radians (0 to 2*PI)
  const angle = (t / 100) * 2 * Math.PI;
  const position = Math.sin(angle); 
  const velocity = Math.cos(angle);

  // --- ANIMATION LOOP ---
  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const dt = (time - lastTimeRef.current) / 1000;
      setT(prev => (prev + dt * 10) % 100); // Wrap 0-100
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying]);

  // --- SVG HELPERS ---
  const svgWidth = 300;
  const svgHeight = 150;
  const centerY = svgHeight / 2;
  const amplitude = 50;

  const generateSinePath = () => {
    let path = `M 0 ${centerY}`;
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * svgWidth;
      const rad = (i / 100) * 2 * Math.PI;
      const y = centerY - Math.sin(rad) * amplitude;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const graphX = (t / 100) * svgWidth;
  const graphY = centerY - position * amplitude;
  
  // Tangent visual logic
  const tangentLength = 60;
  const dx_dt = svgWidth / (2 * Math.PI);
  const dy_dt = -velocity * amplitude; 
  const rotationRad = Math.atan2(dy_dt, dx_dt);
  const rotationDeg = rotationRad * (180 / Math.PI);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      
      {/* REAL WORLD (Top) */}
      <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative h-32 overflow-hidden">
        <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-500 uppercase">Real World Motion</div>
        
        <div className="absolute top-1/2 left-4 right-4 h-2 bg-slate-300 dark:bg-slate-700 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 h-4 w-0.5 bg-slate-400 transform -translate-y-1/2 z-0"></div>

        <motion.div 
          className="absolute top-1/2 left-1/2 w-12 h-8 -mt-4 -ml-6 bg-blue-500 rounded-lg shadow-md z-10 flex items-center justify-center"
          style={{ x: position * 100 }} 
        >
          <span className="text-white text-xs">🚗</span>
          {/* Velocity Vector */}
          <div 
             className={`absolute h-1 top-1/2 left-1/2 origin-left transition-colors ${velocity > 0 ? 'bg-green-500' : 'bg-red-500'}`}
             style={{ 
               width: `${Math.abs(velocity) * 40}px`,
               transform: `rotate(${velocity >= 0 ? 0 : 180}deg) translateY(-50%)`
             }}
          >
            <div className={`absolute right-0 -top-1 w-2 h-3 ${velocity > 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}}></div>
          </div>
        </motion.div>
        
        <div className="absolute bottom-2 right-2 text-xs font-mono text-slate-600 dark:text-slate-400 text-right">
          <div>Pos (x): {position.toFixed(2)}m</div>
          <div className={velocity > 0.1 ? 'text-green-600 font-bold' : velocity < -0.1 ? 'text-red-500 font-bold' : 'text-slate-500'}>
            Vel (v): {velocity.toFixed(2)}m/s
          </div>
        </div>
      </div>

      {/* GRAPH WORLD (Bottom) */}
      <div className="flex-grow bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 relative flex flex-col">
        <div className="absolute top-2 left-2 text-[10px] font-bold text-purple-600 uppercase">Position-Time Graph</div>

        <div className="flex-grow flex items-center justify-center relative">
           <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              <line x1="0" y1={centerY} x2={svgWidth} y2={centerY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <path d={generateSinePath()} fill="none" stroke="#3b82f6" strokeWidth="3" />
              <line 
                x1={graphX - tangentLength} 
                y1={graphY} 
                x2={graphX + tangentLength} 
                y2={graphY} 
                stroke="#ef4444" 
                strokeWidth="2"
                strokeDasharray="2,2"
                transform={`rotate(${rotationDeg} ${graphX} ${graphY})`}
              />
              <circle cx={graphX} cy={graphY} r="5" fill="#ef4444" stroke="white" strokeWidth="2" />
           </svg>
           
           <div 
             className="absolute pointer-events-none bg-red-100 text-red-800 text-[10px] px-1 rounded border border-red-200"
             style={{ left: `${(t/100)*100}%`, top: '10%', transform: 'translateX(-50%)' }}
           >
             Slope = {velocity.toFixed(2)}
           </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200"
            >
               {isPlaying ? '⏸' : '▶'}
            </button>
            <input 
              type="range" min="0" max="100" step="0.1"
              value={t}
              onChange={(e) => { setIsPlaying(false); setT(parseFloat(e.target.value)); }}
              className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---

export default function Slide1() {
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

  // Quiz Handlers
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
        interactionId: 'instantaneous-speed-velocity-quiz',
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

  // Main Content Layout
  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: THEORY */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Instantaneous Speed & Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Average velocity gives the "big picture." Instantaneous velocity is your speed at a specific split-second.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm uppercase">Geometric Definition</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                On a Position-Time graph (<InlineMath math="x-t"/>), instantaneous velocity is the <strong>slope of the tangent line</strong>.
              </p>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span><strong>Steep Slope:</strong> High Velocity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span><strong>Flat Slope:</strong> Zero Velocity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span><strong>Negative Slope:</strong> Moving Backwards</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* RIGHT: INTERACTIVE TABS */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
          
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setViewMode('explore')}
              className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              🎛️ Interactive Lab
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
                <TangentSlopeLab />
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {!quizCompleted ? (
                    <motion.div 
                      key="question-card"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="w-full max-w-md"
                    >
                      <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                        <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
                        <span>Score: {score}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">{currentQuestion.question}</h3>
                      
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                          let btnClass = "w-full p-4 rounded-lg text-left border-2 transition-all ";
                          if (showExplanation) {
                            if (idx === currentQuestion.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200";
                            else if (idx === selectedOption) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                            else btnClass += "border-slate-200 opacity-50";
                          } else {
                            btnClass += selectedOption === idx ? "bg-blue-100 border-blue-500 text-blue-800" : "bg-white border-slate-200 hover:border-blue-300";
                          }
                          return (
                            <button key={idx} onClick={() => handleOptionClick(idx)} disabled={showExplanation} className={btnClass}>
                              {option}
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
                          <button onClick={handleSubmitAnswer} disabled={selectedOption === null} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-blue-500 transition-colors">Submit Answer</button>
                        ) : (
                          <button onClick={handleNextQuestion} className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                            {currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="results" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                      <div className="text-6xl mb-4">🏆</div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h3>
                      <p className="text-slate-600 mb-6">You scored {score} out of {quizQuestions.length}</p>
                      <button onClick={resetQuiz} className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors">Retry Quiz</button>
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
      slideId="instantaneous-speed-velocity"
      slideTitle="Instantaneous speed and velocity"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}