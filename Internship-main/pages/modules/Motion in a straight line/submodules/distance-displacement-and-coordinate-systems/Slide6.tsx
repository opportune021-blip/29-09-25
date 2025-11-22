// Slide6.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  { 
    id: 'dd-review-learning', 
    conceptId: 'dd-review', 
    conceptName: 'DD Review', 
    type: 'learning', 
    description: 'Concept sorting game to review distance vs displacement.' 
  },
  { 
    id: 'dd-review-quiz', 
    conceptId: 'dd-review-quiz', 
    conceptName: 'DD Review Quiz', 
    type: 'learning', 
    description: 'Final check on distance and displacement.' 
  }
];

const quizQuestions = [
  {
    question: 'Which quantity needs both magnitude and direction to be fully specified?',
    options: ['Speed', 'Distance', 'Velocity', 'Temperature'],
    correctIndex: 2,
    explanation: 'Velocity and Displacement are vectors, meaning they require direction. Speed, Distance, and Temperature are scalars.'
  },
  {
    question: 'For a runner completing a 400m circular track race, what is true at the finish line?',
    options: ['Distance = 400m, Displacement = 400m', 'Distance = 0m, Displacement = 0m', 'Distance = 400m, Displacement = 0m', 'Distance = 0m, Displacement = 400m'],
    correctIndex: 2,
    explanation: 'The total path length (Distance) is 400m. Since they returned to the start, the net change in position (Displacement) is 0.'
  }
];

// --- ANIMATION COMPONENT (Concept Sorter Game) ---

interface ConceptCard {
  id: number;
  text: string;
  category: 'distance' | 'displacement';
  explanation: string;
}

const CONCEPTS: ConceptCard[] = [
  { id: 1, text: "Path Dependent", category: 'distance', explanation: "Distance depends on every step taken." },
  { id: 2, text: "Magnitude & Direction", category: 'displacement', explanation: "Vectors need direction." },
  { id: 3, text: "Always Positive", category: 'distance', explanation: "Distance cannot be negative." },
  { id: 4, text: "Zero for Round Trip", category: 'displacement', explanation: "Start = End means zero displacement." },
  { id: 5, text: "Scalar Quantity", category: 'distance', explanation: "Scalars have magnitude only." },
  { id: 6, text: "Can be Negative", category: 'displacement', explanation: "Negative signs indicate direction." }
];

const ConceptSorter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentCard = CONCEPTS[currentIndex];

  const handleChoice = (choice: 'distance' | 'displacement') => {
    if (feedback !== null) return; // Prevent double clicks

    if (choice === currentCard.category) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    // Auto advance
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < CONCEPTS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameComplete(false);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* Game Container */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner relative h-80 flex flex-col items-center">
        
        {/* Header / Progress */}
        <div className="w-full flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Concept Sorter</span>
            <div className="flex gap-1">
                {CONCEPTS.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full ${idx < currentIndex ? 'bg-green-500' : idx === currentIndex ? 'bg-blue-500' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Score: {score}/{CONCEPTS.length}</span>
        </div>

        <AnimatePresence mode="wait">
            {!gameComplete ? (
                <div className="flex flex-col items-center w-full h-full justify-between">
                    
                    {/* The Card */}
                    <motion.div 
                        key={currentCard.id}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -20 }}
                        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-600 w-64 text-center relative"
                    >
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{currentCard.text}</h3>
                         <p className="text-xs text-slate-400">Where does this belong?</p>

                         {/* Feedback Overlay */}
                         {feedback && (
                             <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className={`absolute inset-0 rounded-xl flex items-center justify-center bg-opacity-90 backdrop-blur-sm ${feedback === 'correct' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                             >
                                 <div className="text-center p-2">
                                     <div className="text-2xl font-bold mb-1">{feedback === 'correct' ? '✓ Correct!' : '✗ Oops!'}</div>
                                     <p className="text-xs font-medium text-slate-600">{currentCard.explanation}</p>
                                 </div>
                             </motion.div>
                         )}
                    </motion.div>

                    {/* Buckets / Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                        <button 
                            onClick={() => handleChoice('distance')}
                            disabled={feedback !== null}
                            className="p-4 bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 rounded-xl border-2 border-orange-400 text-orange-800 dark:text-orange-200 font-bold transition-transform active:scale-95 flex flex-col items-center"
                        >
                            <span className="text-2xl mb-1">📏</span>
                            <span>Distance</span>
                            <span className="text-[10px] opacity-70 uppercase">(Scalar)</span>
                        </button>

                        <button 
                            onClick={() => handleChoice('displacement')}
                            disabled={feedback !== null}
                            className="p-4 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 rounded-xl border-2 border-blue-400 text-blue-800 dark:text-blue-200 font-bold transition-transform active:scale-95 flex flex-col items-center"
                        >
                            <span className="text-2xl mb-1">↗️</span>
                            <span>Displacement</span>
                            <span className="text-[10px] opacity-70 uppercase">(Vector)</span>
                        </button>
                    </div>

                </div>
            ) : (
                // Results Screen
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full"
                >
                    <div className="text-5xl mb-4">
                        {score === CONCEPTS.length ? '🏆' : score > 3 ? '👏' : '📚'}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Review Complete!</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                        You sorted {score} out of {CONCEPTS.length} concepts correctly.
                    </p>
                    <button 
                        onClick={resetGame}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors"
                    >
                        Play Again
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide6() {
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
        interactionId: 'dd-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review: Distance & Displacement</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
                You've learned the difference between "how far you traveled" and "how far you are from the start."
            </p>

            <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide mb-2">Distance (Scalar)</h4>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Measures total path length.</li>
                        <li>Always positive (<InlineMath math="\ge 0" />).</li>
                        <li>Order of steps matters (accumulates).</li>
                    </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide mb-2">Displacement (Vector) 

[Image of vectors]
</h4>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Measures straight-line change in position.</li>
                        <li>Can be negative (indicates direction).</li>
                        <li>Path independent (Start <InlineMath math="\to" /> End).</li>
                    </ul>
                </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded text-center text-sm font-bold text-slate-600 dark:text-slate-300">
                 Remember: <InlineMath math="\text{Distance} \ge |\text{Displacement}|" />
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
                    🧩 Concept Sorter
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
                     <ConceptSorter />
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
      slideId="distance-displacement-review"
      slideTitle="Distance and displacement review"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}