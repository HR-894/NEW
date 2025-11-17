import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Github, ExternalLink, Linkedin } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  desc: string;
  img: string;
  githubUrl?: string;
  liveUrl?: string;
  linkedinLink?: string;
}

const projects: Project[] = [
  {
    title: 'AI Chat Application',
    desc: 'This is my personal AI that can run offline and this is based on Llama3 and Phi models.',
    img: '/project1.png',
    githubUrl: 'https://github.com/HR-894/HR-AI-MIND',
    liveUrl: 'https://ai.hraimind.in',
  },
  {
    title: 'Product Analytics Dashboard',
    desc: 'Created a comprehensive analytics platform for tracking user metrics and KPIs.',
    img: '/project2.png',
    githubUrl: 'https://github.com/HR-894/HR-894'
  },
  {
    title: 'Prompt Engineering Tool',
    desc: 'Developed a prompt optimization tool for improving AI model outputs.Check it out on my LinkedIn Profile Pojects section.',
    img: '/project3.jpg', 
    liveUrl: 'https://gemini.google.com/gem/9e757c528d1e',
    linkedinLink: 'https://www.linkedin.com/in/himanshu-raj-373297383'
  },
  {
    title: 'AI Content Generator',
    desc: 'Built an AI-powered content generation platform with customizable templates.Check it out on my LinkedIn Profile Pojects section.',
    img: '/project4.jpg',
    liveUrl: 'https://chatgpt.com/g/g-68f1256276d48191a789a0b4ea855347-ai-reels-trend-master',
    linkedinLink: 'https://www.linkedin.com/in/himanshu-raj-373297383'
  }
];

export const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="portfolio" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow animate-glow inline-block"> {/* <-- HEADING STYLE FIX */}
            Featured <span className="text-gradient">Projects</span>
          </span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/90"> {/* <-- FIX: Removed glass-text */}
            A selection of my recent work in AI, product management, and software development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card group cursor-pointer glass-effect overflow-hidden hover:scale-105 hover:shadow-[0_0_40px_rgba(160,80,240,0.4)] transition-all duration-500 relative"
              onClick={() => setSelectedProject(project)}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <span className="text-gradient"> {/* <-- FIX: gradient text */}
                    {project.title}
                  </span>
                </h3>
                <p className="text-foreground/90 text-sm">{project.desc}</p> {/* <-- FIX: Removed glass-text */}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-effect border-border max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="w-full rounded-lg"
              />
              <p className="text-muted-foreground">{selectedProject.desc}</p>
              <div className="flex gap-3">
                {/* GitHub Button (Sirf agar githubUrl hai) */}
                {selectedProject.githubUrl && (
                  <Button asChild variant="outline">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </a>
                  </Button>
                )}
                
                {/* LinkedIn Button (Sirf agar linkedinLink hai) */}
                {selectedProject.linkedinLink && (
                  <Button asChild variant="outline">
                    <a href={selectedProject.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" size={16} />
                      LinkedIn
                    </a>
                  </Button>
                )}

                {/* Live Demo Button (Jaise tha waisa hi) */}
                {selectedProject.liveUrl && (
                  <Button asChild>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2" size={16} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};