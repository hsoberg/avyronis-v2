'use client'

import { useState } from 'react'
import Image from 'next/image'

const tracks = [
  { id: 1, title: 'Avyronis Ambience', duration: '2:45', mood: 'Fokusert' },
  { id: 2, title: 'Growth Pulse', duration: '3:12', mood: 'Energisk' },
  { id: 3, title: 'Digital Dawn', duration: '1:58', mood: 'Minimalistisk' },
]

export default function AudioShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState(tracks[0])

  return (
    <div className="audio-showcase-container fade-up" style={{ padding: '80px 0' }}>
      <div className="audio-mockup">
        {/* Visualizer / Cover */}
        <div className="audio-mockup__visual">
           <Image 
             src="/creative/music-cover.png"
             alt="Track Cover"
             fill
             style={{ objectFit: 'cover' }}
           />
           {isPlaying && (
             <div className="sound-bars" style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '20px' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="sound-bar" style={{ 
                    width: '3px', 
                    background: '#000', 
                    height: '100%', 
                    animation: `soundWave 0.5s ease-in-out infinite alternate ${i * 0.1}s` 
                  }} />
                ))}
             </div>
           )}
        </div>

        {/* Content */}
        <div className="audio-mockup__content">
          <div className="audio-mockup__title">{activeTrack.title}</div>
          <div className="audio-mockup__sub">{activeTrack.mood} — Avyronis Studio</div>
          
          <div className="audio-mockup__progress">
            <div className="audio-mockup__bar" style={{ width: isPlaying ? '65%' : '0%', transition: 'width 2s' }}></div>
          </div>

          <div className="audio-mockup__controls">
            <button className="audio-mockup__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12L19 4V20Z" /></svg>
            </button>
            <button 
                className="audio-mockup__btn audio-mockup__btn--play"
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {isPlaying ? (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" /></svg>
                ) : (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><path d="M8 5V19L19 12L8 5Z" /></svg>
                )}
            </button>
            <button className="audio-mockup__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4L15 12L5 20V4Z" /></svg>
            </button>
          </div>
        </div>

        {/* Track List (Desktop only hidden for brevitiy here or simplified) */}
        <div className="track-list" style={{ marginLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '40px' }}>
            {tracks.map(track => (
                <div 
                  key={track.id} 
                  onClick={() => setActiveTrack(track)}
                  style={{ 
                    cursor: 'pointer',
                    marginBottom: '16px',
                    opacity: activeTrack.id === track.id ? 1 : 0.4,
                    transition: 'opacity 0.2s',
                    fontSize: '14px'
                  }}
                >
                    <div style={{ fontWeight: 600, color: '#fff' }}>{track.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{track.duration}</div>
                </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes soundWave {
            from { height: 2px; }
            to { height: 100%; }
        }
        @media (max-width: 900px) {
            .track-list { display: none; }
        }
      `}</style>
    </div>
  )
}
