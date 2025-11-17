import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function CellularRespirationSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'anaerobic-respiration-quiz',
      conceptId: 'anaerobic-respiration',
      conceptName: 'Anaerobic Respiration & Fermentation Quiz',
      type: 'judging',
      description: 'Testing understanding of anaerobic processes'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'no-oxygen-pathway-question',
      question: 'Which processes allow organisms to release energy from food *without* the use of oxygen?',
      options: [
        'Aerobic Respiration and Glycolysis',
        'Anaerobic Respiration and Fermentation',
        'Citric Acid Cycle and Electron Transport Chain',
        'Photosynthesis and Respiration'
      ],
      correctAnswer: 'Anaerobic Respiration and Fermentation',
      explanation: 'Correct! Both anaerobic respiration and fermentation are pathways to produce ATP when oxygen is unavailable.'
    },
    {
      id: 'lactic-acid-example-question',
      question: 'In which scenario would human muscle cells typically perform lactic acid fermentation?',
      options: [
        'During a long, slow walk',
        'While sleeping peacefully',
        'During intense, oxygen-limited physical movement',
        'When consuming sugary foods'
      ],
      correctAnswer: 'During intense, oxygen-limited physical movement',
      explanation: 'Correct! When oxygen supply is insufficient for aerobic respiration during strenuous activity, muscle cells switch to lactic acid fermentation for quick energy.'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `anaerobic-respiration-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'anaerobic-respiration',
      conceptName: 'Anaerobic Respiration & Fermentation Quiz',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
    });
  };

  const handleNextQuestion = () => {
    const newAnswered = [...questionsAnswered];
    newAnswered[currentQuestionIndex] = true;
    setQuestionsAnswered(newAnswered);

    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };


  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Changed to 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8">
        
        {/* Left Column: Article Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Cellular Respiration Without Oxygen
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              The term cellular respiration typically refers to the process used by organisms to break down food molecules (glucose) for energy in the presence of oxygen. However, organisms can perform cellular respiration aerobically (with oxygen) or anaerobically (without oxygen).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              There are two processes that allow organisms to release energy from food without the use of oxygen: anaerobic respiration and fermentation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Anaerobic Respiration</h2>
            <p className="text-lg leading-relaxed">
              In aerobic cellular respiration, organisms use oxygen at the end of the electron transport chain. However, in anaerobic respiration, organisms use a different inorganic molecule (such as sulfate) at the end of the electron transport chain. Many bacteria and archaea use anaerobic respiration.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              For example, methanogens are microorganisms that perform anaerobic respiration and often occur in wetland ecosystems. Some methanogens also occur in the stomachs of ruminants (like cows and sheep). Here, these microorganisms help to break down complex carbohydrates (such as cellulose) in the plant-based diets of ruminants. Methanogens produce methane through anaerobic respiration, which is exhaled by ruminants.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Fermentation</h2>
            <p className="text-lg leading-relaxed">
              In the absence of oxygen, some organisms will use only glycolysis and the anaerobic process of fermentation to release energy from their food.
            </p>
            
            <h3 className="text-xl font-semibold mt-4 text-emerald-500">Alcohol Fermentation</h3>
            <p className="text-lg leading-relaxed">
              Alcohol fermentation occurs when an organism breaks down carbohydrates to release energy and produces ethanol (alcohol) and carbon dioxide. This type of fermentation is used by yeasts (microscopic fungi) and some bacteria.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              For example, the carbon dioxide bubbles made by baker's yeast during alcohol fermentation help bread to rise. During baking, the ethanol produced by the baker's yeast evaporates into the air.
            </p>

            <h3 className="text-xl font-semibold mt-4 text-emerald-500">Lactic Acid Fermentation</h3>
            <p className="text-lg leading-relaxed">
              Lactic acid fermentation occurs when an organism breaks down carbohydrates to release energy and produces a compound called lactate. This type of fermentation is used by certain fungi and some bacteria. Many foods—including yogurt, cheese, and kimchi—are made through lactic acid fermentation, which gives them a sour flavor.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Lactic acid fermentation can also happen in animals when oxygen is limited. During intense physical movement, muscle cells may use lactic acid fermentation to quickly release energy.
            </p>
            <div className="flex justify-center mt-4">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/d28dc71d93946afd4f6b482c6d7daa2fdf13708f.jpg"
                alt="Organism performing lactic acid fermentation"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
              An organism, such as this jumping frog, may use lactic acid fermentation for energy during quick, sudden movements.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Facultative and Obligate Anaerobes</h2>
            <p className="text-lg leading-relaxed">
              Many bacteria and archaea use anaerobic respiration or fermentation. Some of these organisms can survive in environments with or without oxygen; other organisms can live only in environments without oxygen.
            </p>
            <ul className="mt-4 space-y-3 text-lg list-disc list-inside">
              <li>
                <strong>Facultative anaerobes:</strong> Can switch between aerobic respiration and anaerobic processes (anaerobic respiration or fermentation) based on oxygen availability.
              </li>
              <li>
                <strong>Obligate anaerobes:</strong> Can live and grow only in the absence of oxygen. Oxygen is toxic to these types of organisms and injures or kills them on exposure.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Images & Quiz */}
        <div className="space-y-8">
          {/* Image 1: Yeast and Alcohol Fermentation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Yeast in Action: Alcohol Fermentation</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/5572013b20cd46a332f4ee9892dd568a461484e4.jpg"
                alt="Yeast cells under a microscope"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Yeast (microscopic fungi) perform alcohol fermentation, producing ethanol and carbon dioxide (like in bread making).
            </p>
          </div>
          
          {/* Image 2: Fermentation in Food */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Fermented Foods</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/31399389464a4e32570455ca641386cbafb46ef7.jpg"
                alt="Various fermented foods like yogurt, cheese, and kimchi"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Many common foods, such as yogurt and cheese, are products of lactic acid fermentation by bacteria or fungi.
            </p>
          </div>

          {/* Image 3: Anaerobic Respiration Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Methanogens in Wetlands</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/d28dc71d93946afd4f6b482c6d7daa2fdf13708f.jpg" // Re-using frog image for placeholder until a specific methanogen image is found
                alt="A simplified representation of a wetland ecosystem"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Methanogens, a type of microorganism, thrive in anaerobic environments like wetlands, producing methane through respiration.
            </p>
          </div>

          {/* QUIZ SECTION */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-green-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                        {questions[currentQuestionIndex].explanation}
                      </div>
                      <motion.button
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Excellent! You understand energy without oxygen.' : 'Keep practicing anaerobic processes! 👏'}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="anaerobic-respiration"
      slideTitle="Cellular respiration without oxygen"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="cellular-respiration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}