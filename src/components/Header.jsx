import { useNavigate } from 'react-router-dom'

export default function Header({ children }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" onClick={() => navigate('/')}>
          <span className="brand-marvel">MARVEL</span>
          <span className="brand-library">Library</span>
        </div>
        {children}
      </div>
    </header>
  )
}
