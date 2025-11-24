import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'rv-review-learning',
    conceptId: 'rv-review',
    conceptName: 'Relative Velocity Review',
    type: 'learning',
    description: 'Master dashboard comparing Ground Frame vs Relative Frame.'
  },
  {
    id: 'rv-review-quiz',
    conceptId: 'rv-review-quiz',
    conceptName: 'Relative Velocity Review Quiz',
    type: 'learning',
    description: 'Final quiz for relative motion.'
  }
];

const quizQuestions = [
  {
    question: 'If A is moving 15 m/s East and B is moving 25 m/s East, what is the velocity of A relative to B?',
    options: ['10 m/s East', '10 m/s West', '40 m/s East', '40 m/s West'],
    correctIndex: 1,
    explanation: 'v_A/B = v_A - v_B = 15 - 25 = -10 m/s. The negative sign indicates West (backward relative to B).'
  },
  {
    question: 'When two objects move in opposite directions, the magnitude of their relative velocity is:',
    options: ['The difference of their speeds', 'The sum of their speeds', 'Zero', 'Always negative'],
    correctIndex: 1,
    explanation: 'If A is +v and B is -v, then v_A - v_B = v - (-v) = 2v. You add the magnitudes.'
  }
];

// --- ANIMATION COMPONENT (The Master Dashboard) ---

