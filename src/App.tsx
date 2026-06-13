import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import './App.css'

function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/'
  return hash
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
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
  } else if (route === '/blog') {
    page = <Blog navigate={navigate} />
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
          xmzr.dev · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
