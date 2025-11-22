// Slide5.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'kf-choose-equation-learning',
    conceptId: 'kf-choose-equation',
    conceptName: 'Choosing Kinematic Equations',
    type: 'learning',
    description: 'Interactive decision tree to select the correct kinematic formula.'
  },
  {
    id: 'kf-choose-equation-quiz',
    conceptId: 'kf-choose-equation-quiz',
    conceptName: 'Choosing Equation Quiz',
    type: 'learning',
    description: 'Quiz on identifying correct kinematic equations based on known variables.'
  }
];

const quizQuestions = [
  {
    question: 'Which formula should you use if the problem does NOT give you Time (t)?',
    options: [
      's = ut + ½at²',
      'v = u + at',
      'v² = u² + 2as',
      'v = s / t'
    ],
    correctIndex: 2,
    explanation: 'The "Third Equation of Motion" (v² = u² + 2as) relates velocity, acceleration, and displacement without needing time.'
  },
  {
    question: 'If you need to find Displacement (s) but do not know the Final Velocity (v), which equation is best?',
    options: [
      'v = u + at',
      's = ut + ½at²',
      'v² = u² + 2as',
      's = ½(u + v)t'
    ],
    correctIndex: 1,
    explanation: 'The equation s = ut + ½at² calculates displacement using only initial velocity, time, and acceleration.'
  }
];

// --- ANIMATION COMPONENT (The Decision Engine) ---

interface FormulaData {
  id: string;
  missing: string;
  tex: string;
  name: string;
  color: string;
  icon: string;
}

const FORMULAS: Record<string, FormulaData> = {
  s: { 
    id: 's', 
    missing: 'Displacement (s)', 
    tex: 'v = u + at', 
    name: '1st Equation', 
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: '⏱️'
  },
  v: { 
    id: 'v', 
    missing: 'Final Velocity (v)', 
    tex: 's = ut + \\frac{1}{2}at^2', 
    name: '2nd Equation', 
    color: 'bg-green-100 text-green-800 border-green-300',
    icon: '📏'
  },
  t: { 
    id: 't', 
    missing: 'Time (t)', 
    tex: 'v^2 = u^2 + 2as', 
    name: '3rd Equation', 
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: '⚡'
  },
  a: { 
    id: 'a', 
    missing: 'Acceleration (a)', 
    tex: 's = \\frac{1}{2}(u + v)t', 
    name: 'Average Velocity Eq', 
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: '⚖️'
  }
};

const EquationPicker = () => {
  const [selectedMissing, setSelectedMissing] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Question Prompt */}
      <div className="w-full text-center mb-6">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">What variable is MISSING?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
              Look at your physics problem. Which variable is <strong>not given</strong> and <strong>not asked for</strong>?
          </p>
      </div>

      {/* 2. The Selection Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
          {Object.entries(FORMULAS).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedMissing(key)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center shadow-sm
                    ${selectedMissing === key 
                        ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300'
                    }`}
              >
                  <span className="text-2xl mb-2 grayscale">{data.icon}</span>
                  <span className="text-xs font-bold uppercase text-slate-500">No {key}</span>
                  <span className="text-[10px] text-slate-400">({data.missing})</span>
              </button>
          ))}
      </div>

      {/* 3. The Result Card */}
      <div className="w-full h-32 relative">
          <AnimatePresence mode="wait">
              {selectedMissing ? (
                  <motion.div 
                    key={selectedMissing}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute inset-0 w-full rounded-xl border-l-8 p-4 shadow-lg flex flex-col justify-center items-center ${FORMULAS[selectedMissing].color}`}
                  >
                      <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Use this formula</div>
                      <div className="text-2xl font-mono font-bold mb-2">
                          <InlineMath math={FORMULAS[selectedMissing].tex} />
                      </div>
                      <div className="text-xs font-bold">{FORMULAS[selectedMissing].name}</div>
                  </motion.div>
              ) : (
                  <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-sm">
                      Select a missing variable above 👆
                  </div>
              )}
          </AnimatePresence>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide5() {
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
        interactionId: 'kf-choose-equation-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">How to Choose the Right Equation</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Solving kinematics problems is like being a detective. You have 5 potential variables: <InlineMath math="u, v, a, t, s" />.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">The "Missing Variable" Trick</h4>
                <p className="text-sm">
                    Every kinematic equation leaves out exactly <strong>one</strong> of the five variables. To solve a problem quickly:
                </p>
                <ol className="list-decimal ml-5 mt-2 text-sm space-y-2">
                    <li>List what you <strong>know</strong>.</li>
                    <li>List what you <strong>need</strong>.</li>
                    <li>Identify the one variable <strong>nobody cares about</strong> (missing).</li>
                    <li>Pick the equation that <strong>doesn't have</strong> that variable.</li>
                </ol>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Pro Tip:</p>
                <p className="text-sm italic">
                    If time (<InlineMath math="t" />) is not involved at all, jump straight to the 3rd equation: <InlineMath math="v^2 = u^2 + 2as" />.
                </p>
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
                    🧠 Decision Engine
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
                     <EquationPicker />
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
      slideId="kf-choose-equation"
      slideTitle="Choosing Kinematic Equations"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}