import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './MakeUpStory.css';

const storySteps = [
  {
    id: 1,
    type: 'text',
    content: "Okayyy Manu... come sit! 🪞 Today you're mine 😘 Ivath Naaan ninnaa Ready Maadthiniii",
    image: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
  },
  {
    id: 2,
    type: 'text',
    content: "Let me start with your moisturizer... soft and gentle, just like you. 🧴✨",
    image: '/makeup/lotion.gif',
  },
  {
    id: 3,
    type: 'text',
    content: "A little blush here... and a soft dab there 💕 You're glowing already!",
    image: '/makeup/blush.webp',
  },
  {
    id: 4,
    type: 'text',
    content: "Now hmm... this is the fun part — lipstick time! 💄 Ummmhaaaaaaaaaaaaa",
    image: '/makeup/lipstick.webp',
  },
  {
    id: 5,
    type: 'choice',
    content: "Which lipstick should I pick?",
    options: [
      '💋 Red Passion',
      '🌸 Soft Pink',
      '🤍 Nude Glow',
    ],
  },
  {
    id: 6,
    type: 'text',
    content: "Eyeshadow next! Just a bit of shimmer to match your twinkle ✨",
    image: '/makeup/eye.gif',
  },
  {
    id: 7,
    type: 'text',
    content: "Let’s add some cute accessories to your look! 🧚‍♀️",
    image: '/makeup/cute.gif',
  },
  {
    id: 8,
    type: 'choice',
    content: "Pick an accessory:",
    options: [
      '👑 Crown to my QUEEN',
      '🧿 Necklace to my ANGEL',
      '💫 Earrings to my WORLD',
    ],
  },
  {
    id: 9,
    type: 'text',
    content: "You're soooo pretty now I can't take my eyes off you 😍",
    image: '/makeup/look.webp',
  },
  {
    id: 10,
    type: 'text',
    content: "Ready to go out, my queen? 👑 Chalooooo chaleeee 💃",
    image: '/makeup/out.gif',
  },
];

export default function MakeUpStory({ onNext }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChoice = (option) => {
    const current = storySteps[currentStep];
    setSelections((prev) => ({ ...prev, [current.id]: option }));
    handleNext();
  };

  const handleSubmitChoices = async () => {
    try {
      await fetch('https://script.google.com/macros/s/AKfycbw6282HIhwiEJ-gORKG2hqaQcIyOkNaB8bSp5pRyVCTzsdoq0VJKN9bOxZGtEO5DMY_5A/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lipstick: selections[5] || '',
          accessory: selections[8] || '',
        }),
        mode: 'no-cors',
      });
      console.log('Choices saved!');
    } catch (error) {
      console.error('Error saving choices:', error);
    }
  };

  const step = storySteps[currentStep];

  return (
    <div className="story-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="story-content"
        >
          {step.image && <img src={step.image} alt="gif" />}
          <div className="story-emoji">{step.emoji}</div>
          <p>{step.content}</p>

          {step.type === 'choice' && (
            <div className="story-buttons">
              {step.options.map((opt) => (
                <button key={opt} onClick={() => handleChoice(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {step.type === 'text' && (
            <div className="story-buttons">
              {currentStep > 0 && <button onClick={handleBack}>⬅️ Back</button>}
              <button onClick={handleNext}>Next ➡️</button>
            </div>
          )}

          {currentStep === storySteps.length - 1 && (
            <div className="story-buttons">
              <button
                onClick={async () => {
                  await handleSubmitChoices();
                  onNext();
                }}
              >
                Proceed to Surprise 💖
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <p className="swipe-instruction">Swipe left/right or tap next to continue 💕</p>
    </div>
  );
}