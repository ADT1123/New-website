// components/Timeline.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      year: "2019",
      title: "AUVSI SUAS 2019",
      description: "We Participated for the fourth time in the 17th AUVSI SUAS 2019 with our Hexa-Copter.",
      highlight: "4th rank Worldwide in Flight Readiness Review and 3rd among all Indian teams.",
      logo: "/img/NMIMS_LOGO1.png" 
    },
    {
      year: "2018", 
      title: "AUVSI SUAS 2018",
      description: "We participated for the third time in the 16th AUVSI SUAS 2018 with our hexa-copter. Over 75 teams from all across the globe participated.",
      highlight: "We secured 5th rank Worldwide and 1st among all Indian teams.",
    },
    {
      year: "2017",
      title: "AUVSI SUAS 2017", 
      description: "We participated for the second time in competition with our new drone SkyKing'17. 56 teams from all across the globe participated.",
      highlight: "We secured a Mission Rank 28 at the competition.",
    },
    {
      year: "2016",
      title: "AUVSI SUAS 2016",
      description: "We participated in the AUVSI SUAS 2016 competition held in Maryland, USA with our drone Scylla 2K16.",
      highlight: "We secured a Mission Rank 5 at the competition and 3rd among all Indian Teams.",
    }
  ];

  useEffect(() => {
    // Smart device detection
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip animations only for reduced motion preference
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ".timeline-item", ".timeline-line", planeRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Optimized GSAP config
      gsap.set(gsap.config(), { 
        force3D: true,
        nullTargetWarn: false
      });

      // Mobile-optimized animations
      const duration = isMobile ? 0.6 : 0.8;
      const stagger = isMobile ? 0.1 : 0.2;

      // Title animation - always keep
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: isMobile ? 10 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Timeline line - always keep
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: isMobile ? 1 : 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Plane animation - optimized for all devices
      if (planeRef.current && timelineRef.current) {
        const plane = planeRef.current;
        const timelineContainer = timelineRef.current;
        
        // Initial setup
        gsap.set(plane, {
          opacity: 0,
          y: 0,
          rotation: 0,
          willChange: "transform"
        });

        // Plane fade in
        gsap.to(plane, {
          opacity: 1,
          duration: 0.5,
          delay: isMobile ? 0.3 : 0.8,
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        });

        // Smooth plane movement - works on all devices
        gsap.to(plane, {
          y: () => timelineContainer.offsetHeight - 60,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 50%",
            end: "bottom 50%",
            scrub: isMobile ? 1.5 : 0.8, // Slower scrub for mobile
            onUpdate: (self) => {
              // Smooth rotation based on scroll direction
              const targetRotation = self.direction === 1 ? 0 : 180;
              gsap.to(plane, {
                rotation: targetRotation,
                duration: 0.6,
                ease: "power2.out"
              });
            }
          }
        });
      }

      // Timeline items with light animation
      gsap.fromTo(".timeline-item",
        { opacity: 0, y: isMobile ? 15 : 25 },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Year circles - simple but appealing
      gsap.utils.toArray(".year-circle").forEach((circle) => {
        gsap.fromTo(circle as Element,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: isMobile ? "power2.out" : "back.out(1.7)",
            scrollTrigger: {
              trigger: circle as Element,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Light hover effects - desktop only
      if (!isMobile) {
        gsap.utils.toArray(".timeline-card").forEach((card) => {
          const cardEl = card as Element;
          
          cardEl.addEventListener("mouseenter", () => {
            gsap.to(cardEl, {
              y: -3,
              boxShadow: "0 10px 30px rgba(255,255,255,0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          cardEl.addEventListener("mouseleave", () => {
            gsap.to(cardEl, {
              y: 0,
              boxShadow: "0 0 0px rgba(255,255,255,0)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Cleanup
      return () => {
        gsap.set([planeRef.current], { willChange: "auto" });
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-12 md:py-20 px-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
      id="Timeline"
    >
      {/* Light but appealing background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Essential gradients for depth */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/[0.03] via-white/[0.015] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/[0.025] via-white/[0.012] to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white/[0.015] to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/[0.015] to-transparent"></div>

        {/* Light corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/[0.02] to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/[0.02] to-transparent blur-3xl"></div>

        {/* Minimal stars - desktop only */}
        <div className="hidden md:block">
          <div className="absolute w-1 h-1 bg-white/30 rounded-full top-[15%] left-[10%] animate-pulse"></div>
          <div className="absolute w-0.5 h-0.5 bg-blue-200/25 rounded-full top-[25%] right-[15%] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-1 h-1 bg-white/25 rounded-full top-[65%] left-[85%] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-0.5 h-0.5 bg-purple-200/30 rounded-full bottom-[30%] right-[20%] animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-6 tracking-tight"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/25 via-white/15 to-white/25 md:transform md:-translate-x-1/2"></div>

          {/* Optimized Plane */}
          <div 
            ref={planeRef}
            className="absolute left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="relative">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/90 drop-shadow-lg transform rotate-180"
              >
                <path 
                  d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                  fill="currentColor"
                />
              </svg>
              
              {/* Light trail effect */}
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-white/10 rounded-full blur-md opacity-60"></div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-20">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year Circle */}
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-10 h-10 md:w-12 md:h-12 bg-black border border-white/25 rounded-full flex items-center justify-center hover:border-white/50 transition-all duration-300">
                    <span className="text-white font-medium text-xs md:text-sm">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`
                  pl-12 pr-4 md:pl-0 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}
                `}>
                  <div className="timeline-card bg-white/[0.03] border border-white/10 rounded-xl p-4 md:p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    
                    {/* Logo */}
                    {achievement.logo && (
                      <div className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center">
                        <img 
                          src={achievement.logo}
                          alt={`${achievement.title} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="relative pr-10">
                      {/* Year badge */}
                      <div className="inline-flex items-center px-2 py-1 mb-3 text-xs bg-white/8 text-white/80 rounded-full border border-white/15">
                        {achievement.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-base md:text-lg font-medium text-white mb-3">
                        {achievement.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/65 text-sm md:text-base mb-4 font-light leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Highlight */}
                      <div className="border-l-2 border-white/25 pl-3">
                        <p className="text-white/85 font-medium text-sm leading-relaxed">
                          {achievement.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 hover:w-full transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8 md:h-16"></div>
      </div>
    </div>
  );
};

export default Timeline;
