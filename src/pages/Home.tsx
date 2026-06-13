import '../App.css'
import skillsData from '../content/skills.json'
import projectsData from '../content/projects.json'

const projects = projectsData.projects
const skills = skillsData.skills

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Khamza Rauan</h1>
        <div className="tagline">CS @ CityU HK · building things</div>
        <p>
          Second-year computer science student. Working on AI-integrated
          education research and web stuff.
        </p>
        <div className="links">
          <a href="https://github.com/xamzar" target="_blank">github</a>
          <a href="https://linkedin.com/in/xmzr" target="_blank">linkedin</a>
          <a href="mailto:rauan.khamza@gmail.com">email</a>
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
            <span key={s.name} className="skill-tag">{s.name}</span>
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
          rauan.khamza@gmail.com
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
          Based in Hong Kong (UTC+8) · available for collaboration & research work
        </p>
      </section>
    </>
  )
}
