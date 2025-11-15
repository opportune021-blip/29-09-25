import React from 'react';
// Import the component as 'InteractionComponent' (assuming default export)
// and the type as 'InteractionType'
import InteractionComponent, { 
  Interaction as InteractionType, 
  InteractionResponse 
} from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide4() {
  const { isDarkMode } = useThemeContext();

  // --- QUIZ DEFINITION ---
  const quizKey = "nitrogenQuiz";

  // Use 'any' or 'InteractionType' - 'any' is safer if 'InteractionType'
  // has strict string enums for 'type'
  const quizDefinition: Record<string, any> = {
    [quizKey]: {
      type: "multiple-choice",
      quiz: [
        {
          questionNumber: 1,
          question: "According to the article, which type of organism is almost completely responsible for driving the nitrogen cycle?",
          answerOptions: [
            { text: "Plants", rationale: "Plants participate by absorbing nitrogen, but they don't drive the chemical conversions in the soil.", isCorrect: false },
            { text: "Bacteria", rationale: "The article highlights that bacteria perform key steps like nitrogen fixation, nitrification, and denitrification.", isCorrect: true },
            { text: "Fungi", rationale: "Fungi are mentioned as decomposers (ammonification), but not the primary drivers of the whole cycle.", isCorrect: false },
            { text: "Animals", rationale: "Animals get nitrogen from eating, they don't convert it from the air or soil.", isCorrect: false }
          ],
          hint: "Review the 'The Nitrogen Problem' section."
        },
        {
          questionNumber: 2,
          question: "Which step involves converting N₂ gas from the atmosphere into usable ammonia (NH₃)?",
          answerOptions: [
            { text: "Assimilation", rationale: "Assimilation is how plants absorb nitrates to enter the food chain.", isCorrect: false },
            { text: "Denitrification", rationale: "This is the opposite; it converts nitrates back into N₂ gas.", isCorrect: false },
            { text: "Nitrification", rationale: "This converts ammonia into nitrites (NO₂⁻) and nitrates (NO₃⁻).", isCorrect: false },
            { text: "Nitrogen Fixation", rationale: "This is the crucial first step, performed by special bacteria, to make atmospheric N₂ gas available as ammonia (NH₃).", isCorrect: true }
          ],
          hint: "This is the very first step listed in 'The Key Steps of the Cycle'."
        }
      ],
      title: "Nitrogen Cycle Check"
    }
  };

  // This is what the SlideComponentWrapper expects (for user responses)
  const localInteractions: Record<string, InteractionResponse> = {};
  // --- END OF QUIZ DEFINITION ---

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      <div className=" mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* --- LEFT COLUMN: Header, Problem, Key Steps --- */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Article: The Nitrogen Cycle
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Nitrogen is a critical component of proteins (amino acids) and nucleic acids (DNA/RNA). But for most life, it's locked away.
              </p>
            </div>

            {/* Section 1: The Nitrogen Problem & Solution */}
            <div
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-center mb-4 text-emerald-600 dark:text-emerald-400">The Nitrogen Problem</h2>
              <p className="text-lg leading-relaxed text-center">
                Our atmosphere is 78% nitrogen gas (N₂). But N₂ is extremely stable and unusable by most organisms. It must be "fixed."
              </p>
              <p className="text-xl font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mt-4 text-center">
                This entire cycle is driven almost completely by bacteria.
              </p>
            </div>

            {/* Key Steps of the Cycle */}
            <div
              className="w-full bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The Key Steps of the Cycle</h2>
              <ul className="mt-4 space-y-3 text-lg">
                <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-bold">1. Nitrogen Fixation:</span> Special bacteria (some living in plant root nodules) convert N₂ gas from the air into usable ammonia (NH₃).
                </li>
                <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-bold">2. Nitrification:</span> Other bacteria convert ammonia (NH₃) into nitrites (NO₂⁻) and then into nitrates (NO₃⁻).
                </li>
                <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-bold">3. Assimilation:</span> This is how it enters the food chain. Plants absorb nitrates (NO₃⁻) from the soil to make proteins and DNA. Animals get nitrogen by eating plants.
                </li>
                <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-bold">4. Ammonification:</span> When organisms die or produce waste, decomposers (bacteria and fungi) break them down, returning the nitrogen to the soil as ammonia (NH₃).
                </li>
                <li className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="font-bold">5. Denitrification:</span> Finally, denitrifying bacteria convert nitrates (NO₃⁻) in the soil back into N₂ gas, which returns to the atmosphere, completing the cycle.
                </li>
              </ul>
            </div>

          </div>
          {/* --- END OF LEFT COLUMN --- */}


          {/* --- RIGHT COLUMN: Image and Quiz --- */}
          <div className="w-full md:w-1/2 space-y-8"> 
            
            {/* Image (moved to top of this column) */}
            <div
              className="w-full bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center" // Added items-center for horizontal centering
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Nitrogen Cycle Diagram</h3>
              <img
                src="https://www.studyacs.com/database/files/Garden/Nitrogen%20Cycle%20www.acs.edu.au%20.jpg"
                alt="A diagram illustrating the steps of the Nitrogen Cycle"
                className="rounded-xl shadow-lg w-full h-auto max-w-sm" // Increased max-w for better fit within the column
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                Notice how bacteria are involved in every major step of the cycle, moving nitrogen between the air, soil, and living things.
              </p>
            </div>
            
            {/* --- QUIZ COMPONENT --- */}
            <div
              className="w-full"
            >
              {/* --- FIXED COMPONENT CALL (removed quizKey) --- */}
             {/*  <InteractionComponent
                interaction={quizDefinition[quizKey]}
              /> */}
              {/* --- END OF FIXED COMPONENT --- */}
            </div>
            {/* --- END OF QUIZ COMPONENT --- */}

          </div>
          {/* --- END OF RIGHT COLUMN --- */}

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="nitrogen-cycle-article"
      slideTitle="The nitrogen cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions} // Pass the empty response map
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}