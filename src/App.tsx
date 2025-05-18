import { useState } from 'react'
import './App.css'
import GettingReady from './steps/GettingReady'
import DressSelection from './steps/DressSelection'
import MakeUpStory from './steps/MakeUpStory'
import VirtualRide from './steps/VirtualRide'
import PoseTogether from './steps/PoseTogether';
import CakeCutting from "./steps/CakeCuttings";
import DinnerDate from "./steps/DinnerDate";
import GiftReveal from "./steps/GiftReveal";
import MessageBack from "./steps/MessageBack";

export default function App() {
  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<string>('')

  const handleStyleSelect = (selectedStyle: string) => {
    setStyle(selectedStyle)
    setStep(2)
  }

  const handleDressConfirmed = () => {
    setStep(3)
  }

  return (
    <>
      {step === 0 && (
        <div className="container">
          <h1>🎉 Happie Birthday Manuuu .. 🎉</h1>
          <p>What if we are not together, I have planned a beautiful Virtual Birthday for you 💖</p>
          <button className="button" onClick={() => setStep(1)}>
            Shuru Madanaa 🌟
          </button>
        </div>
      )}

      {step === 1 && <GettingReady onSelectStyle={handleStyleSelect} />}
      {step === 2 && <DressSelection style={style} onSelectDress={handleDressConfirmed} />}
      {step === 3 && <MakeUpStory onNext={() => setStep(4)} />}
      {step === 4 && <VirtualRide onNext={() => setStep(5)} />} 
      {step === 5 && <PoseTogether onNext={() => setStep(6)} />}
      {step === 6 && <CakeCutting onNext={() => setStep(7)} />}
      {step === 7 && <DinnerDate onNext={() => setStep(8)} />}
      {step === 8 && <GiftReveal onNext={() => setStep(9)} />}
      {step === 9 && <MessageBack onNext={() => setStep(10)} />}

    </>
  )
}