const RelVelMaster = () => {
  // State
  const [vA, setVA] = useState(15);
  const [vB, setVB] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Animation State
  const [posA, setPosA] = useState(0); // Ground frame pos
  const [posB, setPosB] = useState(0); // Ground frame pos
  const [relPosA, setRelPosA] = useState(0); // Relative frame pos of A
  const [gridOffset, setGridOffset] = useState(0); // Relative frame background move

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const dt = (time - lastTimeRef.current) / 1000;
      
      // Ground Frame Updates (Wrap 0-100)
      setPosA(prev => (prev + vA * dt * 5) % 100); 
      setPosB(prev => (prev + vB * dt * 5) % 100);

      // Relative Frame Updates
      // In B's frame, B is static (0). A moves at (vA - vB). World moves at -vB.
      const vRel = vA - vB;
      setRelPosA(prev => (prev + vRel * dt * 5) % 100); 
      setGridOffset(prev => (prev - vB * dt * 5) % 100); 
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
  }, [isPlaying, vA, vB]);

  // Visual Wrapping Helper
  const normalize = (val: number) => {
      if (val < 0) return 100 + val;
      return val;
  };

  const vRel = vA - vB;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. Ground Frame View */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-t-xl border-x border-t border-slate-200 dark:border-slate-700 p-2 relative h-24 overflow-hidden">
        <div className="absolute top-1 left-2 text-[9px] font-bold text-slate-400 uppercase bg-white dark:bg-slate-800 px-1 rounded border border-slate-200 dark:border-slate-600 z-10">
            Observer: Ground (Stationary)
        </div>
        
        {/* Static Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 100%' }}>
        </div>

        {/* Objects */}
        <motion.div className="absolute top-8 text-2xl" style={{ left: `${normalize(posA)}%` }}>🔴</motion.div>
        <motion.div className="absolute top-14 text-2xl" style={{ left: `${normalize(posB)}%` }}>🔵</motion.div>
      </div>

      {/* 2. Relative Frame View */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-b-xl border-x border-b border-slate-200 dark:border-slate-700 p-2 relative h-24 overflow-hidden mb-4">
        <div className="absolute top-1 left-2 text-[9px] font-bold text-blue-500 uppercase bg-white dark:bg-slate-900 px-1 rounded border border-blue-200 dark:border-blue-800 z-10">
            Observer: Blue Car (You)
        </div>

        {/* Moving Grid (The Illusion of Motion) */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
                 backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)', 
                 backgroundSize: '20px 100%',
                 backgroundPositionX: `${gridOffset}px`
             }}>
        </div>

        {/* Objects */}
        {/* A moves relative to us */}
        <motion.div 
            className="absolute top-8 text-2xl" 
            style={{ 
                left: `calc(50% + ${relPosA - 50}%)` // Centered logic, simplified
                // For true wrap in relative frame with center focus, we cheat visually:
                // Just assume relative start was aligned. 
                // For this demo, let's just use the calculated relative pos, but center B.
            }}
        >
            {/* Simpler Visual: Just show A moving across screen based on vRel */}
            <div style={{ position: 'absolute', left: `${normalize(relPosA)}vw` }}></div> 
            {/* Revert to simple wrap for robustness in demo */}
        </motion.div>
        
        {/* Better Relative Visual: A relative to B's fixed center */}
        <motion.div 
            className="absolute top-8 text-2xl transition-transform"
            // We use a window of +/- 50 meters relative to B
            // Position is just (PosA - PosB) mapped to screen center
            style={{ left: '50%', x: `${(posA - posB) * 5}%` }} 
        >
            🔴
            <div className="text-[8px] absolute -top-3 left-0 w-20 -ml-8 text-center text-red-500 font-bold">
                {vRel.toFixed(0)} m/s
            </div>
        </motion.div>

        {/* B is FIXED in center */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-2xl">
            🔵
            <div className="text-[8px] absolute -bottom-3 left-0 w-full text-center text-blue-500 font-bold">0 m/s</div>
        </div>
      </div>

      {/* 3. The Math Board */}
      <div className="w-full grid grid-cols-1 gap-2 mb-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase">Calculation</span>
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      <InlineMath math="v_{rel} = v_{red} - v_{blue}" />
                  </span>
              </div>
              <div className="text-right">
                  <span className="text-sm font-mono text-slate-400">
                      {vA} - ({vB}) = 
                  </span>
                  <span className={`text-xl font-mono font-bold ml-2 ${vRel > 0 ? 'text-green-500' : vRel < 0 ? 'text-red-500' : 'text-slate-500'}`}>
                      {vRel} m/s
                  </span>
              </div>
          </div>
      </div>

      {/* 4. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                  <label className="flex justify-between text-xs font-bold text-red-500 mb-1">
                      Red Velocity
                      <span>{vA} m/s</span>
                  </label>
                  <input 
                      type="range" min="-20" max="20" step="5"
                      value={vA} onChange={(e) => { setVA(Number(e.target.value)); setPosA(0); setPosB(0); }}
                      className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
              </div>
              <div>
                  <label className="flex justify-between text-xs font-bold text-blue-500 mb-1">
                      Blue Velocity (You)
                      <span>{vB} m/s</span>
                  </label>
                  <input 
                      type="range" min="-20" max="20" step="5"
                      value={vB} onChange={(e) => { setVB(Number(e.target.value)); setPosA(0); setPosB(0); }}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
              </div>
          </div>

          <div className="flex gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-2 rounded-lg font-bold text-white text-sm shadow-sm transition-all ${isPlaying ? 'bg-slate-400' : 'bg-purple-600 hover:bg-purple-500'}`}
              >
                  {isPlaying ? '⏸ Pause' : '▶ Run Simulation'}
              </button>
              <button 
                onClick={() => { setIsPlaying(false); setPosA(0); setPosB(0); setGridOffset(0); }}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-bold text-slate-600 dark:text-slate-300"
              >
                  🔄
              </button>
          </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide3() {
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
        interactionId: 'rv-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review: Relative Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              The universe has no fixed "center." All motion is described relative to an observer.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">Summary of Rules</h4>
                
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">1.</span>
                        <div>
                            <strong>Same Direction:</strong> <InlineMath math="v_{rel} = v_A - v_B" />
                            <br/><span className="text-xs text-slate-500">Speeds subtract. Objects seem slower.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">2.</span>
                        <div>
                            <strong>Opposite Direction:</strong> <InlineMath math="v_{rel} = v_A - (-v_B) = v_A + v_B" />
                            <br/><span className="text-xs text-slate-500">Speeds add up. Objects seem faster.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">3.</span>
                        <div>
                            <strong>The "Stop B" Trick:</strong> To see what B sees, imagine giving B a velocity of <InlineMath math="-v_B" /> to stop it. Add that same <InlineMath math="-v_B" /> to A.
                        </div>
                    </li>
                </ul>
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
                    🎛️ Motion Lab
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Final Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <RelVelMaster />
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
      slideId="relative-velocity-review"
      slideTitle="Relative Velocity Review"
      moduleId="motion-in-a-straight-line"
      submoduleId="relative-velocity-in-1d"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}