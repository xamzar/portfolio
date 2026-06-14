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
          <a href="https://github.com/xamzar" target="_blank" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/xmzr" target="_blank" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
              <path d="M8 11v6"/>
              <path d="M8 8.01v-.01"/>
              <path d="M12 17v-6"/>
              <path d="M16 17v-3a2 2 0 00-4 0"/>
            </svg>
          </a>
          <a href="https://instagram.com/xmzr.dev" target="_blank" title="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://t.me/xmzrdev" target="_blank" title="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"/>
              <path d="M22 2L15 22l-5.5-8.5L1 8l21-6z"/>
            </svg>
          </a>
          <a href="mailto:rauan.khamza@gmail.com" title="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-10 7L2 7"/>
            </svg>
          </a>
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
