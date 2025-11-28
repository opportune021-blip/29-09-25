import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'intro-2d-review-flashcards',
    conceptId: 'intro-2d-review',
    conceptName: '2D Motion Review',
    type: 'learning',
    description: 'Flashcard review of key 2D motion concepts.'
  },
  {
    id: 'intro-2d-mastery-quiz',
    conceptId: 'intro-2d-mastery',
    conceptName: '2D Motion Mastery Quiz',
    type: 'learning',
    description: 'Final quiz to test understanding of the submodule.'
  }
];

const quizQuestions = [
  {
    question: 'A package is dropped from a plane flying horizontally at constant speed. To an observer on the ground, the path of the package is:',
    options: [
      'A straight line falling vertically down',
      'A parabolic path',
      'A straight diagonal line',
      'A zig-zag path'
    ],
    correctIndex: 1,
    explanation: 'The package retains the horizontal velocity of the plane but accelerates vertically due to gravity. This combination creates a parabolic trajectory.'
  },
  {
    question: 'A particle moves from (0,0) to (3,4) in 2 seconds. What is the magnitude of its average velocity?',
    options: [
      '2.5 m/s',
      '5 m/s',
      '7 m/s',
      '3.5 m/s'
    ],
    correctIndex: 0,
    explanation: 'Displacement magnitude is √((3-0)² + (4-0)²) = 5m. Average velocity = Displacement / time = 5 / 2 = 2.5 m/s.'
  },
  {
    question: 'Which equation correctly represents the position vector of a particle at coordinates (x, y)?',
    options: [
      'r = x + y',
      'r = xi + yj',
      'r = √(x² + y²)',
      'r = x - y'
    ],
    correctIndex: 1,
    explanation: 'The position vector is the vector sum of its rectangular components: r = xi + yj.'
  }
];

const flashcards = [
  {
    title: 'Independence Principle',
    front: 'Does horizontal motion affect vertical falling time?',
    back: 'NO. Motion in the x-direction and y-direction are completely independent. Gravity only affects vertical motion.',
    icon: '↔️↕️'
  },
  {
    title: 'Position Vector',
    front: 'What is the formula for a position vector?',
    back: (<span><InlineMath math="\vec{r} = x\hat{i} + y\hat{j}" /> <br/><br/> It points from the Origin to the Particle.</span>),
    icon: '📍'
  },
  {
    title: 'Displacement',
    front: 'How do you calculate displacement between two points?',
    back: (<span><InlineMath math="\Delta \vec{r} = \vec{r}_{final} - \vec{r}_{initial}" /> <br/><br/> It is the shortest path between start and end.</span>),
    icon: '📏'
  }
];

// --- FLASHCARD COMPONENT ---

const FlashcardDeck = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="w-full max-w-sm aspect-[4/3] relative perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div 
            className="w-full h-full relative preserve-3d transition-all duration-500"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-700 rounded-xl shadow-xl border-2 border-blue-100 dark:border-slate-600 flex flex-col items-center justify-center p-6 text-center">
                <div className="text-4xl mb-4">{flashcards[currentCard].icon}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{flashcards[currentCard].title}</h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{flashcards[currentCard].front}</p>
                <p className="absolute bottom-4 text-xs text-slate-400 uppercase tracking-widest">Tap to Flip</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden bg-blue-600 dark:bg-slate-800 rounded-xl shadow-xl border-2 border-blue-500 flex flex-col items-center justify-center p-6 text-center rotate-y-180">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-blue-400 pb-2">Answer</h3>
                <div className="text-white text-lg">{flashcards[currentCard].back}</div>
            </div>
        </motion.div>
      </div>

      <div className="flex gap-4 mt-6">
          <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors">
            ⬅️ Prev
          </button>
          <div className="flex items-center gap-1">
            {flashcards.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentCard ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors">
            Next ➡️
          </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [viewMode, setViewMode] = useState<'review' | 'quiz'>('review');

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
        interactionId: 'intro-2d-mastery-quiz',
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
        
        {/* Left Panel: Summary Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Chapter Summary</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <p>
              Excellent work! You have completed the introduction to 2D motion. Here are the critical points you must remember for the exam:
            </p>

            <ul className="space-y-4">
                <li className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
                    <strong className="block text-slate-800 dark:text-white mb-1">1. Independence of Motion</strong>
                    <span className="text-sm">
                        Horizontal (<InlineMath math="x" />) and Vertical (<InlineMath math="y" />) motions do not affect each other. Treat them as two separate 1D problems.
                    </span>
                </li>
                <li className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500">
                    <strong className="block text-slate-800 dark:text-white mb-1">2. Position Vector</strong>
                    <span className="text-sm">
                        Defines location relative to the origin: <InlineMath math="\vec{r} = x\hat{i} + y\hat{j}" />.
                    </span>
                </li>
                <li className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500">
                    <strong className="block text-slate-800 dark:text-white mb-1">3. Displacement</strong>
                    <span className="text-sm">
                        Change in position: <InlineMath math="\Delta \vec{r} = \vec{r}_f - \vec{r}_i" />.
                    </span>
                </li>
            </ul>

            <div className="text-sm italic text-slate-500 pt-4 border-t border-slate-200">
                Ready to test your mastery? Use the flashcards to review or jump straight into the quiz.
            </div>

          </div>
        </div>
        
        {/* Right Panel: Interactive Review */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('review')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'review' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🃏 Flashcards
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🏆 Mastery Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'review' ? (
                    <div className="flex-grow flex flex-col items-center justify-center h-full">
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Concept Review</h3>
                         <FlashcardDeck />
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
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Module Complete!</h3>
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
      slideId="review-2d-motion"
      slideTitle="Review: 2D Motion Concepts"
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