import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function AddSubtractEndToEndSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // -- STATE --
  const [mode, setMode] = useState<'add' | 'subtract'>('add');
  
  // Fixed Vector A
  const vecA = { x: 4, y: 2 };
  const originA = { x: 100, y: 250 }; // Screen coords for A's tail
  
  // Draggable Vector B
  // We track B's current screen position (tail)
  const [bPos, setBPos] = useState({ x: 50, y: 350 }); // Initial random spot
  const vecB_base = { x: 3, y: -3 }; // The vector components
  
  // Effective Vector B (flips if subtracting)
  const vecB_active = mode === 'add' ? vecB_base : { x: -vecB_base.x, y: -vecB_base.y };

  // Snap State
  const [isSnapped, setIsSnapped] = useState(false);

  // Constants
  const GRID = 30;
  const SNAP_DIST = 40; // Pixels distance to trigger snap

  // Target for B's tail (The head of A)
  const targetX = originA.x + vecA.x * GRID;
  const targetY = originA.y - vecA.y * GRID; // SVG Y is inverted

  const slideInteraction: Interaction = {
    id: 'end-to-end-puzzle',
    conceptId: 'head-to-tail-method',
    conceptName: 'Head-to-Tail Construction',
    type: 'learning',
    description: 'Manually performing vector addition by connecting head-to-tail.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Reset puzzle when mode changes
  useEffect(() => {
    setIsSnapped(false);
    setBPos({ x: 50, y: 350 }); // Reset position
  }, [mode]);

  // Drag Handler
  const onDragB = (_: any, info: any) => {
    // Just visual update handled by Framer mostly, but we track point for snap logic
    // We need the ACTUAL x/y. Framer's onDrag gives delta.
    // We'll update state onDragEnd or use a ref-based approach for smooth snapping.
    // For this simple puzzle, checking onDragEnd is sufficient and cleaner.
  };

  const onDragEndB = (_: any, info: any) => {
    // Calculate final position based on delta + original
    // Note: Framer's `info.point` is page relative. `info.offset` is drag distance.
    // We need to sync our state `bPos` with where it landed.
    
    const newX = bPos.x + info.offset.x;
    const newY = bPos.y + info.offset.y;

    // Check Distance to Target
    const dist = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);

    if (dist < SNAP_DIST) {
      setIsSnapped(true);
      setBPos({ x: targetX, y: targetY }); // Snap exactly
      
      handleInteractionComplete({
        interactionId: 'end-to-end-puzzle',
        value: mode,
        timestamp: Date.now()
      });
    } else {
      setIsSnapped(false);
      setBPos({ x: newX, y: newY });
    }
  };

  // Resultant Calculation (Components)
  const resX = vecA.x + vecB_active.x;
  const resY = vecA.y + vecB_active.y;

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            The "Head-to-Tail" Method
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            To {mode} vectors geometrically, place the <strong>tail</strong> of the second vector at the <strong>head</strong> of the first.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4">
            <button
                onClick={() => setMode('add')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'add' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-slate-600 border border-slate-300'}`}
            >
                Addition (<InlineMath>\vec{a} + \vec{b}</InlineMath>)
            </button>
            <button
                onClick={() => setMode('subtract')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'subtract' ? 'bg-orange-600 text-white shadow-lg scale-105' : 'bg-white text-slate-600 border border-slate-300'}`}
            >
                Subtraction (<InlineMath>\vec{a} - \vec{b}</InlineMath>)
            </button>
        </div>

        {/* Puzzle Area */}
        <div className="relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 h-[500px] overflow-hidden select-none shadow-inner group cursor-crosshair">
            
            {/* Instruction Overlay */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${isSnapped ? 'bg-green-100 text-green-700' : 'bg-white text-slate-600'}`}>
                {isSnapped 
                    ? "Connected! The Resultant is shown in Green." 
                    : `Drag vector ${mode === 'subtract' ? '-B' : 'B'} to the tip of vector A.`
                }
            </div>

            <svg className="w-full h-full pointer-events-none">
                <defs>
                    <pattern id="grid-puzzle" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                        <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-a-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                    <marker id="head-b-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#9333EA" /></marker>
                    <marker id="head-res-p" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-puzzle)" className="text-slate-400" />
                
                {/* Connection Target Highlight (Pulse when not snapped) */}
                {!isSnapped && (
                    <circle cx={targetX} cy={targetY} r="15" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4">
                        <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                )}

                {/* Vector A (Fixed) */}
                <g>
                    <line 
                        x1={originA.x} y1={originA.y} 
                        x2={originA.x + vecA.x * GRID} y2={originA.y - vecA.y * GRID} 
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-p)" 
                    />
                    <text x={originA.x + (vecA.x * GRID)/2} y={originA.y - (vecA.y * GRID)/2 - 10} fill="#3B82F6" fontWeight="bold">
                        <InlineMath>\vec{a}</InlineMath>
                    </text>
                </g>

                {/* Resultant (Only if Snapped) */}
                {isSnapped && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <line 
                            x1={originA.x} y1={originA.y} 
                            x2={originA.x + resX * GRID} y2={originA.y - resY * GRID} 
                            stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-p)" 
                        />
                         <text x={originA.x + (resX * GRID)/2} y={originA.y - (resY * GRID)/2 + 20} fill="#10B981" fontWeight="bold">
                            <InlineMath>\vec{R}</InlineMath>
                        </text>
                    </motion.g>
                )}
            </svg>

            {/* Draggable Vector B */}
            <motion.div
                drag
                dragMomentum={false}
                onDrag={onDragB}
                onDragEnd={onDragEndB}
                animate={{ x: bPos.x, y: bPos.y }} // Controlled position for snapping
                className={`absolute w-0 h-0 flex items-center justify-center cursor-grab active:cursor-grabbing ${isSnapped ? 'pointer-events-none' : ''}`}
                style={{ x: 0, y: 0 }} // Reset transform origin issues, rely on 'animate' prop
            >
                {/* The visual vector B inside the draggable div */}
                {/* We render an SVG inside this div that represents Vector B. 
                    The div is positioned at the TAIL of B. */}
                <div className="relative">
                    {/* Hitbox for easier dragging */}
                    <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-purple-500/20 hover:bg-purple-500/40" />
                    
                    <svg width="200" height="200" className="overflow-visible pointer-events-none absolute top-0 left-0">
                        <line 
                            x1="0" y1="0" 
                            x2={vecB_active.x * GRID} y2={-vecB_active.y * GRID} 
                            stroke={mode === 'add' ? "#9333EA" : "#F97316"} 
                            strokeWidth="4" 
                            markerEnd="url(#head-b-p)" 
                        />
                        <text x={vecB_active.x * GRID / 2} y={-vecB_active.y * GRID / 2 - 10} fill={mode === 'add' ? "#9333EA" : "#F97316"} fontWeight="bold" fontSize="14">
                            <InlineMath>{mode === 'add' ? "\\vec{b}" : "-\\vec{b}"}</InlineMath>
                        </text>
                    </svg>
                </div>
            </motion.div>

        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm text-slate-500">
            <div>
                <strong>Tip:</strong> The order of addition doesn't matter (<InlineMath>\vec{a}+\vec{b} = \vec{b}+\vec{a}</InlineMath>), but subtraction order does!
            </div>
            {isSnapped && (
                <button 
                    onClick={() => { setIsSnapped(false); setBPos({x: 50, y: 350}); }}
                    className="text-blue-600 hover:underline font-bold"
                >
                    Reset Puzzle ↺
                </button>
            )}
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="add-sub-end-to-end"
      slideTitle="Adding & subtracting vectors end-to-end"
      moduleId="vectors-prerequisite"
      submoduleId="vector-addition-and-subtraction"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}