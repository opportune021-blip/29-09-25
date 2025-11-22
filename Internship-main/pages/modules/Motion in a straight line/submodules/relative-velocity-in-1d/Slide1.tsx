// Slide1.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'rv-what-learning',
    conceptId: 'rv-what',
    conceptName: 'Relative Velocity Intro',
    type: 'learning',
    description: 'Interactive simulation changing reference frames between ground and a moving car.'
  },
  {
    id: 'rv-what-quiz',
    conceptId: 'rv-what-quiz',
    conceptName: 'Relative Velocity Quiz',
    type: 'learning',
    description: 'Quiz on calculating relative velocity.'
  }
];

const quizQuestions = [
  {
    question: 'If Car A moves at 20 m/s East and Car B moves at 15 m/s East, what is the velocity of A relative to B?',
    options: ['35 m/s East', '5 m/s East', '5 m/s West', '0 m/s'],
    correctIndex: 1,
    explanation: 'v_A/B = v_A - v_B = 20 - 15 = 5 m/s. Since it is positive, direction is East (forward).'
  },
  {
    question: 'If Car A moves 20 m/s East and Car B moves 20 m/s West (opposite), what is the velocity of A relative to B?',
    options: ['0 m/s', '20 m/s East', '40 m/s East', '40 m/s West'],
    correctIndex: 2,
    explanation: 'v_A = +20, v_B = -20. v_A/B = 20 - (-20) = 40 m/s. They perceive each other moving very fast.'
  }
];

// --- ANIMATION COMPONENT (Reference Frame Camera) ---

