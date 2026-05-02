import { motion } from 'framer-motion'
import DataItem from './content-type'

const CERT_COLORS = [
  '#f472b6',
  '#a78bfa',
  '#22d3ee',
  '#fbbf24',
  '#fb923c',
  '#34d399',
  '#60a5fa',
  '#f87171',
  '#e879f9',
  '#4ade80',
]

const Certifications: React.FC<{ Content: DataItem }> = ({ Content }) => {
  return (
    <section id="certifications" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: '#fbbf24', fontSize: '18px' }}>✦</span>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#9ca3af' }}>Always learning</p>
          </div>
          <h2 className="font-syne font-bold mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#1a1a1a' }}>
            Certifications
          </h2>
          <svg width="80" height="10" viewBox="0 0 80 10" fill="none">
            <path d="M2,5 Q10,1 20,5 Q30,9 40,5 Q50,1 60,5 Q70,9 78,5" stroke="url(#cGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="cGrad" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } }, hidden: {} }}
        >
          {Content.certifications
            .sort((a, b) => b.year - a.year)
            .map((cert, index) => {
              const color = CERT_COLORS[index % CERT_COLORS.length]
              return (
                <motion.a
                  key={index}
                  href={cert.link}
                  target="_blank"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -4, boxShadow: `0 6px 20px ${color}30` }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white"
                  style={{
                    borderLeft: `3.5px solid ${color}`,
                    border: `1px solid rgba(0,0,0,0.07)`,
                    borderLeftWidth: '3.5px',
                    borderLeftColor: color,
                    textDecoration: 'none',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <img
                    src={cert.providerLogo}
                    className="object-contain flex-shrink-0 rounded-lg"
                    style={{ width: 28, height: 28 }}
                    alt={cert.provider}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate" style={{ color: '#1a1a1a' }}>
                      {cert.name}
                    </p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color }}>
                      {cert.provider}
                    </p>
                  </div>
                </motion.a>
              )
            })}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
