import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---

const toDegrees = (rad: number) => (rad * 180) / Math.PI;

const getMagnitude = (dx: number, dy: number) => Math.sqrt(dx * dx + dy * dy);

const getAngle = (dx: number, dy: number) => {
  let angle = Math.atan2(dy, dx); 
  // Normalize to 0-360 for easier comparison logic if needed, but standard atan2 (-180 to 180) is fine
  return toDegrees(angle);
};

// Tolerance for "Equality" check (since dragging isn't pixel perfect)
const MAG_TOLERANCE = 5;
const ANG_TOLERANCE = 5;

// --- COMPONENT ---

export default function EquivalentVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // -- STATE --
  
  // Reference Vector A (Fixed properties, but we center it visually)
  const vecA = { 
    start: { x: 100, y: 150 }, 
    end: { x: 200, y: 100 }, // dx = 100, dy = -50
    color: "#3B82F6" 
  };
  
  // Calculated properties of A
  const dxA = vecA.end.x - vecA.start.x;
  const dyA = vecA.end.y - vecA.start.y;
  const magA = getMagnitude(dxA, dyA);
  const angA = getAngle(dxA, dyA);

  // Interactive Vector B
  // We store Tail Position (pos) and Head Position relative to Tail (vector components)
  const [bTail, setBTail] = useState({ x: 250, y: 250 });
  const [bHeadRel, setBHeadRel] = useState({ dx: 50, dy: -80 }); // Initial different state
  
  const magB = getMagnitude(bHeadRel.dx, bHeadRel.dy);
  const angB = getAngle(bHeadRel.dx, bHeadRel.dy);

  // -- CHECKS --
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

  // Track success when user matches them
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

  // -- HANDLERS --

  // Dragging the whole vector (Tail)
  const handleDragTail = (event: any, info: any) => {
    setBTail({ 
      x: bTail.x + info.delta.x, 
      y: bTail.y + info.delta.y 
    });
  };

  // Dragging the Head (Changing Magnitude/Direction)
  const handleDragHead = (event: any, info: any) => {
    setBHeadRel({
      dx: bHeadRel.dx + info.delta.x,
      dy: bHeadRel.dy + info.delta.y
    });
  };

  // Snap B to match A button
  const snapToMatch = () => {
    setBHeadRel({ dx: dxA, dy: dyA });
  };

  // Reset B to random
  const resetB = () => {
    setBHeadRel({ dx: 50, dy: -50 });
    setBTail({ x: 250, y: 250 });
    setSuccessCount(0); // Allow re-trigger if needed, or just visual reset
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Are these vectors equal?</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Two vectors are <strong>equivalent</strong> (<InlineMath>{`\\vec{A} = \\vec{B}`}</InlineMath>) if and only if they have the <strong>same magnitude</strong> AND the <strong>same direction</strong>.
            <br/> Their starting position <em>does not matter</em>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Interactive Area */}
          <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[400px] overflow-hidden select-none cursor-crosshair shadow-inner">
            
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
                <marker id="arrowhead-A" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
                <marker id="arrowhead-B" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={isEquivalent ? "#10B981" : "#EF4444"} />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Hint Text Overlay */}
            <div className="absolute top-4 left-4 text-xs text-slate-400 pointer-events-none">
              Drag the <span className="text-red-500 font-bold">Red Dot</span> to change <InlineMath>{`\\vec{B}`}</InlineMath>.<br/>
              Drag the <span className="text-red-500 font-bold">Line</span> to move <InlineMath>{`\\vec{B}`}</InlineMath>.
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              
              {/* VECTOR A (FIXED) */}
              <g>
                <line 
                  x1={vecA.start.x} y1={vecA.start.y} 
                  x2={vecA.end.x} y2={vecA.end.y} 
                  stroke={vecA.color} 
                  strokeWidth="4" 
                  markerEnd="url(#arrowhead-A)" 
                />
                <text x={(vecA.start.x + vecA.end.x)/2} y={(vecA.start.y + vecA.end.y)/2 - 10} fill={vecA.color} fontWeight="bold" fontSize="16">
                  <InlineMath>{`\\vec{A}`}</InlineMath>
                </text>
              </g>

              {/* VECTOR B (INTERACTIVE) */}
              {/* We render the line here, but controls are Framer Motion divs on top */}
              <g>
                <line 
                  x1={bTail.x} y1={bTail.y} 
                  x2={bTail.x + bHeadRel.dx} y2={bTail.y + bHeadRel.dy} 
                  stroke={isEquivalent ? "#10B981" : "#EF4444"} 
                  strokeWidth="4" 
                  markerEnd="url(#arrowhead-B)" 
                />
                <text x={bTail.x + bHeadRel.dx/2} y={bTail.y + bHeadRel.dy/2 - 10} fill={isEquivalent ? "#10B981" : "#EF4444"} fontWeight="bold" fontSize="16">
                   <InlineMath>{`\\vec{B}`}</InlineMath>
                </text>
              </g>

              {/* Angle Arcs (Optional polish: showing direction visually) */}
              {/* Simplified for now to keep code clean */}
            </svg>

            {/* --- INTERACTIVE CONTROLS LAYER (Framer Motion) --- */}
            
            {/* Control Point: TAIL (Moves the whole vector) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragTail}
              className="absolute w-8 h-8 rounded-full bg-white/0 cursor-move flex items-center justify-center group"
              style={{ left: bTail.x - 16, top: bTail.y - 16 }}
            >
              <div className={`w-3 h-3 rounded-full ${isEquivalent ? 'bg-green-500' : 'bg-red-500'} group-hover:scale-150 transition-transform`} />
            </motion.div>

            {/* Control Point: HEAD (Changes vector shape) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragHead}
              className="absolute w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer flex items-center justify-center shadow-sm border border-white/50"
              style={{ left: (bTail.x + bHeadRel.dx) - 20, top: (bTail.y + bHeadRel.dy) - 20 }}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white ${isEquivalent ? 'bg-green-500' : 'bg-red-500'}`} />
            </motion.div>

          </div>

          {/* Sidebar: Stats & Checks */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Properties Comparison</h3>
              
              <div className="space-y-4">
                {/* Magnitude Check */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Magnitude (Length)</div>
                    <div className="font-mono text-sm">
                      <InlineMath>{`|\\vec{A}| \\approx ${magA.toFixed(1)}`}</InlineMath>
                    </div>
                    <div className={`font-mono text-sm font-bold ${isMagEqual ? 'text-green-600' : 'text-red-500'}`}>
                      <InlineMath>{`|\\vec{B}| \\approx ${magB.toFixed(1)}`}</InlineMath>
                    </div>
                  </div>
                  <div className="text-2xl">{isMagEqual ? '✅' : '❌'}</div>
                </div>

                {/* Direction Check */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Direction (Angle)</div>
                    <div className="font-mono text-sm">
                      <InlineMath>{`\\theta_A \\approx ${angA.toFixed(1)}^\\circ`}</InlineMath>
                    </div>
                    <div className={`font-mono text-sm font-bold ${isDirEqual ? 'text-green-600' : 'text-red-500'}`}>
                      <InlineMath>{`\\theta_B \\approx ${angB.toFixed(1)}^\\circ`}</InlineMath>
                    </div>
                  </div>
                  <div className="text-2xl">{isDirEqual ? '✅' : '❌'}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className={`p-4 rounded-xl border-2 mb-4 transition-all ${isEquivalent ? 'bg-green-100 border-green-500 text-green-800' : 'bg-slate-100 border-slate-300 text-slate-500'}`}>
                <div className="font-bold text-lg mb-1">
                  {isEquivalent ? 'Vectors are Equivalent!' : 'Vectors are Different'}
                </div>
                <div className="text-sm opacity-80">
                  {isEquivalent ? <InlineMath>{`\\vec{A} = \\vec{B}`}</InlineMath> : <InlineMath>{`\\vec{A} \\neq \\vec{B}`}</InlineMath>}
                </div>
              </div>

              {!isEquivalent && (
                <button 
                  onClick={snapToMatch}
                  className="text-sm text-blue-600 hover:text-blue-500 underline decoration-dotted"
                >
                  Give me a hint (Auto-match)
                </button>
              )}
              {isEquivalent && (
                 <button 
                 onClick={resetB}
                 className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700"
               >
                 Reset & Try Again
               </button>
              )}
            </div>

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