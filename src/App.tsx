import { useState, useEffect } from 'react'
import { useLanguage } from './i18n/context'
import Nav from './components/Nav'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Credits from './pages/Credits'

function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/'
  return hash
}

export default function App() {
  const { t } = useLanguage()
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => {
      const newRoute = getRoute()
      if (newRoute.startsWith('/')) {
        requestAnimationFrame(() => window.scrollTo(0, 0))
      }
      setRoute(newRoute)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (path: string) => {
    window.location.hash = path
  }

  let page
  if (route === '/') {
    page = <Home />
  } else if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '')
    page = <BlogPost slug={slug} navigate={navigate} />
  } else if (route.startsWith('/projects/')) {
    const slug = route.replace('/projects/', '')
    page = <Project slug={slug} navigate={navigate} />
  } else if (route === '/blog') {
    page = <Blog />
  } else if (route === '/projects') {
    page = <Projects />
  } else if (route === '/credits') {
    page = <Credits />
  } else {
    page = <Home />
  }

  return (
    <>
      <Nav route={route} navigate={navigate} />
      <div className="container">
        {page}
        <hr className="separator" />
        <footer>
          <a
            href="#/credits"
            className="footer-link"
          >
            xmzr.dev · {new Date().getFullYear()}
          </a>
          <span className="footer-sep">/</span>
          <a
            href="#/credits"
            className="footer-link"
            style={{ fontSize: 11 }}
          >
            {t('footer.credits')}
          </a>
        </footer>
      </div>
    </>
  )
}
