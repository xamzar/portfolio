import './App.css'

const projects = [
  {
    title: 'Coming Soon',
    tech: 'React · TypeScript',
    desc: 'Projects will be listed here once completed.',
  },
]

const skills = [
  'Python', 'TypeScript', 'React', 'Java', 'C', 'SQL',
  'Git', 'Linux', 'Docker', 'Nextflow', 'R',
]

function App() {
  return (
    <>
      <nav>
        <div className="container">
          <span style={{ color: 'var(--accent-primary)', fontSize: 13 }}>
            xmzr
          </span>
          <ul className="nav-links">
            <li><a href="#about">/about</a></li>
            <li><a href="#projects">/projects</a></li>
            <li><a href="#blog">/blog</a></li>
            <li><a href="#contact">/contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <h1>Khamza Rauan</h1>
          <div className="tagline">CS @ CityU HK · building things</div>
          <p>
            Second-year computer science student. Working on AI-integrated
            education research and web stuff.
          </p>
          <div className="links">
            <a href="https://github.com/xamzar" target="_blank">github</a>
            <a href="https://linkedin.com/in/xamzar" target="_blank">linkedin</a>
            <a href="mailto:xamzara1@gmail.com">email</a>
          </div>
        </section>

        <hr className="separator" />

        <section id="about">
          <h2 className="section-title">// about</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: '1.5rem' }}>
            From Kazakhstan, based in Hong Kong. Interested in AI, software
            engineering, and building tools that make learning programming
            more accessible.
          </p>
          <div className="skills-grid">
            {skills.map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </section>

        <hr className="separator" />

        <section id="projects">
          <h2 className="section-title">// projects</h2>
          {projects.map(p => (
            <div key={p.title} className="project">
              <h3>{p.title}</h3>
              <div className="tech">{p.tech}</div>
              <p>{p.desc}</p>
            </div>
          ))}
        </section>

        <hr className="separator" />

        <section id="blog">
          <h2 className="section-title">// blog</h2>
          <div className="blog-excerpt">
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              No posts yet — coming soon.
            </p>
          </div>
        </section>

        <hr className="separator" />

        <section id="contact">
          <h2 className="section-title">// contact</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: '0.5rem' }}>
            xamzara1@gmail.com
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
            Based in Hong Kong (UTC+8) · available for collaboration & research work
          </p>
        </section>

        <hr className="separator" />

        <footer>
          xmzr.dev · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

export default App
