import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DataItem from './content-type'

export const PILL_COLORS = [
  { bg: '#f472b6', text: '#fff' },
  { bg: '#a78bfa', text: '#fff' },
  { bg: '#22d3ee', text: '#fff' },
  { bg: '#fbbf24', text: '#fff' },
  { bg: '#fb923c', text: '#fff' },
  { bg: '#34d399', text: '#fff' },
  { bg: '#60a5fa', text: '#fff' },
  { bg: '#f87171', text: '#fff' },
  { bg: '#e879f9', text: '#fff' },
  { bg: '#4ade80', text: '#fff' },
]

function MiniCarousel({ images, title, active }: { images: string[]; title: string; active: boolean }) {
  const [imgIndex, setImgIndex] = useState(0)
  const galleryId = `gallery-${title.replace(/\s+/g, '-')}`

  // Only cycle while hovered
  useEffect(() => {
    if (!active || images.length <= 1) return
    const t = setInterval(() => setImgIndex(i => (i + 1) % images.length), 1800)
    return () => clearInterval(t)
  }, [active, images.length])

  // Reset to first image when not hovered
  useEffect(() => {
    if (!active) setImgIndex(0)
  }, [active])

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shrink-0"
      animate={{ width: active ? 200 : 108, height: active ? 133 : 72 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ boxShadow: active ? '0 10px 28px rgba(248,113,113,0.18)' : 'none' }}
    >
      <AnimatePresence mode="wait">
        <motion.a
          key={imgIndex}
          className="fancybox"
          data-fancybox={galleryId}
          href={images[imgIndex]}
          data-caption={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <img src={images[imgIndex]} alt={title} className="w-full h-full object-cover" />
        </motion.a>
      </AnimatePresence>

      {images.slice(1).map((img, i) => (
        <a key={i} className="fancybox hidden" data-fancybox={galleryId} href={img} />
      ))}

      {images.length > 1 && active && (
        <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === imgIndex ? 14 : 4,
                height: 4,
                background: i === imgIndex ? '#f87171' : 'rgba(255,255,255,0.55)',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

interface ProjectRowProps {
  active: boolean
  onHover: () => void
  title: string
  link: string
  role: string
  tech: string
  description: string
  year: number
  images: string[]
  index: number
}

function ProjectRow({ active, onHover, title, link, role, tech, description, year, images, index }: ProjectRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={onHover}
    >
      <motion.div
        animate={{
          x: active ? 6 : 0,
          backgroundColor: active ? 'rgba(248,113,113,0.05)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-4 py-4 px-4 rounded-xl cursor-default"
        style={{ borderLeft: `3px solid ${active ? '#fca5a5' : 'transparent'}` }}
      >
        {/* Left: project info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="font-syne font-bold text-base" style={{ color: '#1a1a1a' }}>
              {title}
            </h3>
            {link && link !== 'Internal' && (
              <a
                href={link}
                target="_blank"
                className="text-xs font-semibold"
                style={{ color: '#fb923c' }}
                onClick={e => e.stopPropagation()}
              >
                ↗ visit
              </a>
            )}
          </div>

          <p className="text-xs font-semibold mb-2" style={{ color: '#f87171' }}>{role}</p>

          <div className="flex flex-wrap gap-1">
            {tech.split(',').map((t, i) => {
              const c = PILL_COLORS[i % PILL_COLORS.length]
              return (
                <span
                  key={i}
                  className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                  style={{ background: c.bg, color: c.text }}
                >
                  {t.trim()}
                </span>
              )
            })}
          </div>

          <AnimatePresence>
            {active && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.22 }}
                className="text-xs leading-relaxed overflow-hidden"
                style={{ color: '#6b7280' }}
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right: mini carousel */}
        <MiniCarousel images={images} title={title} active={active} />
      </motion.div>

      <div className="mx-4 h-px" style={{ background: 'rgba(248,113,113,0.1)' }} />
    </motion.div>
  )
}

const Portfolio: React.FC<{ Content: DataItem }> = ({ Content }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-20" style={{ background: '#fff8f6' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: '#f87171', fontSize: '18px' }}>✦</span>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#9ca3af' }}>
              What I've built
            </p>
          </div>
          <h2 className="font-syne font-bold mb-3" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#1a1a1a' }}>
            Portfolio
          </h2>
          <svg width="80" height="10" viewBox="0 0 80 10" fill="none">
            <path d="M2,5 Q10,1 20,5 Q30,9 40,5 Q50,1 60,5 Q70,9 78,5" stroke="url(#pGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="pGrad" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#ff9f43" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div onMouseLeave={() => setActiveIndex(null)}>
          {Content.projects.map((project, index) => (
            <ProjectRow
              key={index}
              index={index}
              active={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              title={project.title}
              link={project.link}
              role={project.role}
              tech={project.tech}
              description={project.description}
              year={project.year}
              images={project.images}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
