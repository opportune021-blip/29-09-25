import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: triangles, 3: congruence, 4: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-chord-bisector-proof-setup', conceptId: 'ct-chord-bisector-proof-setup', conceptName: 'Proof Setup', type: 'learning', description: 'Setting up the chord bisector theorem proof' },
    { id: 'ct-chord-bisector-congruent-triangles', conceptId: 'ct-chord-bisector-congruent-triangles', conceptName: 'Congruent Triangles', type: 'learning', description: 'Showing triangle congruence' },
    { id: 'ct-chord-bisector-conclusion', conceptId: 'ct-chord-bisector-conclusion', conceptName: 'Conclusion', type: 'learning', description: 'Concluding the proof' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Chord AB
  const angleA = Math.PI * 0.7, angleB = Math.PI * 0.3;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  // Midpoint M of chord AB
  const Mx = (Ax + Bx) / 2, My = (Ay + By) / 2;

  // Diagram component
const ProofDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const chordAngle = Math.PI * 0.7;
    const Ax = cx + r * Math.cos(chordAngle);
    const Ay = cy - r * Math.sin(chordAngle);
    const Bx = cx + r * Math.cos(Math.PI - chordAngle);
    const By = cy - r * Math.sin(Math.PI - chordAngle);
    const Mx = (Ax + Bx) / 2;
    const My = (Ay + By) / 2;
    
    const steps = [
        { title: "Introduction", description: "Click 'Next' to begin the proof of the Chord Bisector Theorem." },
        { title: "Step 1: The Circle and Chord", description: "We start with a circle and its center O. We then add a chord AB, which is a line segment connecting two points on the circle." },
        { title: "Step 2: Congruent Triangles", description: "Draw a line from the center O to the midpoint M of the chord. This forms two triangles, △OAM and △OBM, which are congruent by the RHS congruence criterion." },
        { title: "Step 3: Equal Segments", description: "Since the triangles are congruent, their corresponding sides are equal. This proves that AM = MB, meaning the chord is bisected." },
        { title: "Step 4: The Conclusion", description: "This demonstrates the theorem: A perpendicular drawn from the center of a circle to a chord bisects the chord." }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Proof of the Chord Bisector Theorem</h1>
            
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
                        />
                    </div>
                </div>
                {/* Step Description */}
                <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl shadow-inner border border-blue-100 dark:border-slate-600">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">{steps[step].title}</h4>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">{steps[step].description}</p>
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
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <svg width="400" height="450" viewBox="0 0 400 350" className="mx-auto">
    {/* Circle and center */}
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#A0AEC0" strokeWidth="2" /> {/* Neutral gray for circle */}
    <circle cx={cx} cy={cy} r="4" fill="#3182CE" /> {/* Distinct blue for center O */}
    <text x={cx + 10} y={cy - 2} fill="#3182CE" fontSize="14" fontWeight="bold">O</text>
    {/* Chord AB */}
    <circle cx={Ax} cy={Ay} r="4" fill="#3182CE" />
    <circle cx={Bx} cy={By} r="4" fill="#3182CE" />
    <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3182CE" fontSize="16" fontWeight="bold">A</text>
    <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3182CE" fontSize="16" fontWeight="bold">B</text>
    <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#3182CE" strokeWidth="3" />
    {/* Midpoint M */}
    <circle cx={Mx} cy={My} r="5" fill="#DD6B20" /> {/* Distinct orange for M */}
    <text x={Mx + 10} y={My - 10} fill="#DD6B20" fontSize="16" fontWeight="bold">M</text>
    {/* Perpendicular OM */}
    <line x1={cx} y1={cy} x2={Mx} y2={My} stroke="#38A169" strokeWidth="3" /> {/* Distinct green for perpendicular */}
    {/* Right angle at M */}
    <rect x={Mx - 7} y={My - 7} width="12" height="12" fill="none" stroke="#DD6B20" strokeWidth="2" transform={`rotate(${Math.atan2(cy-My, cx-Mx)*180/Math.PI},${Mx},${My})`} />
    
    {/* Labels for the theorem conditions */}
    <text x={cx - 110} y={cy - 10} fill="#38A169" fontSize="12" fontWeight="bold" textAnchor="middle">OM ⊥ AB</text>
    
    {/* Congruent triangles highlight */}
    {step >= 2 && (
        <>
            {/* △OAM */}
            <polygon points={`${cx},${cy} ${Ax},${Ay} ${Mx},${My}`} fill="#3182CE" fillOpacity="0.1" stroke="#3182CE" strokeWidth="2" /> {/* Lighter blue fill */}
            {/* △OBM */}
            <polygon points={`${cx},${cy} ${Bx},${By} ${Mx},${My}`} fill="#38A169" fillOpacity="0.1" stroke="#38A169" strokeWidth="2" /> {/* Lighter green fill */}
            {/* Triangle labels */}
            <text x={cx - 110} y={cy + 10} fill="#3182CE" fontSize="13" fontWeight="bold" textAnchor="middle">△OAM</text>
            <text x={cx + 110} y={cy + 10} fill="#38A169" fontSize="13" fontWeight="bold" textAnchor="middle">△OBM</text>
        </>
    )}
    
    {/* Equal segments */}
    {step >= 3 && (
        <>
            {/* Tick marks for AM and MB */}
            <line x1={Ax} y1={Ay} x2={Mx} y2={My} stroke="#805AD5" strokeWidth="4" strokeDasharray="6 4" /> {/* Distinct purple */}
            <line x1={Bx} y1={By} x2={Mx} y2={My} stroke="#805AD5" strokeWidth="4" strokeDasharray="6 4" />
            <text x={(Ax + Mx) / 2 - 18} y={(Ay + My) / 2 - 8} fill="#805AD5" fontSize="13" fontWeight="bold">AM</text>
            <text x={(Bx + Mx) / 2 + 18} y={(By + My) / 2 + 8} fill="#805AD5" fontSize="13" fontWeight="bold">MB</text>
            {/* AM = MB text, moved to a clear space */}
            <text x={cx} y={cy + r + 20} fill="#805AD5" fontSize="14" fontWeight="bold" textAnchor="middle">AM = MB</text>
        </>
    )}
    
    {/* Conclusion box */}
     {step >= 4 && (
        <g>
            <rect x="50" y={cy + r + 50} width="300" height="40" fill="#EBF8FF" stroke="#3182CE" strokeWidth="2" rx="10" />
            <text x="200" y={cy + r + 75} textAnchor="middle" fill="#2C5282" fontSize="15" fontWeight="bold">OM ⊥ AB ⇒ AM = MB ✓</text>
        </g>
    )}
</svg>
                </div>
            </div>
        </div>
    );
};


  // Slide content
  const slideContent = (
    <div className="w-full h-full bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Proof Steps */}
        <div className="space-y-6">
          {/* Setup */}
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof Setup</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• Chord AB</li>
                    <li>• OM ⊥ AB, with M on AB</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300 text-sm">We want to prove that M is the midpoint of AB (AM = MB).</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Congruent Triangles */}
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Congruent Triangles</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why Congruent?</h3>
                  <ul className="space-y-2">
                    <li>• OA = OB (radii of the circle)</li>
                    <li>• OM is common to both triangles</li>
                    <li>• ∠OMA = ∠OMB = 90° (by construction)</li>
                  </ul>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Triangles △OAM and △OBM are congruent by the RHS (Right angle-Hypotenuse-Side) criterion.</div>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">Congruence means all corresponding sides are equal, so AM = MB.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          {/* Conclusion */}
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Conclusion</h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Result:</h3>
                  <p className="font-bold">OM ⊥ AB ⇒ AM = MB ✓</p>
                  <p className="text-sm mt-2 italic">A perpendicular from the center to a chord always bisects the chord.</p>
                  <div className="mt-2 text-blue-700 dark:text-blue-300">This geometric property is fundamental for constructions and proofs involving circles and chords.</div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        {/* Right column - Diagram */}
        <div className="space-y-6">
          <ProofDiagram />
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-chord-bisector-theorem-proof"
      slideTitle="Chord Bisector Theorem Proof"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 