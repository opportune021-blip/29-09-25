import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---

const toDegrees = (rad: number) => (rad * 180) / Math.PI;

const getMagnitude = (dx: number, dy: number) => Math.sqrt(dx * dx + dy * dy);

const getAngle = (dx: number, dy: number) => {
  const angle = Math.atan2(dy, dx); 
  return toDegrees(angle);
};

// Tolerance for "Equality" check
const MAG_TOLERANCE = 5;
const ANG_TOLERANCE = 5;

// --- COMPONENT ---

export default function EquivalentVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // -- STATE --
  
  // Reference Vector A (Fixed Blue Vector)
  const vecA = { 
    start: { x: 80, y: 180 }, 
    end: { x: 180, y: 120 }, 
    color: "#3B82F6" 
  };
  
  // Calculate properties of A
  const dxA = vecA.end.x - vecA.start.x;
  const dyA = vecA.end.y - vecA.start.y;
  const magA = getMagnitude(dxA, dyA);
  const angA = getAngle(dxA, dyA);

  // Interactive Vector B (Red Vector)
  // bTail: Position of the start point
  // bHeadRel: Distance from start to end (dx, dy)
  const [bTail, setBTail] = useState({ x: 200, y: 250 });
  const [bHeadRel, setBHeadRel] = useState({ dx: 50, dy: -80 }); // Start intentionally wrong
  
  const magB = getMagnitude(bHeadRel.dx, bHeadRel.dy);
  const angB = getAngle(bHeadRel.dx, bHeadRel.dy);

  // -- LOGIC CHECKS --
  const isMagEqual = Math.abs(magA - magB) < MAG_TOLERANCE;
  const isDirEqual = Math.abs(angA - angB) < ANG_TOLERANCE;
  const isEquivalent = isMagEqual && isDirEqual;

  const [successCount, setSuccessCount] = useState(0);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'equivalent-vectors-explore',
    conceptId: 'vector-equivalence',
    conceptName: 'Vector Equivalence',
    type: 'learning',
    description: 'Interactive exploration of when two vectors are equal.'
  };

  useEffect(() => {
    if (isEquivalent && successCount === 0) {
      setSuccessCount(1);
      handleInteractionComplete({
        interactionId: 'equivalent-vectors-explore',
        value: 'matched',
        timestamp: Date.now()
      });
    }
  }, [isEquivalent]);

  // -- EVENT HANDLERS --

  // 1. Dragging the Tail (Moves the whole vector)
  const handleDragTail = (_: any, info: any) => {
    setBTail(prev => ({ 
      x: prev.x + info.delta.x, 
      y: prev.y + info.delta.y 
    }));
  };

  // 2. Dragging the Head (Changes properties)
  const handleDragHead = (_: any, info: any) => {
    setBHeadRel(prev => ({
      dx: prev.dx + info.delta.x,
      dy: prev.dy + info.delta.y
    }));
  };

  const snapToMatch = () => {
    setBHeadRel({ dx: dxA, dy: dyA });
  };

  const resetB = () => {
    setBHeadRel({ dx: 50, dy: -50 });
    setBTail({ x: 200, y: 250 });
    setSuccessCount(0);
  };

  // --- CONTENT RENDER ---

  const slideContent = (
    <div className="w-full h-full p-6 flex flex-col lg:flex-row gap-8 items-stretch">
      
      {/* --- LEFT COLUMN: THEORY & CONTEXT (40%) --- */}
      <div className="lg:w-5/12 flex flex-col justify-center space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">Equivalent Vectors</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Two vectors are considered <strong>equal</strong> (<InlineMath>{`\\vec{A} = \\vec{B}`}</InlineMath>) if and only if they satisfy two specific conditions.
          </p>
        </div>

        {/* Condition Cards */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Same Magnitude</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              They must have the exact same length.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Same Direction</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              They must point in the exact same way (parallel).
            </p>
          </div>
        </div>

        {/* Key Insight Box */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-lg border border-indigo-200 dark:border-indigo-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-indigo-700 dark:text-indigo-300 font-bold uppercase text-xs tracking-wider mb-1">Crucial Insight</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                <strong>Position does not matter.</strong> You can slide a vector anywhere in space. As long as length and angle remain unchanged, it is the same vector.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* --- RIGHT COLUMN: ANIMATION & STATS (60%) --- */}
      <div className="lg:w-7/12 flex flex-col gap-4 h-full">
        
        {/* TOP RIGHT: ANIMATION AREA */}
        <div className="flex-grow bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative min-h-[350px] overflow-hidden select-none shadow-inner group">
            
            {/* 1. CSS Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {/* 2. Hint Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-2 rounded border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 font-medium">
                Drag <span className="text-red-500 font-bold">Dot</span> to change shape.<br/>
                Drag <span className="text-red-500 font-bold">Line</span> to move position.
              </p>
            </div>

            {/* 3. SVG Layer (The Visuals) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <marker id="arrowhead-blue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L2,2" fill="#3B82F6" />
                </marker>
                <marker id="arrowhead-red" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L2,2" fill={isEquivalent ? "#10B981" : "#EF4444"} />
                </marker>
              </defs>

              {/* Fixed Vector A */}
              <line 
                x1={vecA.start.x} y1={vecA.start.y} 
                x2={vecA.end.x} y2={vecA.end.y} 
                stroke={vecA.color} strokeWidth="5" markerEnd="url(#arrowhead-blue)" opacity="0.8"
              />
              <text x={(vecA.start.x + vecA.end.x)/2 - 10} y={(vecA.start.y + vecA.end.y)/2 - 10} fill={vecA.color} fontWeight="bold">
                <InlineMath>{`\\vec{A}`}</InlineMath>
              </text>

              {/* Dynamic Vector B */}
              <line 
                x1={bTail.x} y1={bTail.y} 
                x2={bTail.x + bHeadRel.dx} y2={bTail.y + bHeadRel.dy} 
                stroke={isEquivalent ? "#10B981" : "#EF4444"} 
                strokeWidth="5" markerEnd="url(#arrowhead-red)" 
              />
              <text x={bTail.x + bHeadRel.dx/2 + 10} y={bTail.y + bHeadRel.dy/2 + 10} fill={isEquivalent ? "#10B981" : "#EF4444"} fontWeight="bold">
                 <InlineMath>{`\\vec{B}`}</InlineMath>
              </text>
            </svg>

            {/* 4. Interaction Layer (Framer Motion Handles) */}
            
            {/* Tail Handle (Move) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragTail}
              className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full cursor-move flex items-center justify-center hover:bg-red-500/10 transition-colors"
              style={{ left: bTail.x, top: bTail.y }}
            >
               {/* Visual dot for tail */}
               <div className={`w-3 h-3 rounded-full ${isEquivalent ? 'bg-green-500' : 'bg-red-500'}`} />
            </motion.div>

            {/* Head Handle (Reshape) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragHead}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full cursor-pointer flex items-center justify-center shadow-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:scale-110 transition-transform active:scale-95"
              style={{ left: bTail.x + bHeadRel.dx, top: bTail.y + bHeadRel.dy }}
            >
              <div className={`w-3 h-3 rounded-full ${isEquivalent ? 'bg-green-500' : 'bg-red-500'}`} />
            </motion.div>
        </div>

        {/* BOTTOM RIGHT: STATS BOX */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-row items-center justify-between gap-4">
           
           {/* Magnitude Stats */}
           <div className="flex-1 text-center border-r border-slate-200 dark:border-slate-700 pr-4">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Magnitude</div>
              <div className="font-mono text-sm text-blue-500 mb-1"><InlineMath>{`|\\vec{A}| \\approx ${magA.toFixed(1)}`}</InlineMath></div>
              <div className={`font-mono text-sm font-bold ${isMagEqual ? 'text-green-500' : 'text-red-500'}`}>
                <InlineMath>{`|\\vec{B}| \\approx ${magB.toFixed(1)}`}</InlineMath>
              </div>
           </div>

           {/* Direction Stats */}
           <div className="flex-1 text-center border-r border-slate-200 dark:border-slate-700 pr-4">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Angle</div>
              <div className="font-mono text-sm text-blue-500 mb-1"><InlineMath>{`\\theta_A \\approx ${angA.toFixed(0)}^\\circ`}</InlineMath></div>
              <div className={`font-mono text-sm font-bold ${isDirEqual ? 'text-green-500' : 'text-red-500'}`}>
                <InlineMath>{`\\theta_B \\approx ${angB.toFixed(0)}^\\circ`}</InlineMath>
              </div>
           </div>

           {/* Status / Action */}
           <div className="flex-1 flex flex-col items-center justify-center pl-2">
              {isEquivalent ? (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded text-sm font-bold border border-green-200 dark:border-green-500/50">
                  Matched!
                </div>
              ) : (
                <button 
                  onClick={snapToMatch}
                  className="text-xs text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Auto-match Hint
                </button>
              )}
              
              {isEquivalent && (
                 <button onClick={resetB} className="text-xs text-slate-400 mt-2 hover:text-slate-600 underline">
                   Reset
                 </button>
              )}
           </div>

        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="equivalent-vectors"
      slideTitle="Equivalent vectors"
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