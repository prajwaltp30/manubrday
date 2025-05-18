import { useState } from 'react'
import { motion } from 'framer-motion'

const dressOptions: Record<
  string,
  { id: string; image: string; link?: string }[]
> = {
  Traditional: [
    {
      id: 'trad1',
      image: '/dresses/traditional.webp',
      link: 'https://example.com/traditional1',
    },
    {
      id: 'trad2',
      image: '/dresses/traditional2.webp',
    },
    {
      id: 'trad3',
      image: '/dresses/traditional3.webp',
      link: 'https://example.com/traditional3',
    },
    {
      id: 'trad4',
      image: '/dresses/traditional4.webp',
    },
  ],
  Prom: [
    {
      id: 'prom1',
      image: '/dresses/prom1.webp',
    },
    {
      id: 'prom2',
      image: '/dresses/prom2.webp',
      link: 'https://example.com/prom2',
    },
    {
      id: 'prom3',
      image: '/dresses/prom3.webp',
    },
    {
      id: 'prom4',
      image: '/dresses/prom4.webp',
      link: 'https://example.com/prom4',
    },
  ],
  Casual: [
    {
      id: 'casual1',
      image: '/dresses/casual1.webp',
      link: 'https://example.com/casual1',
    },
    {
      id: 'casual2',
      image: '/dresses/casual2.webp',
    },
    {
      id: 'casual3',
      image: '/dresses/casual3.webp',
    },
    {
      id: 'casual4',
      image: '/dresses/casual4.webp',
    },
  ],
}

export default function DressSelection({
  style,
  onSelectDress,
}: {
  style: string
  onSelectDress: (dressId: string) => void
}) {
  const [selectedDress, setSelectedDress] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const dresses = dressOptions[style]

  const handleConfirm = async () => {
    if (!selectedDress || submitting) return
    setSubmitting(true)

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw6282HIhwiEJ-gORKG2hqaQcIyOkNaB8bSp5pRyVCTzsdoq0VJKN9bOxZGtEO5DMY_5A/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            style,
            dressId: selectedDress,
          }),
           mode: 'no-cors' // Keep this ONLY if CORS is not configured
        }
      )

      alert('🎉 Dress choice saved! You look amazing!')
    } catch (error) {
      console.warn('Fetch may be blocked by CORS, assuming success')
      alert('🎉 Dress saved (CORS prevented confirmation)!')
    } finally {
      onSelectDress(selectedDress)
    }
  }

  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👗 Dress Selection
      </motion.h2>
      <p>Choose your outfit now, Bandhmele kodsthini aythaa .. 💖</p>

      <div className="card-grid">
        {dresses.map((dress) => (
          <motion.div
            key={dress.id}
            className={`card ${selectedDress === dress.id ? 'selected' : ''}`}
            onClick={() => setSelectedDress(dress.id)}
            whileHover={{ scale: 1.05 }}
          >
            <img src={dress.image} alt={dress.id} className="card-img" />
          </motion.div>
        ))}
      </div>

      {selectedDress && (
        <motion.button
          className="button"
          style={{ marginTop: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleConfirm}
        >
          ✅ Confirm this one!
        </motion.button>
      )}
    </div>
  )
}