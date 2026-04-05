import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'

const API_KEY = '533e255c'

const DEFAULT_DATA = [
  { Title: 'Captain Marvel',                                               Year: '2019',    imdbID: 'tt4154664',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BZDI1NGU2ODAtNzBiNy00MWY5LWIyMGEtZjUxZjUwZmZiNjBlXkEyXkFqcGc@._V1_SX300.jpg' },
  { Title: 'Ms. Marvel',                                                   Year: '2022',    imdbID: 'tt10857164', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BNzlkNjBmOWUtOTgzZS00OWIzLThkNWEtZTg5MGY2ODAyYzZjXkEyXkFqcGc@._V1_SX300.jpg' },
  { Title: 'Marvel Zombies',                                               Year: '2025',    imdbID: 'tt16027014', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BNGNkYjI3ZWUtN2MzMS00NDg5LWE5MmYtZGE4Zjc0OGVhODM4XkEyXkFqcGc@._V1_SX300.jpg' },
  { Title: 'Marvel One-Shot: Agent Carter',                                Year: '2013',    imdbID: 'tt3067038',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BZDIwZTM4M2QtMWFhYy00N2VmLWFlMjItMzI3NjBjYTc0OTMxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg' },
  { Title: 'Marvel One-Shot: All Hail the King',                           Year: '2014',    imdbID: 'tt3438640',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BZGFkMTZkMDQtNzM4Yy00YWEwLTkzOWEtZTMyNDRlNmJhYWJhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg' },
  { Title: 'Marvel One-Shot: Item 47',                                     Year: '2012',    imdbID: 'tt2247732',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BMjNlMzAxNmQtOGEwZi00NTEyLWI0NWYtMTlhNmE2YTA3ZDVhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg' },
  { Title: "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer", Year: '2011', imdbID: 'tt2011109',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BYmVlYTg3N2QtMWM2OS00YWQyLWI2M2MtMDc0ZjBkZjk1MTY3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg' },
  { Title: 'Marvel One-Shot: The Consultant',                              Year: '2011',    imdbID: 'tt2011118',  Type: 'movie',  Poster: 'https://m.media-amazon.com/images/M/MV5BNGE4YjU5MDAtYzYzMC00M2RlLTk0NDgtNDU1MjgyMGI0MjI3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg' },
  { Title: 'Marvel Studios: Legends',                                      Year: '2021–2023', imdbID: 'tt13650480', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMzgzYjM4NTUtOTlhMS00MTJmLTkxZjgtYWY4NjI1ZWRiNGU4XkEyXkFqcGc@._V1_SX300.jpg' },
  { Title: 'Marvel Studios: Assembled',                                    Year: '2021–',   imdbID: 'tt14094206', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BNzU0ODgxNDUtMjhlYy00M2E3LTk3OGQtNjRhMzU5MTY4NWE2XkEyXkFqcGc@._V1_SX300.jpg' },
]

function parseYear(str) {
  return parseInt(str.split(/[–\-]/)[0].trim(), 10)
}

const sortFns = {
  az:     (a, b) => a.Title.localeCompare(b.Title),
  za:     (a, b) => b.Title.localeCompare(a.Title),
  newest: (a, b) => parseYear(b.Year) - parseYear(a.Year),
  oldest: (a, b) => parseYear(a.Year) - parseYear(b.Year),
}

export default function MoviesPage() {
  const [query,   setQuery]   = useState('')
  const [items,   setItems]   = useState(DEFAULT_DATA)
  const [sort,    setSort]    = useState('az')
  const [loading, setLoading] = useState(false)
  const [total,   setTotal]   = useState(337)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  const sorted = [...items].sort(sortFns[sort])

  const handleSearch = useCallback((val) => {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!val.trim()) {
      setItems(DEFAULT_DATA)
      setTotal(337)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res  = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(val)}&apikey=${API_KEY}`)
        const data = await res.json()
        const list = data.Response === 'True' ? data.Search : []
        setItems(list)
        setTotal(list.length)
      } catch {
        setItems([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }, 400)
  }, [])

  return (
    <div className="app">
      <Header>
        <span className="result-count">
          <span>{loading ? '…' : sorted.length}</span> titles
        </span>
      </Header>

      {/* Controls */}
      <div className="controls-bar">
        <div className="controls-inner">
          <div className="search-wrap">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search titles…"
              autoComplete="off"
              value={query}
              onChange={e => handleSearch(e.target.value)}
            />
            {query && (
              <button className="search-clear" aria-label="Clear search" onClick={() => handleSearch('')}>
                &#x2715;
              </button>
            )}
          </div>

          <div className="sort-wrap">
            <label className="sort-label" htmlFor="sortSelect">Sort</label>
            <select
              id="sortSelect"
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="main">
        <div className="grid">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          ) : sorted.length === 0 ? (
            <p className="no-results">No results found.</p>
          ) : (
            sorted.map((item, i) => (
              <MovieCard
                key={item.imdbID}
                item={item}
                index={i}
                onClick={() => navigate(`/movie/${item.imdbID}`)}
              />
            ))
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-brand">
            <span className="brand-marvel">MARVEL</span> Library
          </p>
          <p className="footer-note">
            Data sourced from OMDb API &middot; <span>{total}</span> total results available
          </p>
          <p className="footer-copy">&copy; 2026 Marvel Characters, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
