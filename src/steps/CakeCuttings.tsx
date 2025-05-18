import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import cakeSound from "../assets/bsong.mp3"; // Add a birthday tune here
import "./CakeCuttings.css";

export default function CakeCutting({ onNext }: { onNext: () => void }) {
  const [cut, setCut] = useState(false);
  const [play] = useSound(cakeSound, { volume: 0.2 });

  const handleCut = () => {
    setCut(true);
    play();
  };

  return (
    <div className="cake-cutting-container">
      {cut && <Confetti numberOfPieces={250} />}
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cake-title"
      >
        Happy Birthday Manu 🎂💖
      </motion.h2>

      <motion.img
        src="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif"
        alt="Cake"
        className="cake-gif"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      {!cut ? (
        <motion.button
          className="cut-button"
          onClick={handleCut}
          whileTap={{ scale: 0.9 }}
        >
          🍰 Tap to Cut the Cake!
        </motion.button>
      ) : (
        <motion.button
          className="next-button"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Next ➡️
        </motion.button>
      )}
    </div>
  );
}
