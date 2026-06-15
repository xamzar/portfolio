import type { ProjectMeta } from '../lib/projects'
import { GitHubIcon } from './Icons'

interface ProjectCardProps {
  project: ProjectMeta
}

export default function ProjectCard({ project: p }: ProjectCardProps) {
  return (
    <div className="project">
      <h3>
        <a href={`#/projects/${p.slug}`}>{p.title}</a>
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="repo-link" title="GitHub repo">
            <GitHubIcon size={14} />
          </a>
        )}
      </h3>
      <div className="tech">{p.tech}</div>
      <p>{p.desc}</p>
    </div>
  )
}
