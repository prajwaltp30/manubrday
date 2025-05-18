import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import emailjs from '@emailjs/browser';
import './PoseTogether.css';

const webcamStyle = {
  width: '100%',
  borderRadius: '1rem',
  marginTop: '1rem',
};

export default function PoseTogether({ onNext }: { onNext: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCapture = () => {
    const imgSrc = webcamRef.current?.getScreenshot();
    if (imgSrc) {
      setCapturedImg(imgSrc);
    }
  };

  const sendEmail = async () => {
    if (!capturedImg) return;
    setSending(true);

    const result = await emailjs.send(
      'service_affhs3j',
      'template_mc2byjx',
      {
        to_email: 'jfy.atp@gmail.com',
        message: 'Manu has posed beside Prajju! 😍📸',
        attachment: capturedImg,
      },
      'd7ApTUa-17CwUywb7'
    );

    if (result.status === 200) {
      setSent(true);
    }

    setSending(false);
  };

  return (
    <div className="pose-container">
      <h2>Now Pose Beside Me 🥹📸</h2>
      <p className="subtitle">Try to match this pose 😘 Let's take a selfieeeee ..</p>
      <img src="/slide/pose.jpg" className="prajju-pose" alt="Pose" />

      {!capturedImg ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
            }}
            style={webcamStyle}
          />
          <button className="pose-btn" onClick={handleCapture}>
            📷 Click Your Pose!
          </button>
        </>
      ) : (
        <>
          <img src={capturedImg} className="captured" alt="Captured pose" />
          {!sent && (
            <button className="pose-btn" onClick={sendEmail} disabled={sending}>
              {sending ? 'Sending... ✉️' : 'Send to Prajju 💌'}
            </button>
          )}
          {sent && (
            <>
              <p className="success">Sent successfully! 💖</p>
              <button className="pose-btn" onClick={onNext}>
                Next ➡️
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
