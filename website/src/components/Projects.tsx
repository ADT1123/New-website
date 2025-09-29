import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Research Projects Data
  const researchProjects = [
    {
      id: 1,
      title: "PLSLM",
      description: "Precision Location Soft Landing Mechanism: Used for Precision Landing irrespective of the surface protecting Drone as well as payload",
      image: "/img/Hexa1.jpg", // Place in public/img/ folder
      category: "Research"
    },
    {
      id: 2,
      title: "VTOL",
      description: "Many Industries are shifting towards VTOL because of its speed like aircraft and hovering capacity to that of multirotor providing benefits of both.",
      image: "/img/VTOL.jpg",
      category: "Research"
    },
    {
      id: 3,
      title: "Swarm",
      description: "Interactive and collective behaviour of drones has the ability to cover large areas for surveillance, dowsing forest fires, rescue operation.",
      image: "/img/SWARM.jpg",
      category: "Research"
    }
  ];

  // Systems Data
  const systems = [
    {
      id: 4,
      title: "Black Peafowl",
      description: "Peafowl is capable of fully autonomous flight, object detection and payload delivery with high endurance flight upto 45 mins",
      image: "/img/Hexa.jpg",
      category: "System",
      learnMoreUrl: "https://drive.google.com/open?id=1sU2-ivuG49dHb8_QbWLeHOfReVDFhuUs"
    },
    {
      id: 5,
      title: "MTD",
      description: "MTD is basic fixed wing designed to carry payload upto 3kgs and click high quality images with endurance upto 30 mins",
      image: "/img/MTD.jpg",
      category: "System",
      learnMoreUrl: "https://drive.google.com/open?id=1o_yZYhDHwxwdOPTK9AyDE-TnO9Af5hDj"
    },
    {
      id: 6,
      title: "UGV",
      description: "It is Unmanned Grounded Vehicle used to autonomously perform payload delivery wherever Aerial Systems can't reach",
      image: "/img/UGV.jpg",
      category: "System",
      learnMoreUrl: "https://drive.google.com/open?id=1PdfsITLalp7NEdLJIPB1cMG7GweHn0uN"
    }
  ];

  const allProjects = [...researchProjects, ...systems];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Project cards stagger animation
      gsap.fromTo(".project-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 px-4 bg-black"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl font-light text-white mb-4"
          >
            Our <span className="text-white">Research & Systems</span>
          </h2>
          <p className="text-white/60 text-lg mb-6">
            UGV + Image Processing + Aerial Photography
          </p>
          <div className="w-20 h-px bg-white mx-auto"></div>
        </div>

        {/* Research Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-8 text-center">
            Research Projects
          </h3>
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {researchProjects.map((project) => (
              <div 
                key={project.id}
                className="project-card group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h3 className="text-xl font-light text-white group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-xs bg-white/10 text-white/80 rounded-full border border-white/20">
                    {project.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systems Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-light text-white mb-8 text-center">
            Our Systems
          </h3>
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <div 
                key={system.id}
                className="project-card group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                
                {/* Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img 
                    src={system.image}
                    alt={system.title}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Learn More Button - Only appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a 
                      href={system.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                      >
                        <ArrowSquareOut size={16} className="mr-2" />
                        Learn More
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h4 className="text-xl font-light text-white group-hover:text-white transition-colors duration-300">
                    {system.title}
                  </h4>
                  
                  <p className="text-white/70 leading-relaxed text-sm">
                    {system.description}
                  </p>

                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-xs bg-white/10 text-white/80 rounded-full border border-white/20">
                    {system.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Model Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-8 text-center">
            3D Model
          </h3>
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-white/10">
            <iframe 
              src="https://sketchfab.com/models/9152d9a2c7164d1aaebc489230fcd4a7/embed" 
              className="w-full h-full"
              allowFullScreen
              title="3D Model"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
