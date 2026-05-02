import { motion } from 'framer-motion'
import DataItem from './content-type'
import WavyAccentCanvas from './WavyAccentCanvas'

const DECO = [
  // right side cluster
  { id: 1,  sym: '✦', x: '62%', y: '8%',  color: '#e879f9', size: 28, delay: 0.0, dur: 4.0 },
  { id: 2,  sym: '+', x: '76%', y: '13%', color: '#a78bfa', size: 22, delay: 0.5, dur: 5.0 },
  { id: 3,  sym: '✦', x: '89%', y: '7%',  color: '#22d3ee', size: 36, delay: 1.0, dur: 3.8 },
  { id: 4,  sym: '×', x: '91%', y: '34%', color: '#f472b6', size: 26, delay: 0.3, dur: 4.5 },
  { id: 5,  sym: '✦', x: '83%', y: '54%', color: '#fbbf24', size: 32, delay: 1.5, dur: 5.2 },
  { id: 6,  sym: '+', x: '93%', y: '70%', color: '#22d3ee', size: 20, delay: 0.7, dur: 4.2 },
  { id: 7,  sym: '✦', x: '67%', y: '82%', color: '#a78bfa', size: 24, delay: 1.2, dur: 3.5 },
  { id: 8,  sym: '×', x: '74%', y: '91%', color: '#e879f9', size: 22, delay: 0.9, dur: 4.8 },
  // left edge
  { id: 9,  sym: '✦', x: '3%',  y: '25%', color: '#f472b6', size: 18, delay: 0.6, dur: 4.6 },
  { id: 10, sym: '+', x: '5%',  y: '68%', color: '#fbbf24', size: 20, delay: 1.8, dur: 5.5 },
  { id: 11, sym: '✦', x: '2%',  y: '86%', color: '#a78bfa', size: 16, delay: 1.3, dur: 3.9 },
  // top / bottom
  { id: 12, sym: '+', x: '42%', y: '3%',  color: '#e879f9', size: 16, delay: 0.4, dur: 4.3 },
  { id: 13, sym: '✦', x: '55%', y: '94%', color: '#22d3ee', size: 20, delay: 2.0, dur: 5.0 },
  // extra fill
  { id: 14, sym: '✦', x: '58%', y: '48%', color: '#fbbf24', size: 14, delay: 1.1, dur: 4.7 },
  { id: 15, sym: '×', x: '70%', y: '62%', color: '#34d399', size: 18, delay: 0.8, dur: 5.3 },
  { id: 16, sym: '+', x: '64%', y: '74%', color: '#60a5fa', size: 14, delay: 2.2, dur: 4.0 },
  { id: 17, sym: '✦', x: '96%', y: '50%', color: '#f472b6', size: 16, delay: 1.6, dur: 4.4 },
  { id: 18, sym: '✦', x: '57%', y: '22%', color: '#34d399', size: 12, delay: 0.2, dur: 5.8 },
  { id: 19, sym: '+', x: '80%', y: '40%', color: '#fbbf24', size: 18, delay: 1.4, dur: 3.6 },
  { id: 20, sym: '×', x: '50%', y: '80%', color: '#a78bfa', size: 16, delay: 0.6, dur: 5.1 },
  { id: 21, sym: '✦', x: '8%',  y: '48%', color: '#22d3ee', size: 14, delay: 2.4, dur: 4.9 },
  { id: 22, sym: '+', x: '14%', y: '12%', color: '#f87171', size: 18, delay: 1.7, dur: 4.2 },
  { id: 23, sym: '✦', x: '28%', y: '92%', color: '#e879f9', size: 14, delay: 0.3, dur: 5.4 },
  { id: 24, sym: '×', x: '36%', y: '15%', color: '#60a5fa', size: 14, delay: 1.9, dur: 3.7 },
]

// Soft glowing blobs for background depth
const BLOBS = [
  { x: '72%', y: '10%',  color: '#e879f9', size: 320 },
  { x: '88%', y: '55%',  color: '#a78bfa', size: 260 },
  { x: '60%', y: '78%',  color: '#22d3ee', size: 200 },
  { x: '50%', y: '30%',  color: '#fbbf24', size: 180 },
]

const Header: React.FC<{ Content: DataItem }> = ({ Content }) => {
  return (
    <div id="home" className="relative overflow-hidden" style={{ minHeight: '100vh', background: '#faf9f7' }}>

      {/* Soft glowing background blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: b.color,
            filter: 'blur(90px)',
            opacity: 0.1,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.13, 0.08] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      {/* Decorative scattered elements */}
      {DECO.map(el => (
        <motion.div
          key={el.id}
          style={{
            position: 'absolute',
            left: el.x,
            top: el.y,
            color: el.color,
            fontSize: el.size,
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -10, 0],
            scale: el.sym === '✦' ? [1, 1.15, 1] : [1, 1.05, 1],
            rotate: el.sym === '✦' ? [0, 12, 0] : el.sym === '×' ? [0, -15, 0] : 0,
          }}
          transition={{
            delay: el.delay,
            duration: el.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.sym}
        </motion.div>
      ))}

      {/* Main content */}
      <section className="relative z-10 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-20 w-full">

          {/* Location label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: '#9ca3af' }}
          >
            {Content.location.city}, {Content.location.state} ✦ Front-end Developer
          </motion.p>

          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-syne leading-none mb-2"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #e879f9 20%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {Content.sayHello}!
          </motion.h1>

          {/* Flowing wavy ribbon accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className="mb-6"
          >
            <WavyAccentCanvas />
          </motion.div>

          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-syne leading-tight mb-4"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#1a1a1a',
              letterSpacing: '-0.01em',
            }}
          >
            {Content.aboutHeader}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base max-w-md mb-10 leading-relaxed"
            style={{ color: '#6b7280' }}
          >
            {Content.aboutSubHeader}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-5 flex-wrap"
          >
            <a
              href={Content.contactMeURL}
              target="_blank"
              className="flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, #f472b6, #e879f9, #a78bfa)' }}
            >
              <i className="fa fa-envelope" />
              Contact me
            </a>
            <a
              href={Content.linkedInURL}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{ background: '#ede9fe', color: '#7c3aed' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ddd6fe' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe' }}
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href={Content.githubURL}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{ background: '#fce7f3', color: '#be185d' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fbcfe8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fce7f3' }}
            >
              <i className="fab fa-github" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Header
