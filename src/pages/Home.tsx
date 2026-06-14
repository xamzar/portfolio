import '../App.css'
import { parseFrontmatter } from '../lib/frontmatter'
import skillsData from '../content/skills.json'
import projectsData from '../content/projects.json'

const projects = projectsData.projects
const skills = skillsData.skills

const blogModules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

const posts = Object.entries(blogModules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace('.md', '')
    const { data } = parseFrontmatter(raw as string)
    return { slug, title: data.title || slug, date: data.date || '', tags: data.tags || [], excerpt: data.excerpt || '' }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

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
          <a href="https://instagram.com/xmzr.dev" target="_blank">instagram</a>
          <a href="https://t.me/xmzrdev" target="_blank">telegram</a>
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

      <section id="education">
        <h2 className="section-title">// education</h2>

        <div className="edu-entry">
          <div className="edu-header">
            <div>
              <div className="edu-school">City University of Hong Kong</div>
              <div className="edu-degree">BSc Computer Science · CityUHK Tiger Scholar · Full-tuition Merit Scholarship (210k HKD/yr)</div>
            </div>
            <div className="edu-meta">
              <span>Hong Kong</span>
              <span>2025–Present</span>
            </div>
          </div>
        </div>

        <div className="edu-entry">
          <div className="edu-header">
            <div>
              <div className="edu-school">Nazarbayev University</div>
              <div className="edu-degree">CS coursework — Calc I–II, Discrete Math, C/C++, Data Structures</div>
            </div>
            <div className="edu-meta">
              <span>Kazakhstan</span>
              <span>2024–2025</span>
            </div>
          </div>
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
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            No posts yet — coming soon.
          </p>
        ) : (
          posts.map(p => (
            <article key={p.slug} style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: '0.25rem' }}>
                {p.date} ·{' '}
                <span className="post-tags">
                  {p.tags.map((t: string) => (
                    <span key={t} className="post-tag">{t}</span>
                  ))}
                </span>
              </div>
              <h3 style={{ margin: 0 }}>
                <a
                  href={`#/blog/${p.slug}`}
                  onClick={(e) => { e.preventDefault(); window.location.hash = `/blog/${p.slug}` }}
                  style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}
                >
                  {p.title}
                </a>
              </h3>
              {p.excerpt && (
                <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: '0.25rem' }}>
                  {p.excerpt}
                </p>
              )}
            </article>
          ))
        )}
        {posts.length > 0 && (
          <a
            href="#/blog"
            onClick={(e) => { e.preventDefault(); window.location.hash = '/blog' }}
            style={{ color: 'var(--accent-secondary)', fontSize: 12 }}
          >
            View all posts →
          </a>
        )}
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
