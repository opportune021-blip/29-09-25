import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- DATA ---

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string | React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following measurements describes a Vector quantity?",
    options: [
      "10 kg",
      "50 m/s East",
      "20 degrees Celsius",
      "100 Joules"
    ],
    correctIndex: 1,
    explanation: (
      <span>
        "50 m/s East" includes both magnitude (50 m/s) and direction (East). The others are mass, temperature, and energy, which are all scalars.
      </span>
    )
  },
  {
    id: 2,
    text: "How is a vector variable typically represented in physics notation?",
    options: [
      "With a bold font or an arrow on top (e.g., \\vec{v})",
      "With an absolute value bar (e.g., |v|)",
      "With a simple italic letter (e.g., v)",
      "With a subscript (e.g., v_x)"
    ],
    correctIndex: 0,
    explanation: (
      <span>
        Vectors are denoted by an arrow <InlineMath>{"\\vec{v}"}</InlineMath> or bold face <InlineMath>{"\\mathbf{v}"}</InlineMath>. Simple italics usually represent the scalar magnitude.
      </span>
    )
  },
  {
    id: 3,
    text: "A car travels 50 km in a straight line to the North. This '50 km North' is called...",
    options: [
      "Distance",
      "Speed",
      "Displacement",
      "Acceleration"
    ],
    correctIndex: 2,
    explanation: "Displacement is the change in position with a specific direction. Distance would just be '50 km'."
  },
  {
    id: 4,
    text: "Two vectors are considered 'equal' only if:",
    options: [
      "They have the same magnitude.",
      "They have the same direction.",
      "They start at the same point.",
      "They have BOTH the same magnitude and direction."
    ],
    correctIndex: 3,
    explanation: "Equality requires both properties to match. Position doesn't matter (vectors can be moved as long as length and angle stay the same)."
  },
  {
    id: 5,
    text: "If you walk 5 meters forward and then 5 meters backward, what is your total displacement vector?",
    options: [
      "10 meters",
      "Zero vector (\\vec{0})",
      "5 meters forward",
      "Infinity"
    ],
    correctIndex: 1,
    explanation: (
      <span>
        You ended up exactly where you started. Your net change in position is zero. This is the zero vector <InlineMath>{"\\vec{0}"}</InlineMath>.
      </span>
    )
  }
];

// --- COMPONENT ---

export default function RecognizingVectorsPracticeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'recognizing-vectors-practice-quiz',
    conceptId: 'recognizing-vectors-practice',
    conceptName: 'Recognizing Vectors Practice',
    type: 'learning', // Ensure this matches your InteractionType definition
    description: 'Assessment on identifying vectors and scalar distinctions.'
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      // Submit final score
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      handleInteractionComplete({
        interactionId: 'recognizing-vectors-practice-quiz',
        value: Math.round((finalScore / questions.length) * 100).toString(),
        timestamp: Date.now()
      });
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8 flex flex-col items-center justify-center min-h-[500px]">
      <div className="w-full max-w-2xl">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Practice Quiz</h2>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {isCompleted ? "Completed" : `Question ${currentIndex + 1} / ${questions.length}`}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (isCompleted ? 1 : 0)) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Question Text */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                   {/* Render math if needed in question text */}
                   {currentQuestion.text.includes("\\") ? <InlineMath>{currentQuestion.text}</InlineMath> : currentQuestion.text}
                </h3>
              </div>

              {/* Options List */}
              <div className="p-6 space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let statusClass = "border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700";
                  
                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      statusClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200";
                    } else if (idx === selectedOption) {
                      statusClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200";
                    } else {
                      statusClass = "opacity-50 border-slate-200 dark:border-slate-700";
                    }
                  } else if (selectedOption === idx) {
                    statusClass = "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 shadow-md transform scale-[1.01]";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${statusClass}`}
                    >
                      <span className="text-lg">
                        {option.includes("\\") ? <InlineMath>{option}</InlineMath> : option}
                      </span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <span className="text-xl">✅</span>
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                        <span className="text-xl">❌</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Section */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl mt-1">💡</div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Explanation</h4>
                          <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {currentQuestion.explanation}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleNext}
                        className="mt-6 w-full py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        {currentIndex < questions.length - 1 ? 'Next Question ➜' : 'Finish Quiz 🏁'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button (Visible before answering) */}
              {!isAnswered && (
                <div className="p-6 pt-0">
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none hover:bg-blue-500 transition-all transform active:scale-95"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

            </motion.div>
          ) : (
            // Results Card
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center"
            >
              <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                {score === questions.length ? '🏆' : score > questions.length / 2 ? '👍' : '📚'}
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                You correctly answered <strong className="text-slate-900 dark:text-white">{score}</strong> out of <strong className="text-slate-900 dark:text-white">{questions.length}</strong> questions.
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Retry Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="recognizing-vectors-practice"
      slideTitle="Recognizing vectors practice"
      moduleId="vectors-prerequisite"
      submoduleId="vector-basics"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}