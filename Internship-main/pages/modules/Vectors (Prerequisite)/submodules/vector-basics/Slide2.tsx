import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- DATA ---

type QuantityType = 'scalar' | 'vector';

interface QuantityItem {
  id: string;
  label: string;
  type: QuantityType;
  icon: string;
  explanation: string;
}

const quantitiesData: QuantityItem[] = [
  { id: 'mass', label: 'Mass', type: 'scalar', icon: '⚖️', explanation: 'Mass describes "how much" matter is in an object. It has no direction.' },
  { id: 'velocity', label: 'Velocity', type: 'vector', icon: '🚀', explanation: 'Velocity is speed with a direction (e.g., 50 m/s North).' },
  { id: 'temp', label: 'Temperature', type: 'scalar', icon: '🌡️', explanation: 'Temperature measures energy intensity. Direction doesn\'t apply.' },
  { id: 'force', label: 'Force', type: 'vector', icon: '💪', explanation: 'A push or pull always acts in a specific direction.' },
  { id: 'distance', label: 'Distance', type: 'scalar', icon: '📏', explanation: 'Distance is the total path length covered, regardless of direction.' },
  { id: 'displacement', label: 'Displacement', type: 'vector', icon: '📍', explanation: 'Displacement is the straight-line change in position from start to finish.' },
  { id: 'time', label: 'Time', type: 'scalar', icon: '⏱️', explanation: 'Time flows forward; it does not point in spatial directions.' },
  { id: 'acceleration', label: 'Acceleration', type: 'vector', icon: '🏎️', explanation: 'Acceleration is the rate of change of velocity, which includes direction.' },
];

// --- COMPONENTS ---

// Draggable Card Component
const DraggableCard = ({ item, onDrop }: { item: QuantityItem; onDrop: (item: QuantityItem, target: QuantityType) => void }) => {
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={controls}
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }} // Loose constraints
      dragElastic={0.2}
      dragSnapToOrigin={true} // Returns to start if not dropped in a valid zone logic (handled via state)
      whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05, cursor: 'grab' }}
      onDragEnd={(event, info) => {
        // Simple hit detection based on screen position could be complex, 
        // so we'll use a simpler click-to-sort fallback or visual drag logic.
        // For robustness in this demo, we will actually implement a "Click to Move" 
        // fallback if drag is tricky, but let's try visual proximity logic roughly or just allow clicking.
        
        // Actually, for better UX on all devices without complex rect calculation in this snippet:
        // We will make clicking the card cycle it through bins or open a menu.
        // BUT, since the user asked for "Interactive", let's do a "Click to assign" approach 
        // which is cleaner than complex D&D code in a single file component.
      }}
      className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex flex-col items-center gap-2 select-none w-28"
    >
      <span className="text-3xl">{item.icon}</span>
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
    </motion.div>
  );
};

