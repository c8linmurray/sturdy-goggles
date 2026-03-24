'use client'

import { useState, useEffect } from 'react'

export default function CarouselViewer({ data }) {
  const { frames, username, caption } = data
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [ratio, setRatio] = useState('square')
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`)
    }
    updateTime()
    const t = setInterval(updateTime, 10000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])

  const goTo = (i) => {
    if (i < 0 || i >= frames.length) return
    setIndex(i)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const aspectStyles = {
    square:    { aspectRatio: '1 / 1' },
    portrait:  { aspectRatio: '4 / 5' },
    landscape: { aspectRatio: '1.91 / 1' },
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px 48px',
      gap: 20,
    }}>

      {/* Header */}
      <div style={{
        width: '100%', maxWidth: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #f09433, #dc2743)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>📱</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#888' }}>Carousel Preview</span>
        </div>
        <button
          onClick={copyLink}
          style={{
            background: copied ? '#1a3a1a' : '#141414',
            border: `1px solid ${copied ? '#2a6a2a' : '#222'}`,
            color: copied ? '#4caf50' : '#888',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          {copied ? '✓ Copied!' : '⧉ Copy Link'}
        </button>
      </div>

      {/* Aspect ratio pills */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[['square','1:1'],['portrait','4:5'],['landscape','1.91:1']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setRatio(key)}
            style={{
              background: ratio === key ? 'var(--accent)' : '#141414',
              border: `1px solid ${ratio === key ? 'var(--accent)' : '#222'}`,
              color: ratio === key ? '#fff' : '#666',
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >{label}</button>
        ))}
      </div>

      {/* Phone shell */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 44,
        padding: 14,
        width: '100%',
        maxWidth: 370,
        boxShadow: '0 0 0 1px #333, 0 40px 80px rgba(0,0,0,0.7)',
      }}>
        {/* Notch */}
        <div style={{
          width: 88, height: 10, background: '#111',
          borderRadius: 20, margin: '0 auto 10px',
        }}/>

        {/* Screen */}
        <div style={{
          background: '#fff',
          borderRadius: 30,
          overflow: 'hidden',
        }}>

          {/* Status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 18px 4px', background: '#fff',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#262626' }}>{time}</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {/* minimal battery icon */}
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="#262626" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="13" height="7" rx="1.5" fill="#262626"/>
                <path d="M20 3.5v4c.7-.3 1.2-1 1.2-2S20.7 3.8 20 3.5z" fill="#262626" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Post header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: '1px solid #dbdbdb',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                padding: 2, flexShrink: 0,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: '#262626',
                }}>
                  {(username || 'y')[0].toUpperCase()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#262626', lineHeight: 1.2 }}>
                  {username || 'yourhandle'}
                </div>
                <div style={{ fontSize: 10, color: '#8e8e8e', lineHeight: 1.2 }}>
                  Carousel Preview
                </div>
              </div>
            </div>
            <span style={{ fontSize: 18, color: '#262626', letterSpacing: 1 }}>···</span>
          </div>

          {/* Carousel image area */}
          <div style={{
            position: 'relative',
            background: '#000',
            overflow: 'hidden',
            ...aspectStyles[ratio],
          }}>
            {/* Track */}
            <div style={{
              display: 'flex',
              transform: `translateX(-${index * 100}%)`,
              transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
              height: '100%',
            }}>
              {frames.map((frame, i) => (
                <div key={i} style={{
                  flex: '0 0 100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#000',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={frame.data}
                    alt={frame.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Counter */}
            {frames.length > 1 && (
              <div style={{
                position: 'absolute', top: 10, right: 10,
                background: 'rgba(0,0,0,0.55)',
                color: '#fff', fontSize: 10, fontWeight: 600,
                padding: '3px 8px', borderRadius: 20,
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none',
              }}>
                {index + 1} / {frames.length}
              </div>
            )}

            {/* Arrows */}
            {index > 0 && (
              <button onClick={() => goTo(index - 1)} style={{
                position: 'absolute', left: 8, top: '50%',
                transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 6px rgba(0,0,0,0.25)',
              }}>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                  <path d="M7.5 1L1.5 7L7.5 13" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {index < frames.length - 1 && (
              <button onClick={() => goTo(index + 1)} style={{
                position: 'absolute', right: 8, top: '50%',
                transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 6px rgba(0,0,0,0.25)',
              }}>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                  <path d="M1.5 1L7.5 7L1.5 13" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Actions */}
          <div style={{ padding: '10px 12px 4px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                {/* Heart */}
                <button
                  onClick={() => setLiked(l => !l)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? '#ed4956' : 'none'}>
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
                      stroke={liked ? '#ed4956' : '#262626'}
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                {/* Comment */}
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" stroke="#262626" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Share */}
                <button onClick={copyLink} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="#262626" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  </svg>
                </button>
              </div>
              {/* Save */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="#262626" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Dots */}
            {frames.length > 1 && (
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', paddingBottom: 6 }}>
                {frames.slice(0, 10).map((_, i) => (
                  <div key={i} onClick={() => goTo(i)} style={{
                    width: 5, height: 5, borderRadius: '50%', cursor: 'pointer',
                    background: i === index ? '#0095f6' : '#c7c7c7',
                    transform: i === index ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s',
                  }}/>
                ))}
              </div>
            )}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: '#262626', padding: '0 12px 4px' }}>
            1,204 likes
          </div>
          {caption && (
            <div style={{ fontSize: 12, color: '#262626', padding: '0 12px 8px', lineHeight: 1.45 }}>
              <strong>{username || 'yourhandle'}</strong> {caption}
            </div>
          )}
          <div style={{ fontSize: 11, color: '#8e8e8e', padding: '0 12px 12px' }}>
            View all 48 comments
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      {frames.length > 1 && (
        <div style={{ width: '100%', maxWidth: 370 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>
            Slides
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {frames.map((frame, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  flex: '0 0 52px', height: 52,
                  borderRadius: 6, overflow: 'hidden',
                  border: `2px solid ${i === index ? 'var(--accent)' : 'transparent'}`,
                  cursor: 'pointer', background: '#222',
                  transition: 'border-color 0.15s',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={frame.data} alt={frame.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <p style={{ fontSize: 11, color: '#333', marginTop: 8 }}>
        Made with Carousel Preview · Use ← → to navigate
      </p>
    </div>
  )
}
