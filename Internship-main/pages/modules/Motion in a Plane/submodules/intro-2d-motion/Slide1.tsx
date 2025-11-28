import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'intro-2d-motion-learning',
    conceptId: 'intro-2d-motion',
    conceptName: 'Introduction to 2D Motion',
    type: 'learning',
    description: 'Visualizing how horizontal and vertical motions combine to form a 2D trajectory.'
  },
  {
    id: 'intro-2d-motion-quiz',
    conceptId: 'intro-2d-motion-quiz',
    conceptName: '2D Motion Quiz',
    type: 'learning',
    description: 'Quiz on the definition and independence of 2D motion.'
  }
];

const quizQuestions = [
  {
    question: 'Which of the following best describes motion in a plane?',
    options: [
      'Motion along a straight line only.',
      'Motion where only the vertical coordinate changes.',
      'Motion involving simultaneous changes in two independent coordinates (x and y).',
      'Motion where velocity is always constant.'
    ],
    correctIndex: 2,
    explanation: 'Motion in a plane (2D motion) is defined by changes in both x and y coordinates simultaneously, like a projectile or a car turning.'
  },
  {
    question: 'The "Principle of Independence of Motion" states that:',
    options: [
      'Horizontal motion affects vertical motion.',
      'Motion along the x-axis and y-axis are independent of each other.',
      'Gravity affects both horizontal and vertical velocities.',
      'An object can only move in one dimension at a time.'
    ],
    correctIndex: 1,
    explanation: 'The key to analyzing 2D motion is that the horizontal (x) and vertical (y) components act independently. For example, gravity only affects the vertical component.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

const Motion2DPlayground = () => {
  // Physics State
  const [velX, setVelX] = useState(2); // m/s
  const [velY, setVelY] = useState(2); // m/s
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simulation State
  const [position, setPosition] = useState({ x: 10, y: 10 }); // % coordinates (0-100)
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]);

  // Refs for animation loop
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // The Physics Loop
  const updatePhysics = (time: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (time - lastTimeRef.current) / 1000;
      
      setPosition(prev => {
        // Simple kinematic equation: s = ut (since a=0 for this basic intro)
        // Scaling factor: 10 units per meter for visualization
        const newX = prev.x + (velX * deltaTime * 10); 
        const newY = prev.y + (velY * deltaTime * 10);

        // Boundary check (stop if hits edge)
        if (newX > 95 || newY > 95) {
          setIsPlaying(false);
          return prev;
        }

        return { x: newX, y: newY };
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    if (isPlaying) {
      // Add current position to trail (limit to last 50 points for performance)
      setTrail(prev => [...prev.slice(-49), position]);
    }
  }, [position, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updatePhysics);
    } else {
      lastTimeRef.current = undefined; // Reset time tracking on pause
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, velX, velY]);

  // Handlers
  const resetSim = () => {
    setIsPlaying(false);
    setPosition({ x: 10, y: 10 });
    setTrail([]);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
      
        {/* 1. The 2D Plane (Grid) */}
        <div className="relative w-full aspect-video bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600 mb-4 group shadow-sm">
          
          {/* Grid Lines (CSS only) */}
          <div className="absolute inset-0 opacity-20" 
               style={{backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>

          {/* Axes */}
          <div className="absolute left-[10%] bottom-0 top-0 w-0.5 bg-slate-400"></div> {/* Y Axis */}
          <div className="absolute bottom-[10%] left-0 right-0 h-0.5 bg-slate-400"></div> {/* X Axis */}

          {/* Trail (Rendered as div dots) */}
          {trail.map((point, index) => (
            <div 
              key={index}
              className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60"
              style={{ 
                left: `${point.x}%`, 
                bottom: `${point.y}%`,
                transform: 'translate(-50%, 50%)'
              }}
            />
          ))}

          {/* The Object (Ball) */}
          <motion.div 
            className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-lg z-10 border-2 border-white dark:border-slate-900"
            style={{ 
              left: `${position.x}%`, 
              bottom: `${position.y}%`,
              transform: 'translate(-50%, 50%)'
            }}
          >
             {/* Velocity Vector Arrow (Resultant) - Pure CSS Triangle */}
             <div className="absolute top-1/2 left-1/2 h-0.5 bg-black dark:bg-white origin-left"
                  style={{
                    width: '30px',
                    transform: `rotate(${-Math.atan2(velY, velX) * (180/Math.PI)}deg)`
                  }}
             >
               <div className="absolute right-0 -top-[3px] w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-black dark:border-l-white border-b-[4px] border-b-transparent"></div>
             </div>
          </motion.div>

          {/* Component Shadows (Projectiles on Axes) */}
          {/* X-Component Shadow */}
          <motion.div 
            className="absolute w-4 h-4 bg-red-500/50 rounded-full blur-[1px]"
            style={{ 
              left: `${position.x}%`, 
              bottom: '10%', // Fixed on X-axis line
              transform: 'translate(-50%, 50%)' 
            }}
          />
          {/* Y-Component Shadow */}
          <motion.div 
            className="absolute w-4 h-4 bg-green-500/50 rounded-full blur-[1px]"
            style={{ 
              left: '10%', // Fixed on Y-axis line
              bottom: `${position.y}%`, 
              transform: 'translate(-50%, 50%)' 
            }}
          />

          {/* Labels */}
          <div className="absolute bottom-2 right-2 text-xs font-mono text-slate-400">X-Axis</div>
          <div className="absolute top-2 left-2 text-xs font-mono text-slate-400">Y-Axis</div>

        </div>

        {/* 2. Controls */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Velocity Controls */}
          <div className="space-y-3">
             {/* Vx Control */}
             <div className="bg-red-50 dark:bg-red-900/10 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="flex justify-between text-xs font-bold text-red-600 dark:text-red-400 mb-1">
                  <span>Horizontal Velocity (<InlineMath>v_x</InlineMath>)</span>
                  <span>{velX} m/s</span>
                </div>
                <input 
                  type="range" min="0" max="5" step="0.5" 
                  value={velX} onChange={(e) => setVelX(parseFloat(e.target.value))}
                  disabled={isPlaying}
                  className="w-full h-1.5 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
             </div>

             {/* Vy Control */}
             <div className="bg-green-50 dark:bg-green-900/10 p-2 rounded-lg border border-green-100 dark:border-green-900/30">
                <div className="flex justify-between text-xs font-bold text-green-600 dark:text-green-400 mb-1">
                  <span>Vertical Velocity (<InlineMath>v_y</InlineMath>)</span>
                  <span>{velY} m/s</span>
                </div>
                <input 
                  type="range" min="0" max="5" step="0.5" 
                  value={velY} onChange={(e) => setVelY(parseFloat(e.target.value))}
                  disabled={isPlaying}
                  className="w-full h-1.5 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
             </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col justify-center gap-2">
              <div className="flex gap-2">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                >
                    {isPlaying ? "⏸ Pause" : "▶ Start Motion"}
                </button>
                <button 
                    onClick={resetSim}
                    className="px-4 py-2 bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-lg text-sm font-bold transition-colors"
                >
                    🔄 Reset
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-500 mt-1">
                Notice how the red shadow follows X and green shadow follows Y independently.
              </p>
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

  // --- QUIZ LOGIC HANDLERS ---
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
        interactionId: 'intro-2d-motion-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What is Motion in a Plane?</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <p>
              So far, we have studied motion in a straight line (1D). But in the real world, objects often move in two dimensions simultaneously—like a football being kicked or a car turning a corner.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-base text-slate-700 dark:text-slate-300 mb-2 font-bold">
                 Definition:
              </p>
              <p className="text-sm">
                 Motion in a plane (or 2D motion) refers to motion where <strong>two coordinates</strong> (usually x and y) change simultaneously with time.
              </p>
              <div className="text-center py-3">
                 <InlineMath math="\vec{r} = x\hat{i} + y\hat{j}" />
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-base">The Golden Rule: Independence</h3>
                <p className="text-sm">
                    The most important concept to master is that the motion along the horizontal axis (x) is <strong>completely independent</strong> of the motion along the vertical axis (y).
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                    <li><InlineMath>v_x</InlineMath> only changes if there is acceleration in X.</li>
                    <li><InlineMath>v_y</InlineMath> only changes if there is acceleration in Y.</li>
                    <li>They "don't talk to each other".</li>
                </ul>
            </div>

          </div>
        </div>
        
        {/* Right Panel: Interactive */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[550px]">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🧪 Simulation
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Knowledge Check
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    <div className="flex-grow flex flex-col items-center justify-center h-full">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2D Motion Composer</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Set horizontal and vertical velocities to see how they combine.</p>
                        <Motion2DPlayground />
                    </div>
                ) : (
                    // Quiz Layout (Same as reference)
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
      slideId="what-is-2d-motion"
      slideTitle="What is 2D motion?"
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