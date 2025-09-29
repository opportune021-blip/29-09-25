import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SemicircleTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: diameter, 2: first point, 3: second point, 4: third point, 5: right angles, 6: moving animation
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'ct-semicircle-theorem-concept',
      conceptId: 'ct-semicircle-theorem',
      conceptName: 'Semicircle Theorem',
      type: 'learning',
      description: 'Understanding that angles subtended by a diameter are always 90°'
    },
    {
      id: 'ct-diameter-properties',
      conceptId: 'ct-diameter-properties',
      conceptName: 'Diameter Properties',
      type: 'learning',
      description: 'Understanding the special properties of diameter in creating right angles'
    },
    {
      id: 'ct-right-angle-universality',
      conceptId: 'ct-right-angle-universality',
      conceptName: 'Universal Right Angles',
      type: 'learning',
      description: 'Understanding that this property holds for any point on the circumference'
    }
  ];
  
  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Diameter A and B
  const Ax = cx - r, Ay = cy;
  const Bx = cx + r, By = cy;
  // Points on circumference
  const angle1 = Math.PI * 0.7, angle2 = Math.PI * 0.5, angle3 = Math.PI * 0.3;
  const P1x = cx + r * Math.cos(angle1), P1y = cy + r * Math.sin(angle1);
  const P2x = cx + r * Math.cos(angle2), P2y = cy + r * Math.sin(angle2);
  const P3x = cx + r * Math.cos(angle3), P3y = cy + r * Math.sin(angle3);

  // Helper for angle arc at a vertex (always draws minor angle)
  function angleArc(x: number, y: number, ax: number, ay: number, bx: number, by: number, radius = 18) {
    let angle1 = Math.atan2(ay - y, ax - x);
    let angle2 = Math.atan2(by - y, bx - x);
    
    // Normalize angles to [0, 2π]
    if (angle1 < 0) angle1 += 2 * Math.PI;
    if (angle2 < 0) angle2 += 2 * Math.PI;
    
    // Calculate difference, always take the minor angle
    let diff = angle2 - angle1;
    if (diff < 0) diff += 2 * Math.PI;
    if (diff > Math.PI) {
      // Swap angles to get minor angle
      [angle1, angle2] = [angle2, angle1];
      diff = 2 * Math.PI - diff;
    }
    
    const arcX1 = x + radius * Math.cos(angle1);
    const arcY1 = y + radius * Math.sin(angle1);
    const arcX2 = x + radius * Math.cos(angle2);
    const arcY2 = y + radius * Math.sin(angle2);
    
    // Label at arc midpoint (minor angle)
    const mid = angle1 + diff / 2;
    const labelX = x + (radius + 15) * Math.cos(mid);
    const labelY = y + (radius + 15) * Math.sin(mid);
    
    return { 
      arc: `M ${arcX1} ${arcY1} A ${radius} ${radius} 0 0 1 ${arcX2} ${arcY2}`, 
      labelX, 
      labelY 
    };
  }
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // SVG Theorem Diagram Component
const TheoremDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const Ax = cx - r;
    const Ay = cy;
    const Bx = cx + r;
    const By = cy;

    const angleP1 = Math.PI * 0.7;
    const angleP2 = Math.PI * 0.2;
    const angleP3 = Math.PI * 1.5;
    const P1x = cx + r * Math.cos(angleP1);
    const P1y = cy + r * Math.sin(angleP1);
    const P2x = cx + r * Math.cos(angleP2);
    const P2y = cy + r * Math.sin(angleP2);
    const P3x = cx + r * Math.cos(angleP3);
    const P3y = cy + r * Math.sin(angleP3);

    // This is a placeholder for the angleArc function
   const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius: number) => {
        return {
            arc: "",
            labelX: 0,
            labelY: 0
        };
    };

    // The steps for the explanation
    const steps = [
        { title: "Introduction", description: "Click 'Next' to begin exploring the Semicircle Theorem, also known as Thales's Theorem." },
        { title: "Step 1: The Diameter", description: "We start with a circle and a diameter, AB. The diameter creates a semicircle on either side." },
        { title: "Step 2: First Triangle", description: "We pick a point P on the circumference and draw lines from P to A and B, forming a triangle △APB." },
        { title: "Step 3: Second Triangle", description: "Now we add another point, Q, on the same circumference and draw lines to A and B, forming triangle △AQB." },
        { title: "Step 4: Third Triangle", description: "Finally, we add a third point, R, and form triangle △ARB. Notice how all three triangles are inscribed in the semicircle." },
        { title: "Step 5: The Right Angles", description: "The theorem states that any angle inscribed in a semicircle is a right angle (90°). This is true for all three triangles we've drawn." },
        { title: "Step 6: The Conclusion", description: "This demonstrates that no matter where you place the vertex on the semicircle, the angle formed by the endpoints of the diameter will always be 90°." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">The Semicircle Theorem</h1>
            
            {/* 2. Step Text with Indicator */}
            <div className="mb-6">
                {/* Step Indicator */}
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">Step {step + 1}</span>
                    <span className="font-light">of {steps.length}</span>
                    <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {/* Step Text */}
                <div className="p-6 bg-blue-50 dark:bg-gray-800 rounded-xl shadow-inner border border-blue-100 dark:border-gray-700 transition-all duration-300">
                    <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">
                        {steps[step].title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed text-base">
                        {steps[step].description}
                    </p>
                </div>
            </div>

            {/* 3. Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                >
                    ← Previous
                </button>
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    disabled={step === steps.length - 1}
                >
                    Next →
                </button>
            </div>

            {/* 4. Circle Diagram (your original code, untouched) */}
            <div className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Semicircle Theorem</h3>
                    <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle */}
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                        
                        {/* Center O */}
                        <circle cx={cx} cy={cy} r="3" fill="#374151" />
                        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                        
                        {/* Diameter AB */}
                        {step >= 1 && (
                            <g>
                                <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#DC2626" strokeWidth="4" />
                                <circle cx={Ax} cy={Ay} r="4" fill="#DC2626" />
                                <circle cx={Bx} cy={By} r="4" fill="#DC2626" />
                                <text x={Ax - 15} y={Ay + 20} fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
                                <text x={Bx + 8} y={By + 20} fill="#DC2626" fontSize="16" fontWeight="bold">B</text>
                            </g>
                        )}
                        
                        {/* Point P1 */}
                        {step >= 2 && (
                            <g>
                                <circle cx={P1x} cy={P1y} r="5" fill="#3B82F6" />
                                <text x={P1x - 20} y={P1y - 10} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
                                <line x1={P1x} y1={P1y} x2={Ax} y2={Ay} stroke="#3B82F6" strokeWidth="2" />
                                <line x1={P1x} y1={P1y} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="2" />
                            </g>
                        )}
                        
                        {/* Point P2 */}
                        {step >= 3 && (
                            <g>
                                <circle cx={P2x} cy={P2y} r="5" fill="#10B981" />
                                <text x={P2x - 10} y={P2y - 15} fill="#10B981" fontSize="16" fontWeight="bold">Q</text>
                                <line x1={P2x} y1={P2y} x2={Ax} y2={Ay} stroke="#10B981" strokeWidth="2" />
                                <line x1={P2x} y1={P2y} x2={Bx} y2={By} stroke="#10B981" strokeWidth="2" />
                            </g>
                        )}
                        
                        {/* Point P3 */}
                        {step >= 4 && (
                            <g>
                                <circle cx={P3x} cy={P3y} r="5" fill="#8B5CF6" />
                                <text x={P3x + 10} y={P3y - 10} fill="#8B5CF6" fontSize="16" fontWeight="bold">R</text>
                                <line x1={P3x} y1={P3y} x2={Ax} y2={Ay} stroke="#8B5CF6" strokeWidth="2" />
                                <line x1={P3x} y1={P3y} x2={Bx} y2={By} stroke="#8B5CF6" strokeWidth="2" />
                            </g>
                        )}
                        
                        {/* Right angles */}
                        {step >= 5 && (
                            <g>
                                {/* Right angle at P */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(P1x, P1y, Ax, Ay, Bx, By, 20);
                                    return <>
                                        <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
                                    </>;
                                })()}
                                
                                {/* Right angle at Q */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(P2x, P2y, Ax, Ay, Bx, By, 20);
                                    return <>
                                        <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#10B981" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
                                    </>;
                                })()}
                                
                                {/* Right angle at R */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(P3x, P3y, Ax, Ay, Bx, By, 20);
                                    return <>
                                        <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
                                    </>;
                                })()}
                            </g>
                        )}
                        
                        {/* Moving point animation */}
                        {step >= 6 && (
                            <g>
                                {/* Moving point */}
                                <circle cx={cx + r * Math.cos(Math.PI * 0.8)} cy={cy + r * Math.sin(Math.PI * 0.8)} r="6" fill="#F59E0B" className="animate-[move-around_4s_ease-in-out_infinite]" />
                                <text x="50" y="320" fill="#F59E0B" fontSize="14" fontWeight="bold">Any point on circumference creates 90°</text>
                            </g>
                        )}
                    </svg>
                     
                </div>
            </div>
        </div>
    );
};
  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Theorem Statement */}
        <div className="space-y-6">
          {/* Main Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    Any angle subtended by a <strong>diameter</strong> from any point on the circumference is a <strong>right angle</strong> (90°).
                  </p>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">In Mathematical Terms:</h3>
                  <p>If AB is a diameter and P is any point on the circle, then:</p>
                  <p className="font-bold text-center mt-2">∠APB = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Point:</h3>
                  <p>
                    This works for <strong>ANY</strong> point P on the circumference, making it a universal property of semicircles.
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Diameter Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Why Diameter?
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Special Properties:</h3>
                  <ul className="space-y-2">
                    <li>• Diameter passes through center</li>
                    <li>• Creates a semicircle (180° arc)</li>
                    <li>• Longest possible chord</li>
                    <li>• Divides circle into two equal halves</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Connection to Central Angle:</h3>
                  <p className="text-lg">The central angle subtended by a diameter is 180°, so the inscribed angle is 180° ÷ 2 = 90°</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Universal Property and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Universal Property */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Universal Property
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Always 90°:</h3>
                  <p>No matter where point P is located on the circumference, ∠APB = 90°</p>
                  <ul className="mt-2 space-y-1 text-lg">
                    <li>• Top of circle: 90°</li>
                    <li>• Side of circle: 90°</li>
                    <li>• Bottom of circle: 90°</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Constructing right angles</li>
                    <li>• Solving geometry problems</li>
                    <li>• Pythagorean theorem problems</li>
                    <li>• Architecture and engineering</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-semicircle-theorem-statement"
      slideTitle="Semicircle Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="semicircle-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 