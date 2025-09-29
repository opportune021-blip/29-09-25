import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Coin Data and Types ---
type CoinType = 'penny' | 'nickel' | 'dime' | 'quarter';

interface Coin {
  id: number;
  type: CoinType;
  isSorted?: boolean;
}

const COIN_DETAILS: Record<CoinType, { name: string; value: number; style: string }> = {
  penny: { name: 'Penny', value: 1, style: 'bg-orange-400 border-orange-600' },
  nickel: { name: 'Nickel', value: 5, style: 'bg-slate-300 border-slate-500' },
  dime: { name: 'Dime', value: 10, style: 'bg-slate-300 border-slate-500' },
  quarter: { name: 'Quarter', value: 25, style: 'bg-slate-300 border-slate-500' },
};

// --- Helper to create the initial set of coins ---
const createInitialCoins = (): Coin[] => {
  const coins: Coin[] = [
    { id: 1, type: 'penny' },
    { id: 2, type: 'nickel' },
    { id: 3, type: 'dime' },
    { id: 4, type: 'quarter' },
    { id: 5, type: 'penny' },
    { id: 6, type: 'dime' },
  ];
  return coins.sort(() => Math.random() - 0.5); // Shuffle them
};

export default function CountingMoneySlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const slideInteractions: Interaction[] = [
    { id: 'counting-money-concept', conceptId: 'counting-money', conceptName: 'Counting Money', type: 'learning' },
  ];
  const handleInteractionComplete = (response: InteractionResponse) =>
    setLocalInteractions((prev) => ({ ...prev, [response.interactionId]: response }));

  // --- Left Panel with Visuals ---
  const LeftTheoryPanel = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Counting Money</h2>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-600 rounded-r-lg p-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Meet the Coins</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Learning the value of each coin is the first step!</p>
        <div className="space-y-3">
          {Object.entries(COIN_DETAILS).map(([type, details]) => (
            <div key={type} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex-shrink-0 border-2 ${details.style}`}></div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {details.name} = {details.value} cents
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- Right Panel with Interactive Game ---
  const RightInteractionPanel = () => {
    const [coins, setCoins] = useState<Coin[]>(createInitialCoins);
    const [feedbackCoin, setFeedbackCoin] = useState<{ id: number; correct: boolean } | null>(null);
    const piggyBankRefs = {
      penny: useRef<HTMLDivElement>(null),
      nickel: useRef<HTMLDivElement>(null),
      dime: useRef<HTMLDivElement>(null),
      quarter: useRef<HTMLDivElement>(null),
    };

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
      coin: Coin
    ) => {
      const correctBankRef = piggyBankRefs[coin.type].current;
      if (!correctBankRef) return;

      const bankRect = correctBankRef.getBoundingClientRect();

      // Use actual event coordinates for reliable drop detection
      const dropX = (event as MouseEvent).clientX;
      const dropY = (event as MouseEvent).clientY;

      const isCorrect =
        dropX > bankRect.left &&
        dropX < bankRect.right &&
        dropY > bankRect.top &&
        dropY < bankRect.bottom;

      if (isCorrect) {
        setCoins((prevCoins) =>
          prevCoins.map((c) => (c.id === coin.id ? { ...c, isSorted: true } : c))
        );
        setFeedbackCoin({ id: coin.id, correct: true });
        setTimeout(() => setFeedbackCoin(null), 600);
      } else {
        setFeedbackCoin({ id: coin.id, correct: false });
        setTimeout(() => setFeedbackCoin(null), 600);
      }
    };

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Coin Sorter</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Drag the coins into the correct piggy bank!</p>

        <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between relative overflow-hidden">
          {/* Piggy Bank Drop Zones */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(COIN_DETAILS).map(([type, details]) => (
              <div
                key={type}
                ref={piggyBankRefs[type as CoinType]}
                className="flex flex-col items-center justify-start 
                           bg-slate-200/70 dark:bg-slate-800/70 
                           rounded-xl text-center border-2 border-dashed 
                           border-slate-400 dark:border-slate-600
                           h-56 relative overflow-visible p-4"
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 pointer-events-none">
                  💰 {details.name}s
                </span>

                <div className="flex flex-wrap gap-2 justify-center items-start w-full h-full">
                  {coins
                    .filter((coin) => coin.type === type && coin.isSorted)
                    .map((coin) => (
                      <motion.div
                        key={coin.id}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-md border-2 ${details.style}`}
                        layout
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        {details.value}¢
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Draggable Coins Area */}
          <div className="relative h-28 flex justify-center items-center">
            <AnimatePresence>
              {coins
                .filter((coin) => !coin.isSorted)
                .map((coin, index) => {
                  const isFeedback = feedbackCoin?.id === coin.id;
                  return (
                    <motion.div
                      key={coin.id}
                      drag
                      onDragEnd={(event, info) => handleDragEnd(event, info, coin)}
                      className={`absolute w-12 h-12 rounded-full cursor-grab active:cursor-grabbing border-2 z-10 ${COIN_DETAILS[coin.type].style}`}
                      style={{ x: (index - coins.length / 2) * 20 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        ...(isFeedback && !feedbackCoin?.correct
                          ? { x: [0, -12, 12, -12, 12, 0] }
                          : {}),
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      whileDrag={{ scale: 1.2, zIndex: 50 }}
                    >
                      {isFeedback && feedbackCoin.correct && (
                        <motion.div
                          className="absolute inset-0 flex justify-center items-center text-yellow-400 text-xl"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          ✨
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          {/* Completion Message */}
          <AnimatePresence>
            {coins.every((c) => c.isSorted) && (
              <motion.div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-3xl font-bold text-white mb-4">🎉 You did it! 🎉</p>
                <button
                  onClick={() => setCoins(createInitialCoins)}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
          <LeftTheoryPanel />
        </TrackedInteraction>
        <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
          <RightInteractionPanel />
        </TrackedInteraction>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="measurements-money"
      slideTitle="Counting Money"
      moduleId="grade-2-math-measurement"
      submoduleId="money"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
