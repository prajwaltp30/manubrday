import React from 'react';
import './DinnerDate.css';

export default function DinnerDate({ onNext }) {
  const handleOrderNow = () => {
    // Example: link to Zomato or Swiggy with a coupon code
    window.open('https://link.zomato.com/xqzv/gctype71?code=7000119595192285 ', '_blank');
  };

  return (
    <div className="dinner-date-container">
      <h2>🍽️ FoooD Time! 🍷</h2>
      <img
        src="https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif"
        alt="Praju serving food"
        className="praju-serving"
      />
      <p>
        I am here for you're cravings, let's order in! 😋  Use this coupon code
        Code: 7000-1195-9519-2285 
        PIN - 097477
        Enter in Zomato
      </p>
      <button className="order-btn" onClick={handleOrderNow}>
        Order Now 🍕🍔 
      </button>
      <button className="next-btn" onClick={onNext}>
        Next ➡️
      </button>
    </div>
  );
}
