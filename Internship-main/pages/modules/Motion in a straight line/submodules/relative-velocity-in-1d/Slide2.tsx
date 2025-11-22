// Slide2.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'rv-two-objects-learning',
    conceptId: 'rv-two-objects',
    conceptName: 'Two-Object Relative Velocity',
    type: 'learning',
    description: 'Interactive lab demonstrating vector subtraction for relative velocity.'
  },
  {
    id: 'rv-two-objects-quiz',
    conceptId: 'rv-two-objects-quiz',
    conceptName: 'Two-Object RV Quiz',
    type: 'learning',
    description: 'Quiz on calculating relative velocity in same and opposite directions.'
  }
];

const quizQuestions = [
  {
    question: 'Car A travels at 20 m/s East. Car B travels at 10 m/s East. What is the velocity of A relative to B?',
    options: ['10 m/s East', '30 m/s East', '-10 m/s West', 'Zero'],
    correctIndex: 0,
    explanation: 'v_{A/B} = v_A - v_B = 20 - 10 = 10 m/s (Positive means East).'
  },
  {
    question: 'Car A (20 m/s East) and Car B (10 m/s West) are approaching each other. What is the speed of approach?',
    options: ['10 m/s', '20 m/s', '30 m/s', '0 m/s'],
    correctIndex: 2,
    explanation: 'Speed of approach is the magnitude of relative velocity. |v_A - v_B| = |20 - (-10)| = |30| = 30 m/s.'
  }
];

// --- ANIMATION COMPONENT (Vector Algebra Sim) ---

const TwoObjectRelVelSim = () => {
  const [vA, setVA] = useState(20); // Car A velocity
  const [vB, setVB] = useState(10); // Car B velocity
  const [isPlaying, setIsPlaying] = useState(false);
  const [posA, setPosA] = useState(0);
  const [posB, setPosB] = useState(0);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const dt = (time - lastTimeRef.current) / 1000;
      
      // Update positions (wrapping)
      setPosA(prev => (prev + vA * dt * 5) % 100); // *5 scale
      setPosB(prev => (prev + vB * dt * 5) % 100);
    }
    lastTimeRef.current = time;
    if (isPlaying) requestRef.current = requestAnimationFrame(animate);
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

  // Wrap correction for visual smoothness
  const normalizePos = (p: number) => {
      if (p < 0) return 100 + p;
      return p;
  }

  // Math
  const relVel = vA - vB;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. World View */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6 p-4 overflow-hidden">
        <div className="absolute top-2 left-2 text-xs font-bold text-slate-400 uppercase">World View</div>
        
        {/* Track */}
        <div className="relative w-full h-24 mt-4 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
            {/* Road Markings */}
            <div className="absolute top-1/2 w-full border-t border-dashed border-white/30"></div>
            
            {/* Car A */}
            <motion.div 
                className="absolute top-2 text-3xl"
                style={{ left: `${normalizePos(posA)}%` }}
            >
                🏎️
                <div className="absolute -top-2 left-0 bg-red-500 text-white text-[9px] px-1 rounded whitespace-nowrap">A: {vA}</div>
            </motion.div>

            {/* Car B */}
            <motion.div 
                className="absolute bottom-2 text-3xl"
                style={{ left: `${normalizePos(posB)}%` }}
            >
                🚙
                <div className="absolute -bottom-2 left-0 bg-blue-500 text-white text-[9px] px-1 rounded whitespace-nowrap">B: {vB}</div>
            </motion.div>
        </div>
      </div>

      {/* 2. Vector Math Visualizer */}
      <div className="w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 relative h-40 flex items-center justify-center">
          <div className="absolute top-2 left-2 text-xs font-bold text-slate-400 uppercase">Vector Math (A - B)</div>
          
          <div className="relative w-full max-w-xs h-20 flex flex-col items-center justify-center">
              {/* Vector A */}
              <div className="relative w-full h-8 flex items-center justify-center">
                  <div 
                    className="h-2 bg-red-500 rounded relative transition-all duration-300" 
                    style={{ width: `${Math.abs(vA) * 3}px` }}
                  >
                      {/* Arrowhead A */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent ${vA > 0 ? 'right-[-4px] border-l-[6px] border-l-red-500' : 'left-[-4px] border-r-[6px] border-r-red-500'}`}></div>
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-red-500 font-bold"><InlineMath math="v_A" /></span>
                  </div>
              </div>

              {/* Vector -B */}
              <div className="relative w-full h-8 flex items-center justify-center">
                  <div 
                    className="h-2 bg-blue-300 border-2 border-blue-500 rounded relative transition-all duration-300 opacity-70" 
                    style={{ width: `${Math.abs(vB) * 3}px` }}
                  >
                      {/* Arrowhead -B (Inverted direction of vB) */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent ${vB < 0 ? 'right-[-6px] border-l-[6px] border-l-blue-500' : 'left-[-6px] border-r-[6px] border-r-blue-500'}`}></div>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-blue-500 font-bold"><InlineMath math="-v_B" /></span>
                  </div>
              </div>

              {/* Resultant Label */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200 px-2 py-1 rounded font-bold text-sm">
                  <InlineMath math="v_{rel} =" /> {relVel}
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Slider A */}
              <div>
                  <label className="flex justify-between text-xs font-bold text-red-600 mb-1">
                      Car A (Target) <span>{vA} m/s</span>
                  </label>
                  <input 
                      type="range" min="-30" max="30" step="5"
                      value={vA} onChange={(e) => setVA(Number(e.target.value))}
                      className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
              </div>
              {/* Slider B */}
              <div>
                  <label className="flex justify-between text-xs font-bold text-blue-600 mb-1">
                      Car B (Observer) <span>{vB} m/s</span>
                  </label>
                  <input 
                      type="range" min="-30" max="30" step="5"
                      value={vB} onChange={(e) => setVB(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
              </div>
          </div>

          <div className="text-center text-xs text-slate-500 mb-4">
              {vA * vB > 0 ? "Same Direction (Subtract magnitudes)" : "Opposite Direction (Add magnitudes)"}
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-2 rounded-lg font-bold text-white transition-colors ${isPlaying ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'}`}
          >
             {isPlaying ? 'Pause' : 'Start Moving'}
          </button>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide2() {
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
        interactionId: 'rv-two-objects-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Relative Velocity: Two Moving Objects</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              To find the velocity of A relative to B (<InlineMath math="v_{A/B}" />), we imagine B is stationary. We do this by <strong>subtracting B's velocity</strong> from both.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 text-center">
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B" />
              </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white border-b pb-1">Special Cases </h4>
                
                <div className="flex flex-col gap-2">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                        <strong className="text-green-800 dark:text-green-300 text-sm">1. Same Direction</strong>
                        <p className="text-xs mt-1">The relative speed is the <strong>difference</strong> of their speeds. They appear slow to each other.</p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-100 dark:border-orange-800">
                        <strong className="text-orange-800 dark:text-orange-300 text-sm">2. Opposite Direction</strong>
                        <p className="text-xs mt-1">The relative speed is the <strong>sum</strong> of their speeds. They zoom past each other quickly.</p>
                    </div>
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
                    📐 Vector Lab
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
                     <TwoObjectRelVelSim />
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
      slideId="relative-velocity-two-objects"
      slideTitle="Relative Velocity of Two Moving Objects"
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