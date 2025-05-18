import React, { useState, useEffect } from "react";
import "./GiftReveal.css";

const BIRTHDAY_OTP = "1432"; // Use your real OTP

const giftPhotos = [
  "/slide/img1.jpg",
  "/slide/img2.jpg",
  "/slide/img3.jpg",
  "/slide/img4.jpg",
  "/slide/img5.jpg",
  "/slide/img6.jpg",
]; // Replace with your photos

export default function GiftReveal({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    if (!unlocked) return;
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % giftPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [unlocked]);

  const handleUnlock = () => {
    if (otp === BIRTHDAY_OTP) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong code! Try again 💔");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/love-letter.pdf"; // File must be inside /public
    link.download = "1432.pdf";
    link.click();
  };

  return (
    <div className="gift-reveal-container">
      {!unlocked ? (
        <div className="unlock-section">
          <h2>🎁 Unlock Your Special Gift 🎁</h2>
          <p>Hint: It's your birthday code 💕</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            placeholder="Enter code"
          />
          <button onClick={handleUnlock} className="unlock-btn">
            Unlock 💌
          </button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <div className="gift-content">
          <h3>Here’s a little something... 💖</h3>

          <div className="photo-slideshow">
            {giftPhotos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Gift ${index + 1}`}
                className={index === currentPhoto ? "visible" : "hidden"}
              />
            ))}
          </div>

          <p>And now... something from the heart 📜</p>
          <button onClick={handleDownload} className="download-btn">
            Download My Letter 💌
          </button>

          <button onClick={onNext} className="next-btn">
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
}
