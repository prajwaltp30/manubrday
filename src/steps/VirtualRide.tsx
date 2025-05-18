import { useState } from 'react';
import './VirtualRide.css';

const ACCESS_KEY = 'nWLMOtZclw4bD09V2xlGFDj7fL1m94-4RlY8jydBTNE';

export default function VirtualRide({ onNext }) {
  const [place, setPlace] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchImages = async () => {
    if (!place) return;
    setLoading(true);
    setSearched(true);
    setImages([]);

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(place)}&per_page=10&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();
      setImages(data.results);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ride-container">
      <h2 className="ride-title">💞 Gundumaaa ottige idhaga limited place, Ivaga nin yellig hogbeku ankothiya allig hoganaa, Just type the place ... 💞</h2>

      <div className="ride-search">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter a dreamy place..."
        />
        <button onClick={fetchImages}>Search</button>
      </div>

      {loading && (
        <div className="ride-loading">
          <span className="emoji">🏍️💨</span>
          <p>Getting ready for our romantic ride...</p>
        </div>
      )}

      {!loading && searched && images.length > 0 && (
        <div className="ride-gallery">
          <h3 className="ride-heading">Here we comeee to <span>{place}</span> 💖✨</h3>
          <div className="image-grid">
            {images.map((img) => (
              <img key={img.id} src={img.urls.small} alt={img.alt_description} />
            ))}
          </div>
           <button
        className="ride-button"
        style={{ marginTop: '1rem' }}
        onClick={onNext}
      >
        Next ➡️
      </button>
        </div>
      )}

      {!loading && searched && images.length === 0 && (
        <p className="ride-error">Oops! Couldn't find that place. Try something else 💔</p>
      )}
    </div>
  );
}
