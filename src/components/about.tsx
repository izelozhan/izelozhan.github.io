import { motion } from 'framer-motion'
import Education from './education'
import DataItem from './content-type'
import { PILL_COLORS } from './portfolio'

const About: React.FC<{ Content: DataItem }> = ({ Content }) => {
  return (
    <section id="about" className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: '#e879f9', fontSize: '20px' }}>✦</span>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#9ca3af' }}>
                Who I am
              </p>
            </div>
            <h2
              className="font-syne font-bold mb-4"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#1a1a1a', letterSpacing: '-0.01em' }}
            >
              About me
            </h2>
            {/* Mini wavy accent */}
            <div className="mb-5 flex">
              <svg width="80" height="10" viewBox="0 0 80 10" fill="none">
                <path
                  d="M2,5 Q10,1 20,5 Q30,9 40,5 Q50,1 60,5 Q70,9 78,5"
                  stroke="url(#aGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                />
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-gray-600 leading-relaxed" style={{ fontSize: '1.05rem' }}>
              {Content.about}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span style={{ color: '#a78bfa', fontSize: '18px' }}>✦</span>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#9ca3af' }}>
                Skills & Technologies
              </p>
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
            >
              {Content.skills.map((skill, index) => {
                const c = PILL_COLORS[index % PILL_COLORS.length]
                return (
                  <motion.span
                    key={index}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="text-sm font-semibold px-4 py-1.5 rounded-full cursor-default"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {skill.name}
                  </motion.span>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Education Content={Content} />
        </motion.div>
      </div>
    </section>
  )
}

export default About
