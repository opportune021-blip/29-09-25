import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function HeadToTailSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // -- STATE --
  const [mode, setMode] = useState<'add' | 'subtract'>('add');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Logic State
  const [isSnapped, setIsSnapped] = useState(false);
  const [bPos, setBPos] = useState({ x: 50, y: 300 }); // Initial position of Vector B

  // -- CONFIGURATION --
  const GRID = 40; // Size of grid squares
  const ORIGIN = { x: 150, y: 250 }; // Start point of Vector A
  
  // Vector Definitions (in Grid Units)
  const vecA = { x: 4, y: -2 }; // Points Right & Up (SVG Y is down, so negative Y is Up)
  const vecB_base = { x: 3, y: 3 }; // Points Right & Down
  
  // Calculate Active Vector B based on mode
  const vecB = mode === 'add' ? vecB_base : { x: -vecB_base.x, y: -vecB_base.y };

  // Calculate Target (Tip of Vector A)
  const targetPos = {
    x: ORIGIN.x + vecA.x * GRID,
    y: ORIGIN.y + vecA.y * GRID
  };

  // Calculate Resultant (Tip of connected B)
  const resultTip = {
    x: targetPos.x + vecB.x * GRID,
    y: targetPos.y + vecB.y * GRID
  };

  const slideInteraction: Interaction = {
    id: 'head-to-tail-practice',
    conceptId: 'vector-addition-geometry',
    conceptName: 'Head-to-Tail Method',
    type: 'learning',
    description: 'Practice connecting vectors head-to-tail to find the resultant.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Reset when mode changes
  useEffect(() => {
    setIsSnapped(false);
    setBPos({ x: 50, y: 300 }); // Reset to a neutral spot
  }, [mode]);

  // Drag Logic
  const onDragEnd = (event: any, info: any) => {
    // Calculate drop position relative to container
    // Note: We use the visual offset to determine snap, then lock state
    const dropX = bPos.x + info.offset.x;
    const dropY = bPos.y + info.offset.y;

    const dist = Math.sqrt((dropX - targetPos.x) ** 2 + (dropY - targetPos.y) ** 2);

    if (dist < 50) { // Snap threshold
      setIsSnapped(true);
      setBPos(targetPos); // Snap exactly to tip of A
      handleInteractionComplete({
        interactionId: 'head-to-tail-practice',
        value: 'connected',
        timestamp: Date.now()
      });
    } else {
      // Just update position without snapping
      setBPos({ x: dropX, y: dropY });
    }
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & INSTRUCTIONS (40%)  */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Head-to-Tail Method</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Connecting vectors to find the resultant path.
            </p>
        </div>

        {/* Scrollable Theory Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Explanation Card */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-2">How to Connect </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Imagine walking along the first vector. When you reach the end (the <strong>Head</strong>), start the next vector (the <strong>Tail</strong>).
                </p>
                <div className="mt-4 flex justify-center items-center gap-1 text-xs font-mono opacity-70">
                    <span className="text-blue-500 font-bold">Head</span>
                    <span>→ ● →</span>
                    <span className="text-purple-500 font-bold">Tail</span>
                </div>
            </div>

            {/* Mode Explanation */}
            <div className="space-y-4">
                <div className={`p-3 rounded-lg border transition-colors ${mode === 'add' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700 opacity-60'}`}>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Addition</span>
                        <InlineMath>{"\\vec{a} + \\vec{b}"}</InlineMath>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        The standard connection. The Resultant points from the <strong>start of A</strong> to the <strong>end of B</strong>.
                    </p>
                </div>

                <div className={`p-3 rounded-lg border transition-colors ${mode === 'subtract' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700 opacity-60'}`}>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Subtraction</span>
                        <InlineMath>{"\\vec{a} - \\vec{b}"}</InlineMath>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        This is effectively <InlineMath>{"\\vec{a} + (-\\vec{b})"}</InlineMath>. 
                        We flip vector B first, then connect it head-to-tail.
                    </p>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: INTERACTIVE PUZZLE (60%)    */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* PUZZLE CONTAINER */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner group cursor-crosshair min-h-[400px]" ref={containerRef}>
            
            {/* Top Controls */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-600 backdrop-blur shadow-xl">
                <button
                    onClick={() => setMode('add')}
                    className={`px-6 py-1.5 rounded-md text-sm font-bold transition-colors ${mode === 'add' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                >
                    Add
                </button>
                <button
                    onClick={() => setMode('subtract')}
                    className={`px-6 py-1.5 rounded-md text-sm font-bold transition-colors ${mode === 'subtract' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                >
                    Subtract
                </button>
            </div>

            {/* SVG Layer */}
            {/* Using viewBox ensures it scales properly on all devices */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="grid-puzzle-unique" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                        <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#1e293b" strokeWidth="1"/>
                    </pattern>
                    {/* Unique IDs for markers to prevent conflict */}
                    <marker id="arrow-a-puz" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                    <marker id="arrow-b-puz" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#9333EA" /></marker>
                    <marker id="arrow-b-neg-puz" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F97316" /></marker>
                    <marker id="arrow-res-puz" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto"><polygon points="0 0, 12 4.5, 0 9" fill="#10B981" /></marker>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#grid-puzzle-unique)" />
                
                {/* -- FIXED ELEMENTS -- */}
                
                {/* Target Highlight (Pulse) */}
                {!isSnapped && (
                    <g transform={`translate(${targetPos.x}, ${targetPos.y})`}>
                        <circle r="15" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" opacity="0.5">
                            <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )}

                {/* Vector A (Fixed) */}
                <line 
                    x1={ORIGIN.x} y1={ORIGIN.y} 
                    x2={targetPos.x} y2={targetPos.y} 
                    stroke="#3B82F6" strokeWidth="5" markerEnd="url(#arrow-a-puz)" 
                />
                <text x={ORIGIN.x + (vecA.x * GRID)/2 - 20} y={ORIGIN.y + (vecA.y * GRID)/2 - 10} fill="#3B82F6" fontWeight="bold" fontSize="16">
                    <InlineMath>{"\\vec{A}"}</InlineMath>
                </text>

                {/* Resultant (Shows only when snapped) */}
                <AnimatePresence>
                    {isSnapped && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <line 
                                x1={ORIGIN.x} y1={ORIGIN.y} 
                                x2={resultTip.x} y2={resultTip.y} 
                                stroke="#10B981" strokeWidth="6" markerEnd="url(#arrow-res-puz)" 
                            />
                            <text x={(ORIGIN.x + resultTip.x)/2} y={(ORIGIN.y + resultTip.y)/2 + 30} fill="#10B981" fontWeight="bold" fontSize="18" textAnchor="middle">
                                <InlineMath>{"\\vec{R}"}</InlineMath>
                            </text>
                        </motion.g>
                    )}
                </AnimatePresence>

            </svg>

            {/* -- DRAGGABLE LAYER -- */}
            
            <motion.div
                drag
                dragMomentum={false}
                onDragEnd={onDragEnd}
                animate={{ x: bPos.x, y: bPos.y }} // Controls position for snapping
                className={`absolute w-0 h-0 flex items-center justify-center z-20 ${isSnapped ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
            >
                {/* Vector B Graphic */}
                {/* We render B relative to the drag handle (which is the tail) */}
                <div className="relative pointer-events-none">
                    {/* Hit area for mouse - making it easier to grab */}
                    <div className="absolute -left-5 -top-5 w-10 h-10 rounded-full bg-white/10 pointer-events-auto hover:bg-white/20 transition-colors border border-white/30" />
                    
                    <svg width="300" height="300" className="overflow-visible absolute top-0 left-0 pointer-events-none">
                        <line 
                            x1="0" y1="0" 
                            x2={vecB.x * GRID} y2={vecB.y * GRID} 
                            stroke={mode === 'add' ? "#9333EA" : "#F97316"} 
                            strokeWidth="5" 
                            markerEnd={mode === 'add' ? "url(#arrow-b-puz)" : "url(#arrow-b-neg-puz)"} 
                            style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.5))' }}
                        />
                        <text x={vecB.x * GRID / 2} y={vecB.y * GRID / 2 - 15} fill="white" fontWeight="bold" fontSize="14" textAnchor="middle" style={{ textShadow: '0 1px 2px black' }}>
                            <InlineMath>{mode === 'add' ? "\\vec{B}" : "-\\vec{B}"}</InlineMath>
                        </text>
                    </svg>
                </div>
            </motion.div>

            {/* Hint Banner */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <div className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-500 flex items-center gap-2 ${isSnapped ? 'bg-green-500 text-white scale-110' : 'bg-white/90 text-slate-600'}`}>
                    {isSnapped ? (
                        <><span>✅</span> <span>Connected!</span></>
                    ) : (
                        <span>Drag vector B to the tip of vector A</span>
                    )}
                </div>
            </div>

        </div>

        {/* Reset Button (Only appears when done) */}
        <div className="h-10 flex justify-center">
            {isSnapped && (
                <button 
                    onClick={() => { setIsSnapped(false); setBPos({x: 50, y: 300}); }}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-wide"
                >
                    <span>↺</span> Reset Puzzle
                </button>
            )}
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="head-to-tail-slide"
      slideTitle="Adding & subtracting vectors end-to-end"
      moduleId="vectors-prerequisite"
      submoduleId="vector-addition-geometry"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}