export default function MovieCard({ item, index, onClick }) {
  const delay = Math.min(index * 0.04, 0.6)

  return (
    <article
      className="card"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div className="card-poster">
        <img
          src={item.Poster !== 'N/A' ? item.Poster : 'https://placehold.co/300x445/1a1a1a/666?text=No+Poster'}
          alt={item.Title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={e => { e.currentTarget.src = 'https://placehold.co/300x445/1a1a1a/666?text=No+Poster' }}
        />
        <span className={`card-type ${item.Type}`}>{item.Type}</span>
      </div>
      <div className="card-info">
        <h3 className="card-title">{item.Title}</h3>
        <p className="card-year">{item.Year}</p>
      </div>
    </article>
  )
}
