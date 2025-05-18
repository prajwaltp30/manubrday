import { useState } from 'react'
import { motion } from 'framer-motion'

const styles = [
  { title: 'Traditional', emoji: '🕌', image: '/styles/traditional.webp' },
  { title: 'Prom', emoji: '🎀', image: '/styles/prom.webp' },
  { title: 'Casual', emoji: '👕', image: '/styles/casual.webp' },
]

export default function GettingReady({
  onSelectStyle,
}: {
  onSelectStyle: (style: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        💄First let’s get you ready!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Nodu ninge antha dresses select maadidhini, Choose your stylee .. ✨
      </motion.p>

      <div className="card-grid">
        {styles.map((style) => (
          <motion.div
            key={style.title}
            className={`card ${selected === style.title ? 'selected' : ''}`}
            onClick={() => {
              setSelected(style.title)
              setTimeout(() => onSelectStyle(style.title), 600)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={style.image} alt={style.title} className="card-img" />
            <div className="card-title">
              {style.emoji} {style.title}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
