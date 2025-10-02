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
    // Aggressive device detection
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4 || (navigator as any).deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip all animations if reduced motion or very low-end
    if (prefersReducedMotion || (isMobile && isLowEnd)) {
      gsap.set([titleRef.current, ".timeline-item", ".timeline-line", planeRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Minimal GSAP config for performance
      gsap.set(gsap.config(), { 
        force3D: true,
        nullTargetWarn: false
      });

      // Only essential animations for mobile
      if (isMobile) {
        // Super simple title fade
        gsap.fromTo(titleRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );

        // Simple timeline line
        gsap.fromTo(".timeline-line",
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Simple timeline items fade - no stagger
        gsap.fromTo(".timeline-item",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Skip plane animation on mobile completely for performance
        gsap.set(planeRef.current, { opacity: 0, display: 'none' });

      } else {
        // Desktop animations - optimized
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        gsap.fromTo(".timeline-line",
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );

        // Desktop plane animation - simplified
        if (planeRef.current && timelineRef.current) {
          const plane = planeRef.current;
          const timelineContainer = timelineRef.current;
          
          gsap.set(plane, { opacity: 0, y: 0, rotation: 0 });

          gsap.to(plane, {
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          });

          gsap.to(plane, {
            y: () => timelineContainer.offsetHeight - 80,
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
              onUpdate: (self) => {
                gsap.set(plane, {
                  rotation: self.direction === 1 ? 0 : 180
                });
              }
            }
          });
        }

        // Desktop timeline items with light stagger
        gsap.fromTo(".timeline-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              toggleActions: "play none none none"
            }
          }
        );

        // Simple year circles for desktop only
        gsap.utils.toArray(".year-circle").forEach((circle) => {
          gsap.fromTo(circle as Element,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: circle as Element,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }

      // Skip all complex animations (badges, titles, descriptions) for performance
      // Skip all particle animations completely
      // Skip all hover effects for mobile

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-8 md:py-20 px-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
      id="Timeline"
    >
      {/* Ultra minimal background - no particles, minimal gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Only essential gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/[0.015] to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Simplified Title */}
        <div className="text-center mb-8 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-4 md:mb-6 tracking-tight"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Minimal Timeline Line */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/20 via-white/15 to-white/20 md:transform md:-translate-x-1/2"></div>

          {/* Simplified Plane - hidden on mobile */}
          <div 
            ref={planeRef}
            className="absolute left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none hidden md:block"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/80 transform rotate-180"
            >
              <path 
                d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="space-y-8 md:space-y-20">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Simplified Year Circle */}
                <div className="absolute left-6 md:left-1/2 top-3 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-8 h-8 md:w-12 md:h-12 bg-black border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Ultra-simplified Content Card */}
                <div className={`
                  pl-10 pr-2 md:pl-0 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}
                `}>
                  <div className="bg-white/[0.02] border border-white/8 rounded-xl p-3 md:p-6 relative">
                    
                    {/* Logo - smaller on mobile */}
                    {achievement.logo && (
                      <div className="absolute top-3 right-3 w-6 h-6 md:w-10 md:h-10 bg-white/5 rounded flex items-center justify-center">
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
                    
                    <div className="pr-8">
                      {/* Year badge - simplified */}
                      <div className="inline-flex items-center px-2 py-1 mb-2 text-xs bg-white/8 text-white/70 rounded">
                        {achievement.year}
                      </div>

                      {/* Title - smaller on mobile */}
                      <h3 className="text-sm md:text-lg font-medium text-white mb-2 md:mb-3">
                        {achievement.title}
                      </h3>
                      
                      {/* Description - smaller on mobile */}
                      <p className="text-white/60 text-xs md:text-base mb-3 md:mb-4 leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Highlight - simplified */}
                      <div className="border-l-2 border-white/20 pl-2 md:pl-3">
                        <p className="text-white/80 font-medium text-xs md:text-sm leading-relaxed">
                          {achievement.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4 md:h-16"></div>
      </div>
    </div>
  );
};

export default Timeline;
