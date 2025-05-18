import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './MessageBack.css';

export default function MessageBack({ onNext }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return;

    setSending(true);
    emailjs
      .send(
        'service_affhs3j', // your EmailJS service ID
        'template_mc2byjx', // your EmailJS template ID
        { message },
        'd7ApTUa-17CwUywb7' // your EmailJS public key
      )
      .then(() => {
        setSent(true);
        setSending(false);
        setMessage('');
      })
      .catch(() => {
        setError('Oops! Something went wrong. Please try again.');
        setSending(false);
      });
  };

  return (
    <div className="message-back-container">
      <h2>💌 Send your love to Prajju 💖</h2>
      {!sent ? (
        <>
          <textarea
            rows={6}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={sending}
            className="send-btn"
          >
            {sending ? 'Sending...' : 'Send 💌'}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </>
      ) : (
        <>
          <p>Message sent successfully! 🥰</p>
          <button onClick={onNext} className="next-btn">
            Tataaaa, Luv Youuuuuu ...
          </button>
        </>
      )}
    </div>
  );
}