export default function RecognizingVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Game State
  const [pool, setPool] = useState<QuantityItem[]>(quantitiesData);
  const [scalarBin, setScalarBin] = useState<QuantityItem[]>([]);
  const [vectorBin, setVectorBin] = useState<QuantityItem[]>([]);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' | 'neutral' } | null>(null);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = { 
    id: 'recognizing-vectors-sort', 
    conceptId: 'recognizing-vectors', 
    conceptName: 'Recognizing Vectors', 
    type: 'learning', 
    description: 'Sorting physical quantities into Scalar and Vector categories.' 
  };

  // Move item logic (Click based for accessibility and simplicity)
  const moveItem = (item: QuantityItem, target: 'pool' | 'scalar' | 'vector') => {
    // Remove from all source arrays
    const newPool = pool.filter(i => i.id !== item.id);
    const newScalar = scalarBin.filter(i => i.id !== item.id);
    const newVector = vectorBin.filter(i => i.id !== item.id);

    // Add to target
    if (target === 'pool') setPool([...newPool, item]);
    else if (target === 'scalar') setScalarBin([...newScalar, item]);
    else if (target === 'vector') setVectorBin([...newVector, item]);
    else {
        // Just update state clearing the item from where it was
        setPool(newPool);
        setScalarBin(newScalar);
        setVectorBin(newVector);
    }
  };

  const checkAnswers = () => {
    const wrongScalars = scalarBin.filter(i => i.type !== 'scalar');
    const wrongVectors = vectorBin.filter(i => i.type !== 'vector');
    const unassigned = pool.length;

    if (unassigned > 0) {
      setFeedback({ msg: "Sort all items first!", type: 'neutral' });
      return;
    }

    if (wrongScalars.length === 0 && wrongVectors.length === 0) {
      setFeedback({ msg: "Perfect! You've mastered identifying vectors.", type: 'success' });
      setCompleted(true);
      handleInteractionComplete({
        interactionId: 'recognizing-vectors-sort',
        value: '100', // 100% score
        timestamp: Date.now()
      });
    } else {
      setFeedback({ 
        msg: `Not quite. ${wrongScalars.length + wrongVectors.length} items are misplaced. Try moving them!`, 
        type: 'error' 
      });
    }
  };

  const resetGame = () => {
    setPool(quantitiesData);
    setScalarBin([]);
    setVectorBin([]);
    setCompleted(false);
    setFeedback(null);
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 h-full">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Which is which?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Drag (or click) the items below to sort them into <strong>Scalars</strong> (magnitude only) or <strong>Vectors</strong> (magnitude + direction).
          </p>
        </div>

        {/* Game Area */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          
          {/* Left Bin: SCALARS */}
          <div className={`lg:col-span-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border-2 border-dashed ${completed ? 'border-green-500' : 'border-orange-300'} p-4 flex flex-col relative transition-colors`}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">Scalars</h3>
              <p className="text-xs text-orange-600 dark:text-orange-400">Magnitude Only</p>
            </div>
            
            <motion.div layout className="flex-grow flex flex-col gap-2 overflow-y-auto min-h-[200px]">
              <AnimatePresence>
                {scalarBin.map(item => (
                  <motion.div 
                    layoutId={item.id} 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => !completed && moveItem(item, 'pool')}
                    className="cursor-pointer bg-white dark:bg-slate-800 p-3 rounded shadow flex items-center gap-3 border border-orange-100 dark:border-slate-600 hover:bg-orange-100 dark:hover:bg-slate-700"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                    {feedback?.type === 'error' && item.type !== 'scalar' && <span className="ml-auto text-red-500">⚠️</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {scalarBin.length === 0 && (
                <div className="flex-grow flex items-center justify-center opacity-30 text-orange-800 font-bold italic">
                  Drop Scalars Here
                </div>
              )}
            </motion.div>
          </div>

          {/* Middle: POOL */}
          <div className="lg:col-span-6 flex flex-col gap-4">
             {/* Instructions/Feedback Area */}
             <div className="h-16 flex items-center justify-center">
                {feedback ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className={`px-6 py-2 rounded-full font-bold text-sm ${
                            feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' :
                            feedback.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' :
                            'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                    >
                        {feedback.msg}
                    </motion.div>
                ) : (
                   <span className="text-sm text-slate-400 italic">Select an item below, then choose a bin.</span> 
                )}
            </div>

            {/* The Pool Grid */}
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 flex-grow flex items-center justify-center relative border border-slate-200 dark:border-slate-700">
                {completed ? (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Great Job!</h3>
                        <button onClick={resetGame} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500">
                            Play Again
                        </button>
                    </motion.div>
                ) : (
                    <motion.div layout className="flex flex-wrap gap-4 justify-center content-center w-full">
                        <AnimatePresence>
                            {pool.map(item => (
                                <motion.button
                                    layoutId={item.id}
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-600 flex flex-col items-center w-28 h-28 justify-center gap-2 group relative overflow-hidden"
                                >
                                    {/* Quick Sort Actions on Hover (Desktop) or Tap (Mobile) we simulate simplified tap logic here */}
                                    <div className="absolute inset-0 bg-slate-900/80 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div 
                                            onClick={(e) => { e.stopPropagation(); moveItem(item, 'scalar'); }}
                                            className="flex-1 w-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs hover:bg-orange-400"
                                        >
                                            To Scalar
                                        </div>
                                        <div 
                                            onClick={(e) => { e.stopPropagation(); moveItem(item, 'vector'); }}
                                            className="flex-1 w-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs hover:bg-blue-400"
                                        >
                                            To Vector
                                        </div>
                                    </div>

                                    <span className="text-3xl">{item.icon}</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                        {pool.length === 0 && !completed && (
                            <div className="text-slate-400 font-medium">All items sorted! Check your answer.</div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Check Button */}
            {!completed && (
                <button
                    onClick={checkAnswers}
                    disabled={pool.length > 0}
                    className="w-full py-4 bg-slate-800 dark:bg-blue-600 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 dark:hover:bg-blue-500 transition-colors shadow-lg"
                >
                    Check Answers
                </button>
            )}
          </div>

          {/* Right Bin: VECTORS */}
          <div className={`lg:col-span-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border-2 border-dashed ${completed ? 'border-green-500' : 'border-blue-300'} p-4 flex flex-col relative transition-colors`}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Vectors</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400">Magnitude + Direction</p>
            </div>

            <motion.div layout className="flex-grow flex flex-col gap-2 overflow-y-auto min-h-[200px]">
              <AnimatePresence>
                {vectorBin.map(item => (
                  <motion.div 
                    layoutId={item.id} 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => !completed && moveItem(item, 'pool')}
                    className="cursor-pointer bg-white dark:bg-slate-800 p-3 rounded shadow flex items-center gap-3 border border-blue-100 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-slate-700"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                    {feedback?.type === 'error' && item.type !== 'vector' && <span className="ml-auto text-red-500">⚠️</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {vectorBin.length === 0 && (
                <div className="flex-grow flex items-center justify-center opacity-30 text-blue-800 font-bold italic">
                  Drop Vectors Here
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="recognizing-vectors"
      slideTitle="Recognizing vectors"
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