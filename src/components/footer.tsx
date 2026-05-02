import { motion } from 'framer-motion'
import DataItem from './content-type'

const Footer: React.FC<{ Content: DataItem }> = ({ Content }) => {
  return (
    <section id="contact" style={{ background: '#faf9f7' }}>
      {/* Gradient divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, #f472b6, #e879f9, #a78bfa, #22d3ee)' }} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-sm" style={{ color: '#9ca3af' }}>{Content.footerLeft}</p>

          <div className="flex gap-4 items-center">
            <a
              href={Content.linkedInURL}
              target="_blank"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-sm"
              style={{ background: '#ede9fe', color: '#7c3aed' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ddd6fe' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ede9fe' }}
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href={Content.githubURL}
              target="_blank"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-sm"
              style={{ background: '#fce7f3', color: '#be185d' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fbcfe8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fce7f3' }}
            >
              <i className="fab fa-github" />
            </a>
          </div>

          <p className="text-sm" style={{ color: '#9ca3af' }}>{Content.footerRight}</p>
        </div>
      </motion.div>
    </section>
  )
}

export default Footer
