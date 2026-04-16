'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const tracks = [
  { id: 1, title: 'Silent Chorus', duration: '2:08', mood: 'Atmosfærisk', src: '/Silent Chorus.wav' },
  { id: 2, title: 'Made to Feel', duration: '2:17', mood: 'Emosjonell', src: '/Made to Feel.wav' },
  { id: 3, title: 'Leiv Vidar — From Hønefoss With Love', duration: '3:41', mood: 'Rock', src: '/Leiv Vidar - From Hønefoss With Love.wav' },
]

export default function AudioShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState(tracks[0])
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Playback failed:", e))
        } else {
            audioRef.current.pause()
        }
    }
  }, [isPlaying, activeTrack])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      if (duration > 0) {
        setProgress((current / duration) * 100)
      }
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const selectTrack = (track: any) => {
    setActiveTrack(track)
    setIsPlaying(true) // Start playing immediately when selecting
  }

  const handleNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === activeTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setActiveTrack(tracks[nextIndex])
    setIsPlaying(true)
  }

  const handlePrev = () => {
    const currentIndex = tracks.findIndex(t => t.id === activeTrack.id)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    setActiveTrack(tracks[prevIndex])
    setIsPlaying(true)
  }

  return (
    <div className="audio-showcase-container fade-up" style={{ padding: '80px 0' }}>
      <audio 
        ref={audioRef} 
        src={activeTrack.src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
      
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
                    background: '#fff', 
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
            <div className="audio-mockup__bar" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
          </div>

          <div className="audio-mockup__controls">
            <button className="audio-mockup__btn" onClick={handlePrev}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12L19 4V20Z" /></svg>
            </button>
            <button 
                className="audio-mockup__btn audio-mockup__btn--play"
                onClick={togglePlay}
            >
                {isPlaying ? (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" /></svg>
                ) : (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><path d="M8 5V19L19 12L8 5Z" /></svg>
                )}
            </button>
            <button className="audio-mockup__btn" onClick={handleNext}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4L15 12L5 20V4Z" /></svg>
            </button>
          </div>
        </div>

        {/* Track List */}
        <div className="track-list" style={{ marginLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '40px' }}>
            {tracks.map(track => (
                <div 
                  key={track.id} 
                  onClick={() => selectTrack(track)}
                  style={{ 
                    cursor: 'pointer',
                    marginBottom: '16px',
                    opacity: activeTrack.id === track.id ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    transform: activeTrack.id === track.id ? 'translateX(5px)' : 'none'
                  }}
                >
                    <div style={{ fontWeight: 600, color: '#fff' }}>{track.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-muted)' }}>{track.duration} — {track.mood}</div>
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