const RelativeMotionLab = () => {
  // State
  const [vA, setVA] = useState(10); // Car A (Red)
  const [vB, setVB] = useState(5);  // Car B (Blue) - The Observer
  const [viewFrame, setViewFrame] = useState<'ground' | 'carB'>('ground');
  
  // Animation State
  const [posA, setPosA] = useState(0);
  const [posB, setPosB] = useState(0);
  const [gridOffset, setGridOffset] = useState(0);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = (time - lastTimeRef.current) / 1000;
      
      // Determine effective velocities based on Reference Frame
      let effVA, effVB, effGrid;

      if (viewFrame === 'ground') {
          // Ground Frame: Cars move at real speeds, Grid is static
          effVA = vA;
          effVB = vB;
          effGrid = 0;
      } else {
          // Car B Frame: Subtract vB from everything
          effVA = vA - vB; // Relative Velocity!
          effVB = 0;       // Car B is stationary in its own frame
          effGrid = -vB;   // World moves backwards
      }

      // Update Positions (wrapping for infinite track)
      setPosA(prev => (prev + effVA * dt * 20) % 100); // *20 for visual scaling
      setPosB(prev => (prev + effVB * dt * 20) % 100);
      setGridOffset(prev => (prev + effGrid * dt * 20) % 100);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [vA, vB, viewFrame]);

  // Calculation for Display
  const relVel = vA - vB;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Simulation Viewport */}
      <div className="w-full bg-slate-800 rounded-xl border-4 border-slate-600 shadow-xl relative mb-6 overflow-hidden h-48">
        
        {/* Overlay: Camera Status */}
        <div className="absolute top-2 right-2 z-20 bg-black/60 text-white px-2 py-1 rounded text-xs font-mono border border-white/20">
            <span className="text-slate-400">CAMERA: </span>
            <span className={viewFrame === 'ground' ? 'text-green-400' : 'text-blue-400'}>
                {viewFrame === 'ground' ? 'GROUND (FIXED)' : 'CAR B (MOVING)'}
            </span>
        </div>

        {/* Moving Grid (The Road) */}
        <div 
            className="absolute inset-0 h-full flex items-center"
            style={{ 
                backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 100%',
                backgroundPositionX: `${gridOffset}px` // Moves in relative frame
            }}
        >
            <div className="w-full h-px bg-white/20"></div>
        </div>

        {/* Car A (Red) */}
        <div 
            className="absolute top-8 transition-transform duration-75"
            style={{ 
                left: `${viewFrame === 'ground' ? posA : (50 + (posA - posB)) % 100}%`, // Logic to wrap relative pos visually is tricky, simplifying:
                // Actually, for visual simplicity in loop, let's just use the integrated posA.
                // In Relative mode, posA accumulates (vA-vB), so it naturally moves correctly relative to center.
                // We just need to center B.
/*                 left: viewFrame === 'ground' ? `${posA}%` : `calc(50% + ${posA}px)` // Using px offset for relative to keep B centered
 */             }} 
        >
             {/* If ground, use % loop. If relative, use relative px from center (needs distinct visual logic)
                 Let's simplify: Just use the 'pos' state which accumulates properly per frame based on 'effV'.
                 We just reset positions when switching frames to avoid jumps.
             */}
        </div>
        
        {/* SIMPLIFIED RENDER LOGIC */}
        {/* Car A (Red) - Target */}
        <div 
            className="absolute top-10 text-4xl"
            style={{ left: `${posA}%` }}
        >
            🚗
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-red-500 text-white px-1 rounded whitespace-nowrap">
                A: {viewFrame === 'ground' ? vA : (vA - vB)} m/s
            </div>
        </div>

        {/* Car B (Blue) - Observer */}
        <div 
            className="absolute bottom-10 text-4xl"
            style={{ left: `${posB}%` }}
        >
            🚙
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-blue-500 text-white px-1 rounded whitespace-nowrap">
                B: {viewFrame === 'ground' ? vB : 0} m/s
            </div>
        </div>

      </div>

      {/* 2. Math Dashboard */}
      <div className="w-full grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">Mathematical Formula</div>
              <div className="text-lg font-mono font-bold text-slate-700 dark:text-slate-200">
                  <InlineMath math="v_{A/B} = v_A - v_B" />
              </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-700 text-center">
              <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-300">Relative Velocity</div>
              <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-300">
                  {relVel} m/s
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          
          {/* Frame Toggle */}
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg shadow-sm">
              <button 
                onClick={() => { setViewFrame('ground'); setPosA(10); setPosB(10); setGridOffset(0); }}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${viewFrame === 'ground' ? 'bg-slate-200 text-slate-800 shadow-inner' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  🌎 Ground Frame
              </button>
              <button 
                onClick={() => { setViewFrame('carB'); setPosA(50); setPosB(50); setGridOffset(0); }}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${viewFrame === 'carB' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  🚙 Car B Frame (Observer)
              </button>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="flex justify-between text-xs font-bold text-red-600 mb-1">
                      Velocity A (Target)
                      <span>{vA} m/s</span>
                  </label>
                  <input 
                      type="range" min="-20" max="20" step="1"
                      value={vA} onChange={(e) => setVA(Number(e.target.value))}
                      className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
              </div>
              <div>
                  <label className="flex justify-between text-xs font-bold text-blue-600 mb-1">
                      Velocity B (You)
                      <span>{vB} m/s</span>
                  </label>
                  <input 
                      type="range" min="-20" max="20" step="1"
                      value={vB} onChange={(e) => setVB(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
              </div>
          </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

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
        interactionId: 'rv-what-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">What is Relative Velocity?</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Velocity is not absolute; it depends on who is measuring it. <strong>Relative Velocity</strong> is how fast an object moves as seen by another moving observer.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 text-center">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">The Formula</h4>
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="v_{A/B} = v_A - v_B" />
              </div>
              <p className="text-xs mt-3 text-slate-500 dark:text-slate-400">
                  Velocity of A <strong>relative to</strong> B.
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Sign Convention:</h4>
                <ul className="list-disc ml-5 text-sm space-y-1">
                    <li><strong>Forward:</strong> Positive (+)</li>
                    <li><strong>Backward:</strong> Negative (-)</li>
                    <li>If <InlineMath math="v_{A/B}" /> is negative, A appears to move backward from B's perspective.</li>
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
                    🎥 Frame Simulator
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
                     <RelativeMotionLab />
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
      slideId="relative-velocity-intro"
      slideTitle="What is Relative Velocity?"
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