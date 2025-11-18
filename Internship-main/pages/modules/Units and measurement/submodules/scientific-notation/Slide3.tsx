import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ScientificNotationReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sci-notation-quiz', 
      conceptId: 'scientific-notation-quiz', 
      conceptName: 'Scientific Notation Quiz', 
      type: 'quiz', 
      description: 'Quick check on scientific notation rules.' 
    }
  ];

  const questions = [
    {
      id: 1,
      question: "Which is the correct scientific notation for 4500?",
      options: [
        { id: 'a', text: "45 \\times 10^2", label: "45 × 10²" },
        { id: 'b', text: "4.5 \\times 10^3", label: "4.5 × 10³" },
        { id: 'c', text: "0.45 \\times 10^4", label: "0.45 × 10⁴" }
      ],
      correct: 'b'
    },
    {
      id: 2,
      question: "If the exponent is negative (e.g., 10⁻⁵), the number is...",
      options: [
        { id: 'a', text: "Very large", label: "Very large (>10)" },
        { id: 'b', text: "Negative", label: "A negative number (<0)" },
        { id: 'c', text: "Very small", label: "Very small (<1)" }
      ],
      correct: 'c'
    }
  ];

  const handleOptionSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const checkAnswers = () => {
    setShowResults(true);
    // Assuming simple completion logic for interaction tracking
    const allCorrect = questions.every(q => quizAnswers[q.id] === q.correct);
    if (allCorrect) {
        // Log success interaction if needed
    }
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Summary Cheat Sheet */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Cheat Sheet 📝</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Golden Rule</h4>
                <BlockMath>{`N = a \\times 10^n`}</BlockMath>
                <p className="text-sm mt-2">
                    <strong>Coefficient 'a':</strong> Must be between 1 and 10 (e.g., 1.5, 9.99).
                </p>
                <p className="text-sm mt-1">
                    <strong>Exponent 'n':</strong> An integer (positive or negative).
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl mb-2">⬅️</div>
                    <div className="font-bold text-slate-700 dark:text-slate-300">Move Left</div>
                    <div className="text-sm text-slate-500">Positive Exponent (+)</div>
                    <div className="text-xs mt-1 text-green-600 font-mono">Big Numbers</div>
                </div>
                <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl mb-2">➡️</div>
                    <div className="font-bold text-slate-700 dark:text-slate-300">Move Right</div>
                    <div className="text-sm text-slate-500">Negative Exponent (-)</div>
                    <div className="text-xs mt-1 text-red-500 font-mono">Small Numbers</div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Mini Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Quick Check ✅</h3>
            
            <div className="space-y-8 flex-grow">
                {questions.map((q) => (
                    <div key={q.id} className="space-y-3">
                        <p className="font-medium text-slate-700 dark:text-slate-300">{q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((opt) => {
                                const isSelected = quizAnswers[q.id] === opt.id;
                                const isCorrect = q.correct === opt.id;
                                let btnClass = "w-full p-3 rounded-lg text-left border transition-all ";
                                
                                if (showResults) {
                                    if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200 ";
                                    else if (isSelected && !isCorrect) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200 ";
                                    else btnClass += "border-slate-200 dark:border-slate-700 opacity-50 ";
                                } else {
                                    if (isSelected) btnClass += "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 ";
                                    else btnClass += "bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 ";
                                }

                                return (
                                    <button 
                                        key={opt.id}
                                        onClick={() => !showResults && handleOptionSelect(q.id, opt.id)}
                                        className={btnClass}
                                        disabled={showResults}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{opt.label}</span>
                                            {showResults && isCorrect && <span>✅</span>}
                                            {showResults && isSelected && !isCorrect && <span>❌</span>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {!showResults ? (
                     <button 
                        onClick={checkAnswers}
                        disabled={Object.keys(quizAnswers).length < questions.length}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                        Check Answers
                     </button>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-center font-medium"
                    >
                        Ready for Significant Figures! 🚀
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="notation-review"
      slideTitle="Scientific notation review"
      moduleId="units-and-measurement"
      submoduleId="scientific-notation"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}