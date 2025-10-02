import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut, Gear, Timer, Package } from 'phosphor-react';

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
      image: "/img/Hexa1.jpg",
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

  // Vehicles Data
  const vehicles = [
    {
      id: 7,
      title: "Hexacopter X6",
      description: "Advanced multi-rotor platform for heavy payload delivery and surveillance missions",
      image: "/img/HEX1.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "5.2 kg",
        flightTime: "35 minutes",
        maxSpeed: "65 km/h",
        features: ["GPS Navigation", "Obstacle Avoidance", "Auto Return", "Real-time Telemetry"]
      }
    },
    {
      id: 8,
      title: "Fixed Wing Falcon",
      description: "Long-range surveillance and mapping drone with extended flight capabilities",
      image: "/img/MTD.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "2.8 kg",
        flightTime: "120 minutes",
        maxSpeed: "95 km/h",
        features: ["Auto Takeoff/Landing", "Waypoint Navigation", "Live Video Stream", "Weather Resistant"]
      }
    },
    {
      id: 9,
      title: "Quadcopter Pro",
      description: "Versatile platform for aerial photography and precision agriculture applications",
      image: "/img/VTOL.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "3.5 kg",
        flightTime: "42 minutes",
        maxSpeed: "58 km/h",
        features: ["4K Camera Gimbal", "Precision Spraying", "Crop Monitoring", "AI Object Detection"]
      }
    },
    {
      id: 10,
      title: "Ground Rover Alpha",
      description: "All-terrain autonomous ground vehicle for last-mile delivery and inspection tasks",
      image: "/img/UGV.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "15 kg",
        flightTime: "8 hours",
        maxSpeed: "25 km/h",
        features: ["All-Terrain Mobility", "Remote Operation", "Modular Payload", "Night Vision"]
      }
    }
  ];

  useEffect(() => {
    // Add border glow styles to document
    const style = document.createElement('style');
    style.textContent = `
      .border-glow-card {
        position: relative;
        transition: all 0.7s ease;
      }
      
      .border-glow-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2), rgba(255,255,255,0.6));
        border-radius: 1.5rem;
        opacity: 0;
        z-index: -1;
        transition: opacity 0.7s ease;
        filter: blur(4px);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        padding: 2px;
      }
      
      .border-glow-card:hover::before {
        opacity: 1;
      }
      
      .border-glow-card:hover {
        border-color: rgba(255,255,255,0.4);
      }
    `;
    document.head.appendChild(style);

    // Check if user prefers reduced motion for slower PCs
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationMultiplier = prefersReducedMotion ? 0.5 : 1;

    const ctx = gsap.context(() => {
      // Smoother, lighter title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2 * animationMultiplier,
          ease: "power1.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Optimized project cards animation with reduced complexity
      gsap.fromTo(".project-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8 * animationMultiplier,
          stagger: 0.1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Lighter vehicle cards animation
      gsap.fromTo(".vehicle-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1 * animationMultiplier,
          stagger: 0.15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".vehicles-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => {
      ctx.revert();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 px-4 relative overflow-hidden"
      id="projects"
      style={{ 
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
        background: 'radial-gradient(ellipse at top, #0a0a0a 0%, #000000 100%)'
      }}
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/1 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl font-extralight text-white mb-4 tracking-tight"
            style={{ fontFamily: '"Poppins", "Inter", sans-serif' }}
          >
            Our <span className="font-light bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Research & Systems</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"></div>
        </div>

        {/* Vehicles Section */}
        <div className="mb-32">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Our Vehicles
          </h3>

          <div className="vehicles-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id}
                className="vehicle-card border-glow-card group relative bg-gradient-to-br from-white/8 via-white/4 to-white/6 border border-white/15 rounded-3xl overflow-hidden hover:border-white/25 hover:from-white/10 hover:via-white/6 hover:to-white/8 transition-all duration-700 will-change-transform"
              >
                {/* Main Card Content */}
                <div className="relative">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>

                  {/* Basic Info */}
                  <div className="p-5 space-y-3">
                    <h4 className="text-lg font-medium text-white">
                      {vehicle.title}
                    </h4>
                    
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      {vehicle.description}
                    </p>

                    <div className="inline-block px-3 py-1 text-xs bg-white/15 text-white/90 rounded-full border border-white/25 font-medium">
                      {vehicle.category}
                    </div>
                  </div>
                </div>

                {/* Expandable Details Section */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/90 to-black/85 backdrop-blur-sm border-t border-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="p-5 space-y-4">
                    <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Gear size={16} className="mr-2 text-white/80" />
                      Specifications
                    </h5>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/8 rounded-lg p-2 border border-white/15">
                        <div className="flex items-center mb-1">
                          <Package size={12} className="mr-1 text-white/70" />
                          <span className="text-white/70 font-medium">Payload</span>
                        </div>
                        <span className="text-white font-semibold">{vehicle.specs.maxPayload}</span>
                      </div>
                      
                      <div className="bg-white/8 rounded-lg p-2 border border-white/15">
                        <div className="flex items-center mb-1">
                          <Timer size={12} className="mr-1 text-white/70" />
                          <span className="text-white/70 font-medium">Flight Time</span>
                        </div>
                        <span className="text-white font-semibold">{vehicle.specs.flightTime}</span>
                      </div>
                    </div>

                    <div className="bg-white/8 rounded-lg p-2 border border-white/15">
                      <span className="text-white/70 text-xs font-medium">Max Speed: </span>
                      <span className="text-white text-xs font-semibold">{vehicle.specs.maxSpeed}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-white/70 text-xs font-medium">Key Features:</span>
                      <div className="flex flex-wrap gap-1">
                        {vehicle.specs.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-xs bg-white/12 text-white/85 rounded-md border border-white/20 font-light"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-white/50 rounded-full group-hover:bg-white/90 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Section */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Research Projects
          </h3>
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {researchProjects.map((project) => (
              <div 
                key={project.id}
                className="project-card border-glow-card group relative bg-gradient-to-br from-white/6 via-white/3 to-white/5 border border-white/12 rounded-3xl overflow-hidden hover:bg-gradient-to-br hover:from-white/10 hover:via-white/5 hover:to-white/8 hover:border-white/20 hover:scale-[1.02] transition-all duration-700 will-change-transform"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h3 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed text-sm font-light">
                    {project.description}
                  </p>

                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-xs bg-white/12 text-white/90 rounded-full border border-white/25 font-medium">
                    {project.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systems Section */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Our Systems
          </h3>
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <div 
                key={system.id}
                className="project-card border-glow-card group relative bg-gradient-to-br from-white/6 via-white/3 to-white/5 border border-white/12 rounded-3xl overflow-hidden hover:bg-gradient-to-br hover:from-white/10 hover:via-white/5 hover:to-white/8 hover:border-white/20 hover:scale-[1.02] transition-all duration-700 will-change-transform"
              >
                {/* Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img 
                    src={system.image}
                    alt={system.title}
                    className="w-full h-56 object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
                  
                  {/* Learn More Button - Only appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <a 
                      href={system.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="sm" 
                        className="bg-white/25 hover:bg-white/35 backdrop-blur-sm border border-white/40 text-white font-medium"
                      >
                        <ArrowSquareOut size={16} className="mr-2" />
                        Learn More
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h4 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-300">
                    {system.title}
                  </h4>
                  
                  <p className="text-white/80 leading-relaxed text-sm font-light">
                    {system.description}
                  </p>

                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-xs bg-white/12 text-white/90 rounded-full border border-white/25 font-medium">
                    {system.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
