import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const API_KEY = '533e255c'

function DetailSkeleton() {
  return (
    <div className="detail-skeleton-inner">
      <div className="skeleton detail-skeleton-poster" />
      <div className="detail-skeleton-info">
        <div className="skeleton" style={{ height: 14, width: '40%', borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 36, width: '80%', borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: '55%', borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 24, width: '25%', borderRadius: 4, marginTop: 8 }} />
        <div className="skeleton" style={{ height: 14, width: '100%', borderRadius: 4, marginTop: 16 }} />
        <div className="skeleton" style={{ height: 14, width: '95%',  borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 14, width: '88%',  borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 14, width: '70%',  borderRadius: 4 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton" style={{ height: 10, width: '40%', borderRadius: 3 }} />
              <div className="skeleton" style={{ height: 13, width: '85%', borderRadius: 3 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value || value === 'N/A') return null
  return (
    <div className="detail-credit">
      <span className="detail-credit-label">{label}</span>
      <span className="detail-credit-val">{value}</span>
    </div>
  )
}

export default function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie,   setMovie]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setMovie(null)
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`)
      .then(r => r.json())
      .then(data => {
        if (data.Response === 'True') setMovie(data)
        else setError(data.Error || 'Movie not found.')
      })
      .catch(() => setError('Failed to load. Check your connection.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="detail-page">
      <div className="detail-hero-bg" aria-hidden="true" />

      <Header>
        <button className="back-btn" onClick={() => navigate('/movies')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Movies
        </button>
      </Header>

      {loading && <DetailSkeleton />}

      {error && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#888' }}>
          <p style={{ fontSize: '1rem' }}>{error}</p>
          <button
            onClick={() => navigate('/movies')}
            style={{ marginTop: 20, background: 'none', border: '1px solid #333', color: '#aaa', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ← Go back
          </button>
        </div>
      )}

      {movie && (
        <main className="detail-main">
          <div className="detail-inner">

            {/* Poster */}
            <div className="detail-poster-wrap">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445/1a1a1a/666?text=No+Poster'}
                alt={movie.Title}
                className="detail-poster"
                referrerPolicy="no-referrer"
                onError={e => { e.currentTarget.src = 'https://placehold.co/300x445/1a1a1a/666?text=No+Poster' }}
              />
            </div>

            {/* Info panel */}
            <div className="detail-info">

              {/* Type + rating badges */}
              <div className="detail-badges">
                <span className={`card-type ${movie.Type}`}>{movie.Type}</span>
                {movie.Rated && movie.Rated !== 'N/A' && (
                  <span className="detail-rated">{movie.Rated}</span>
                )}
              </div>

              <h1 className="detail-title">{movie.Title}</h1>

              <div className="detail-meta">
                <span>{movie.Year}</span>
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <><span className="detail-dot">·</span><span>{movie.Runtime}</span></>
                )}
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <><span className="detail-dot">·</span><span>{movie.Genre}</span></>
                )}
              </div>

              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="detail-rating">
                  <span className="detail-star">★</span>
                  <span className="detail-rating-val">{movie.imdbRating}</span>
                  <span className="detail-rating-max">/10</span>
                  {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                    <span className="detail-votes">({movie.imdbVotes} votes)</span>
                  )}
                </div>
              )}

              {movie.Plot && movie.Plot !== 'N/A' && (
                <div className="detail-section">
                  <h3 className="detail-section-label">Plot</h3>
                  <p className="detail-plot">{movie.Plot}</p>
                </div>
              )}

              <div className="detail-credits">
                <InfoRow label="Director"   value={movie.Director}  />
                <InfoRow label="Writer"     value={movie.Writer}    />
                <InfoRow label="Cast"       value={movie.Actors}    />
                <InfoRow label="Released"   value={movie.Released}  />
                <InfoRow label="Language"   value={movie.Language}  />
                <InfoRow label="Country"    value={movie.Country}   />
                <InfoRow label="Box Office" value={movie.BoxOffice} />
                <InfoRow label="Awards"     value={movie.Awards}    />
              </div>

            </div>
          </div>
        </main>
      )}
    </div>
  )
}
