import { motion } from 'framer-motion'
import DataItem from './content-type'

const Education: React.FC<{ Content: DataItem }> = ({ Content }) => {
  return (
    <div className="pt-8 border-t" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="h-px flex-1 rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.3))' }} />
        <div className="flex items-center gap-2">
          <span style={{ color: '#fbbf24', fontSize: '14px' }}>✦</span>
          <h3 className="font-syne font-bold text-lg px-2" style={{ color: '#1a1a1a' }}>Education</h3>
          <span style={{ color: '#fbbf24', fontSize: '14px' }}>✦</span>
        </div>
        <div className="h-px flex-1 rounded-full" style={{ background: 'linear-gradient(to left, transparent, rgba(167,139,250,0.3))' }} />
      </div>

      <motion.div
        className="flex flex-col gap-3 max-w-2xl mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
      >
        {Content.education
          .sort((a, b) => b.start - a.start)
          .map((edu, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2 min-w-0">
                <h4 className="font-syne font-bold text-sm whitespace-nowrap" style={{ color: '#1a1a1a' }}>{edu.school}</h4>
                <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                <p className="text-sm text-gray-500 truncate">{edu.name}</p>
              </div>
              <p className="text-xs font-medium whitespace-nowrap flex-shrink-0" style={{ color: '#e879f9' }}>
                {edu.start} — {edu.end}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}

export default Education
