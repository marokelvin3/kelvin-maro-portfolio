import React from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '../data/projects';

export default function Projects({ onNavigate }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          indexLabel="03"
          eyebrow="Selected Work"
          title="Featured Software, Healthcare &"
          highlight="Web Platforms"
          subtitle="Production hospital portals, multi-site healthcare ecosystems, SaaS web apps, and client storefronts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
