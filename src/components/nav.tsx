import React, { useState, useEffect } from 'react'
import DataItem from './content-type'

const Nav: React.FC<{ Content: DataItem }> = ({ Content }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(250,249,247,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
      }}
    >
      <div className="flex justify-end max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex gap-1">
          {Content.menu.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ color: '#374151', fontFamily: 'Syne, sans-serif' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#e879f9'
                el.style.background = 'rgba(232,121,249,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#374151'
                el.style.background = 'transparent'
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav
