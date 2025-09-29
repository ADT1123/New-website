import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      icon: "design",
      title: "We Design",
      description: "The design determines the quality of the end product by considering all the related factors.",
      glowColor: "blue-500"
    },
    {
      icon: "develop", 
      title: "We Develop",
      description: "Development being the most crucial stage has to be done with the right set of tools and skills both.",
      glowColor: "purple-500"
    },
    {
      icon: "collaborate",
      title: "We Collaborate",
      description: "Our expertise lets us impart knowledge and collaborate with those who need help in the field.",
      glowColor: "orange-500"
    }
  ];

  // Mouse follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(".section-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Section line animation
      gsap.fromTo(".section-line",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-line",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // About text animation
      gsap.fromTo(".about-text p",
        { opacity: 0, x: -50, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature cards simple animation
      gsap.fromTo(".feature-card",
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Interactive background particles
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const particles = document.querySelectorAll('.bg-particle');
    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.02;
      const x = e.clientX * speed;
      const y = e.clientY * speed;
      
      gsap.to(particle, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    });
  };

  // Icon component with white icons
  const FeatureIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case 'design':
        return (
          <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        );
      case 'develop':
        return (
          <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'collaborate':
        return (
          <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      default:
        return (
          <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="about-section min-h-screen py-20 px-4 relative overflow-hidden bg-black"
      id="about"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Interactive Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Colorful Floating Particles */}
        <div className="bg-particle absolute w-3 h-3 bg-blue-400/20 rounded-full top-[10%] left-[15%] animate-pulse"></div>
        <div className="bg-particle absolute w-1 h-1 bg-purple-500/30 rounded-full top-[20%] left-[80%] animate-pulse delay-300"></div>
        <div className="bg-particle absolute w-2 h-2 bg-cyan-400/25 rounded-full top-[35%] right-[10%] animate-pulse delay-500"></div>
        <div className="bg-particle absolute w-1.5 h-1.5 bg-green-400/20 rounded-full top-[45%] left-[25%] animate-pulse delay-700"></div>
        <div className="bg-particle absolute w-2.5 h-2.5 bg-orange-400/15 rounded-full top-[60%] right-[30%] animate-pulse delay-1000"></div>
        <div className="bg-particle absolute w-1 h-1 bg-pink-400/25 rounded-full top-[75%] left-[70%] animate-pulse delay-200"></div>
        <div className="bg-particle absolute w-3 h-3 bg-indigo-400/18 rounded-full top-[85%] left-[40%] animate-pulse delay-800"></div>
        <div className="bg-particle absolute w-1.5 h-1.5 bg-yellow-400/22 rounded-full top-[15%] right-[45%] animate-pulse delay-400"></div>
        <div className="bg-particle absolute w-2 h-2 bg-red-400/18 rounded-full top-[55%] left-[5%] animate-pulse delay-600"></div>
        <div className="bg-particle absolute w-1 h-1 bg-teal-400/30 rounded-full top-[70%] right-[60%] animate-pulse delay-900"></div>
        <div className="bg-particle absolute w-2.5 h-2.5 bg-violet-400/20 rounded-full top-[25%] left-[60%] animate-pulse delay-100"></div>
        <div className="bg-particle absolute w-1.5 h-1.5 bg-lime-400/25 rounded-full top-[90%] right-[20%] animate-pulse delay-1100"></div>
        
        {/* Colorful Lines/Dashes */}
        <div className="absolute top-[30%] left-[12%] w-8 h-px bg-blue-400/30 rotate-45 animate-pulse delay-300"></div>
        <div className="absolute top-[65%] right-[15%] w-6 h-px bg-purple-400/40 -rotate-45 animate-pulse delay-700"></div>
        <div className="absolute top-[80%] left-[55%] w-10 h-px bg-cyan-400/25 rotate-12 animate-pulse delay-500"></div>
        <div className="absolute top-[40%] right-[35%] w-4 h-px bg-green-400/35 -rotate-12 animate-pulse delay-900"></div>
        
        {/* Larger Colorful Accent Particles */}
        <div className="bg-particle absolute w-4 h-4 bg-orange-400/15 rounded-full top-[18%] left-[75%] animate-pulse delay-400"></div>
        <div className="bg-particle absolute w-5 h-5 bg-pink-400/12 rounded-full top-[72%] left-[18%] animate-pulse delay-800"></div>
        <div className="bg-particle absolute w-3.5 h-3.5 bg-indigo-400/20 rounded-full top-[50%] right-[5%] animate-pulse delay-200"></div>

        {/* Gradient Overlays for Depth */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/[0.05] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
            About Our <span className="text-blue-400">Team</span>
          </h2>
          <div className="section-line h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-xs"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Content */}
          <div ref={contentRef} className="about-left">
            <div className="about-text space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed cursor-pointer hover:text-white transition-colors duration-300">
                Team UAS NMIMS is a student group that aims at developing and fabricating Unmanned Aerial Systems. Through detailed studies and practical experience in the field, we believe in researching and developing highly advanced systems by integrating advanced modules.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed cursor-pointer hover:text-white transition-colors duration-300">
                <strong className="text-orange-400 hover:text-orange-300 transition-colors duration-300">BlackPeafowl (hexacopter)</strong> being our UAV for the 16th AUVSI's SUAS International Competition secured <strong className="text-green-400 hover:text-green-300 transition-colors duration-300">5th rank</strong> worldwide out of 70+ teams that participated from all over the world.
              </p>
            </div>
          </div>

          {/* Feature Cards - With Glow Effect */}
          <div className="about-right">
            <div className="feature-cards space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Glow effect from behind */}
                  <div className={`absolute -inset-1 bg-${feature.glowColor}/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}></div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                    {/* White icon container */}
                    <div className="feature-icon w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                      <FeatureIcon icon={feature.icon} />
                    </div>
                    
                    <div className="feature-content">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-all duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
