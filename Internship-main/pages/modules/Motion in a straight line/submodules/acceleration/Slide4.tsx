// Slide4.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'a-t-learning',
    conceptId: 'a-t-graphs',
    conceptName: 'Acceleration-Time Graphs',
    type: 'learning',
    description: 'Understanding a–t graphs and the area under the curve.'
  },
  {
    id: 'a-t-quiz',
    conceptId: 'a-t-quiz',
    conceptName: 'Acceleration-Time Quiz',
    type: 'learning',
    description: 'Quiz on acceleration-time graphs.'
  }
];

const quizQuestions = [
  {
    question: 'The area under an Acceleration-Time (a-t) graph represents:',
    options: ['Velocity', 'Change in Velocity', 'Displacement', 'Time'],
    correctIndex: 1,
    explanation: 'Area = Height (a) × Width (t) = a × t = Δv (Change in Velocity).'
  },
  {
    question: 'If the acceleration is zero, what does the a-t graph look like?',
    options: [
      'A line going upwards',
      'A line on the X-axis (at zero)',
      'A vertical line',
      'A curved line'
    ],
    correctIndex: 1,
    explanation: 'Zero acceleration means the value on the Y-axis is 0, so the line lies flat on the time axis.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

const ATGraphSimulator = () => {
  // User inputs
  const [accelInput, setAccelInput] = useState(2); // Y-axis height
  const [timeInput, setTimeInput] = useState(5);   // X-axis width
  
  // Animation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100% of selected time

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Calculate final physics values
  const finalVelocity = accelInput * timeInput;

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      setProgress(prev => {
        const realTimeDuration = 2.0; 
        const step = (deltaTime / realTimeDuration) * 100;
        const newProgress = prev + step;

        if (newProgress >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return newProgress;
      });
    }
    lastTimeRef.current = timestamp;
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
  }, [isPlaying]);

  const handlePlay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  // --- SVG CALCS ---
  // Adjusted Viewbox to 0 0 140 120 to fit Graph, Tank, and Track
  
  // Graph Dimensions
  const graphWidth = 90;
  const graphHeight = 80;
  
  // Scales
  const rectHeight = (accelInput / 5) * graphHeight; 
  const rectWidth = (timeInput / 10) * graphWidth;
  
  // Animated width based on progress
  const animatedWidth = (rectWidth * progress) / 100;
  
  // Current velocity based on progress
  const currentVelDisplay = (finalVelocity * progress) / 100;
  
  // PHYSICS CALCULATION FOR CAR:
  // Distance is proportional to t^2. 
  // If progress is linear time (t), position is progress^2.
  // We normalize this so the car travels the full track length by the end.
  const particlePos = Math.pow(progress / 100, 2) * graphWidth;

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Graph Container */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 shadow-sm relative flex flex-col min-h-[300px]">
        <div className="flex justify-between items-start mb-2">
             <h4 className="text-xs font-bold text-slate-400 uppercase">Acceleration vs Time</h4>
             <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded text-xs font-mono">
               Area = <InlineMath math="\Delta v" /> = {currentVelDisplay.toFixed(1)} m/s
             </div>
        </div>

        <div className="relative flex-grow w-full pb-2">
           {/* SVG Container */}
           <svg className="w-full h-full overflow-visible" viewBox="0 0 130 120" preserveAspectRatio="xMidYMid meet">
              
              {/* --- GROUP 1: The Graph (Top Left) --- */}
              <g transform="translate(10, 5)">
                  {/* Grid/Axes */}
                  <line x1="0" y1="0" x2="0" y2={graphHeight} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                  <line x1="0" y1={graphHeight} x2={graphWidth + 10} y2={graphHeight} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                  
                  {/* Axis Labels */}
                  <text x="-5" y={graphHeight/2} className="text-[6px] fill-slate-400 -rotate-90" textAnchor="middle">Accel (a)</text>
                  <text x={graphWidth/2} y={graphHeight + 12} className="text-[6px] fill-slate-400" textAnchor="middle">Time (t)</text>

                  {/* The Target Area (Dashed Outline) */}
                  <rect 
                    x="0" 
                    y={graphHeight - rectHeight} 
                    width={rectWidth} 
                    height={rectHeight} 
                    className="fill-none stroke-slate-300 stroke-dashed" 
                    strokeWidth="0.5"
                  />

                  {/* The Animated Fill Area */}
                  <rect 
                    x="0" 
                    y={graphHeight - rectHeight} 
                    width={animatedWidth} 
                    height={rectHeight} 
                    className="fill-purple-500/40" 
                  />

                  {/* The "Scanner" Line - Visualizes integration happening */}
                  <line 
                    x1={animatedWidth} y1={graphHeight - rectHeight} 
                    x2={animatedWidth} y2={graphHeight} 
                    className="stroke-purple-600"
                    strokeWidth="1.5"
                    style={{ opacity: isPlaying || progress > 0 ? 1 : 0 }}
                  />

                  {/* Labels */}
                  <text x="-3" y={graphHeight - rectHeight + 2} className="text-[6px] fill-slate-500 text-right" textAnchor="end">{accelInput}</text>
                  <text x={rectWidth} y={graphHeight + 6} className="text-[6px] fill-slate-500" textAnchor="middle">{timeInput}s</text>
              </g>

              {/* --- GROUP 2: Velocity Tank (Right Side) --- */}
              <g transform="translate(115, 5)">
                  {/* Label */}
                  <text x="5" y="-2" className="text-[5px] fill-slate-500 font-bold" textAnchor="middle">VELOCITY</text>
                  
                  {/* Tank Background */}
                  <rect x="0" y="0" width="10" height={graphHeight} rx="2" className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />
                  
                  {/* Liquid Fill */}
                  <rect 
                    x="0" 
                    y={graphHeight - (graphHeight * (progress/100))} 
                    width="10" 
                    height={graphHeight * (progress/100)} 
                    rx="2" 
                    className="fill-purple-500" 
                  />
                  
                  {/* Tick Marks */}
                  <line x1="0" y1={graphHeight/2} x2="10" y2={graphHeight/2} className="stroke-slate-400/50" strokeWidth="0.5" />
              </g>

              {/* --- GROUP 3: Physical Motion Track (Bottom) --- */}
              <g transform="translate(10, 105)">
                  <text x="0" y="-5" className="text-[6px] fill-slate-500 font-bold">PHYSICAL MOTION (Accelerating)</text>
                  
                  {/* Track Line */}
                  <line x1="0" y1="5" x2={graphWidth} y2="5" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
                  
                  {/* Ticks */}
                  <line x1="0" y1="2" x2="0" y2="8" className="stroke-slate-300" strokeWidth="1" />
                  <line x1={graphWidth} y1="2" x2={graphWidth} y2="8" className="stroke-slate-300" strokeWidth="1" />
                  
                  {/* The Car / Particle */}
                  <circle 
                    cx={particlePos} 
                    cy="5" 
                    r="4" 
                    className="fill-orange-500 stroke-white dark:stroke-slate-900" 
                    strokeWidth="1.5"
                  />
                  
                  {/* Speed lines behind car when moving */}
                  {isPlaying && (
                    <g opacity={0.6}>
                        <line x1={particlePos - 6} y1="3" x2={particlePos - 10} y2="3" className="stroke-orange-400" strokeWidth="0.5" />
                        <line x1={particlePos - 6} y1="7" x2={particlePos - 10} y2="7" className="stroke-orange-400" strokeWidth="0.5" />
                    </g>
                  )}
              </g>

           </svg>
        </div>
      </div>

      {/* 2. Controls */}
      <div className="w-full grid grid-cols-1 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        
        {/* Sliders */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Acceleration (a)</span>
                    <span>{accelInput} m/s²</span>
                </label>
                <input 
                    type="range" min="1" max="5" step="0.5" 
                    value={accelInput} 
                    onChange={(e) => { setAccelInput(Number(e.target.value)); setProgress(0); }}
                    disabled={isPlaying}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
            </div>
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Duration (t)</span>
                    <span>{timeInput} s</span>
                </label>
                <input 
                    type="range" min="2" max="10" step="1" 
                    value={timeInput} 
                    onChange={(e) => { setTimeInput(Number(e.target.value)); setProgress(0); }}
                    disabled={isPlaying}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
            </div>
        </div>

        {/* Play Button */}
        <button 
            onClick={handlePlay}
            disabled={isPlaying}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-lg hover:shadow-purple-500/30'}`}
        >
            {isPlaying ? 'Integrating...' : '▶️ Integrate (Calculate Area)'}
        </button>
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
        interactionId: 'a-t-quiz',
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

  // --- CONTENT ---

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Acceleration vs. Time Graphs 
 
</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              An <strong>a-t graph</strong> shows how acceleration varies over time. While the height shows the acceleration value, the most important feature is the <strong>Area</strong>.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">Key Concept: The Area</h3>
              <p className="mb-3">
                The area under the curve of an acceleration-time graph tells us the <strong>Change in Velocity</strong>.
              </p>
              <div className="flex justify-center items-center bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-600">
                 <InlineMath math="\text{Area} = \int a \, dt = \Delta v" />
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Horizontal Line:</strong> Constant acceleration.</li>
                <li><strong>Line on X-axis:</strong> Zero acceleration (Constant velocity).</li>
                <li><strong>Area Calculation:</strong> For constant acceleration, Area is a simple rectangle (<InlineMath math="a \times t" />).</li>
            </ul>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📊 Area Simulator
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <ATGraphSimulator />
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
                                                if (selectedOption === idx) btnClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-purple-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
                                                className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-purple-500 transition-colors"
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
                                        className="px-6 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-500 transition-colors"
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
      slideId="acceleration-vs-time"
      slideTitle="Acceleration vs time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}