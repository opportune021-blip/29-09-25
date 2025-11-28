import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'independence-principle-sim',
    conceptId: 'independence-principle',
    conceptName: 'Independence of Motion',
    type: 'learning',
    description: 'Simulation comparing free fall vs. horizontal projection.'
  },
  {
    id: 'independence-principle-quiz',
    conceptId: 'independence-principle-quiz',
    conceptName: 'Independence Quiz',
    type: 'learning',
    description: 'Quiz on the effect of horizontal velocity on fall time.'
  }
];

const quizQuestions = [
  {
    question: 'Two bullets are released simultaneously from the same height. Bullet A is dropped, while Bullet B is fired horizontally. Which hits the ground first?',
    options: [
      'Bullet A (Dropped)',
      'Bullet B (Fired)',
      'They hit at the same time',
      'Depends on the speed of the fired bullet'
    ],
    correctIndex: 2,
    explanation: 'Since both start with zero vertical velocity and are acted upon by the same gravity, their vertical motion is identical regardless of horizontal speed.'
  },
  {
    question: 'Does increasing the horizontal launch speed affect the time of flight?',
    options: [
      'Yes, it increases time of flight',
      'Yes, it decreases time of flight',
      'No, time of flight depends only on vertical height and gravity',
      'Only if air resistance is zero'
    ],
    correctIndex: 2,
    explanation: 'Horizontal motion is independent of vertical motion. Time of flight is determined solely by the vertical height and gravity ($t = \\sqrt{2h/g}$).'
  }
];

// --- SIMULATION COMPONENT ---

const IndependencePlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [horizontalSpeed, setHorizontalSpeed] = useState(4); // Speed for Ball B
  const [time, setTime] = useState(0);
  
  // Animation refs
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const GRAVITY = 9.8; // m/s² (scaled for visual)
  const SCALE = 50; // pixels per meter approx

  const updateAnimation = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds

    // Stop if hit bottom (approx 400px height / SCALE ~ 0.9s fall)
    // h = 1/2 gt^2 => t = sqrt(2h/g)
    // Let's just limit by visual bounds (e.g., t = 1.2s)
    if (elapsed > 1.2) {
      setIsPlaying(false);
      return;
    }

    setTime(elapsed);
    requestRef.current = requestAnimationFrame(updateAnimation);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(updateAnimation);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const resetSim = () => {
    setIsPlaying(false);
    setTime(0);
  };

  // Calculate positions
  // y = 0.5 * g * t^2
  // x = v * t
  const dropY = 0.5 * GRAVITY * time * time * SCALE;
  const projX = horizontalSpeed * time * SCALE;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
        
        {/* Simulation Area */}
        <div className="relative w-full h-[300px] bg-white dark:bg-slate-800 rounded-lg border-b-4 border-slate-400 dark:border-slate-600 mb-4 overflow-hidden shadow-sm">
          
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" 
               style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>

          {/* Reference Line (to show they are at same height) */}
          <div 
            className="absolute left-0 right-0 border-t border-dashed border-slate-400 dark:border-slate-500 opacity-50"
            style={{ top: `${dropY + 20}px` }} 
          />

          {/* Ball A: Dropped (Red) */}
          <div 
            className="absolute w-6 h-6 bg-red-500 rounded-full shadow-md z-10 flex items-center justify-center text-[8px] text-white font-bold"
            style={{ 
              top: `${dropY}px`, 
              left: '20%',
              transform: 'translate(-50%, 0)'
            }}
          >
            A
          </div>
          {/* Ghost Trail A */}
          <div className="absolute top-0 bottom-0 left-[20%] w-[1px] border-l border-dashed border-red-200 dark:border-red-900/30"></div>

          {/* Ball B: Projected (Blue) */}
          <div 
            className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-md z-10 flex items-center justify-center text-[8px] text-white font-bold"
            style={{ 
              top: `${dropY}px`, 
              left: `${20 + (projX / 5)}%`, // Scaling X for CSS %
              transform: 'translate(-50%, 0)'
            }}
          >
            B
          </div>

          {/* Floor Label */}
          <div className="absolute bottom-1 right-2 text-xs font-bold text-slate-400">GROUND</div>
          
          {/* Height Difference Label (Should be zero) */}
          <div className="absolute top-2 right-2 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs font-mono border border-slate-200 dark:border-slate-600">
             Δy = 0.00m
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
           
           <div className="space-y-2">
              <label className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Ball B Horizontal Speed</span>
                  <span className="text-blue-500">{horizontalSpeed} m/s</span>
              </label>
              <input 
                type="range" min="2" max="10" step="1"
                value={horizontalSpeed} onChange={(e) => setHorizontalSpeed(parseInt(e.target.value))}
                disabled={isPlaying || time > 0}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
              />
              <p className="text-[10px] text-slate-400">
                 Note: Does changing speed change when it hits the ground?
              </p>
           </div>

           <div className="flex gap-2 justify-end">
              <button 
                  onClick={() => setIsPlaying(true)}
                  disabled={isPlaying || time > 0}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                  ▶ Drop & Fire
              </button>
              <button 
                  onClick={resetSim}
                  className="px-4 py-2 bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-lg font-bold transition-colors"
              >
                  🔄 Reset
              </button>
           </div>

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
        interactionId: 'independence-principle-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Principle of Independence</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <p>
              Galileo discovered a fascinating property of motion: 
              <strong> The horizontal and vertical components of 2D motion act completely independently of each other.</strong>
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <h3 className="font-bold text-slate-800 dark:text-purple-200 mb-2">The Thought Experiment</h3>
              <p className="text-sm">
                 Imagine holding two balls at the same height.
              </p>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                 <li><strong>Ball A:</strong> Dropped straight down (Free Fall).</li>
                 <li><strong>Ball B:</strong> Thrown sideways with high speed.</li>
              </ul>
              <p className="text-sm mt-3 font-bold text-center text-purple-700 dark:text-purple-300">
                 Result: They hit the ground at exactly the same time!
              </p>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Why?</h3>
                <p className="text-sm">
                    Because gravity (<InlineMath math="g" />) acts only vertically. It pulls both balls down at the same rate (<InlineMath math="9.8 m/s^2" />). 
                </p>
                <p className="text-sm">
                    The horizontal velocity of Ball B (<InlineMath math="v_x" />) has <strong>zero effect</strong> on how fast it falls.
                </p>
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
                    🧪 Experiment
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
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">The Two-Ball Drop</h3>
                         <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
                            Ball A is dropped. Ball B is fired. Compare their vertical positions.
                         </p>
                         <IndependencePlayground />
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

  return (
    <SlideComponentWrapper
      slideId="principle-of-independence"
      slideTitle="The principle of independence"
      moduleId="motion-in-a-plane"
      submoduleId="intro-2d-motion"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}