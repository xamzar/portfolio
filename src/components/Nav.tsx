interface NavProps {
  route: string
  navigate: (path: string) => void
}

export default function Nav({ route, navigate }: NavProps) {
  const isHome = route === '/'

  return (
    <nav>
      <div className="container">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }} className="logo">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
            <path d="M8 8l16 16M24 8L8 24" stroke="#d4a017" strokeWidth="3.5" strokeLinecap="square"/>
          </svg>
          xmzr
        </a>
        <ul className="nav-links">
          {isHome ? (
            <>
              <li><a href="#about">/about</a></li>
              <li><a href="#projects">/projects</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigate('/blog') }}>/blog</a></li>
              <li><a href="#contact">/contact</a></li>
            </>
          ) : (
            <>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>/home</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigate('/blog') }}>/blog</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
