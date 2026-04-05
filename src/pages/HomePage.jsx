import { useNavigate } from 'react-router-dom'

const PARTICLES = [
  { size: 180, top: '10%',  left: '8%',  dur: '18s', delay: '0s'  },
  { size: 80,  top: '20%',  left: '80%', dur: '14s', delay: '-4s' },
  { size: 120, top: '60%',  left: '88%', dur: '20s', delay: '-8s' },
  { size: 60,  top: '75%',  left: '5%',  dur: '16s', delay: '-2s' },
  { size: 200, top: '85%',  left: '45%', dur: '22s', delay: '-6s' },
  { size: 50,  top: '40%',  left: '55%', dur: '12s', delay: '-10s'},
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* Animated background glow */}
      <div className="home-bg-glow" />

      {/* Floating particles */}
      <div className="home-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="home-particle"
            style={{
              width:  p.size,
              height: p.size,
              top:    p.top,
              left:   p.left,
              animationDuration: p.dur,
              animationDelay:    p.delay,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="home-content">

        {/* Shield + brand */}
        <div className="home-logo">
          <div className="home-shield">
            <svg viewBox="0 0 100 114" width="110" height="126" aria-hidden="true">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ff3b3f" />
                  <stop offset="100%" stopColor="#b01519" />
                </linearGradient>
              </defs>
              {/* Shield body */}
              <path
                d="M50 3 L97 19 L97 53 Q97 85 50 111 Q3 85 3 53 L3 19 Z"
                fill="url(#shieldGrad)"
              />
              {/* Inner highlight */}
              <path
                d="M50 10 L90 24 L90 53 Q90 79 50 103 Q10 79 10 53 L10 24 Z"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
              {/* M letterform */}
              <text
                x="50"
                y="74"
                textAnchor="middle"
                fill="white"
                fontSize="52"
                fontWeight="900"
                fontFamily="Inter, system-ui, sans-serif"
                letterSpacing="-2"
              >
                M
              </text>
            </svg>
          </div>

          <div className="home-brand">
            <span className="home-marvel-text">MARVEL</span>
            <span className="home-libraries-text">Libraries</span>
          </div>
        </div>

        {/* Red divider */}
        <div className="home-divider" />

        {/* Tagline */}
        <p className="home-tagline">
          Your ultimate guide to the Marvel Cinematic Universe — movies, series, and more.
        </p>

        {/* Stats row */}
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">500+</span>
            <span className="home-stat-label">Titles</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-num">Movies</span>
            <span className="home-stat-label">&amp; Series</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-num">OMDb</span>
            <span className="home-stat-label">Powered</span>
          </div>
        </div>

        {/* CTA */}
        <button className="home-cta" onClick={() => navigate('/movies')}>
          Browse Movies
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

      </div>
    </div>
  )
}
