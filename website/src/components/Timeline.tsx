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
    // Enhanced device detection for better optimization
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isLowEnd = navigator.hardwareConcurrency <= 4 || (navigator as any).deviceMemory <= 4;
    const isSlowDevice = isLowEnd || (isMobile && window.devicePixelRatio > 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip all animations for reduced motion or very slow devices
    if (prefersReducedMotion || (isSlowDevice && isMobile)) {
      gsap.set([titleRef.current, ".timeline-item", ".timeline-line", planeRef.current], { 
        opacity: 1,
        clearProps: "all"
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Ultra-light GSAP config for slower systems
      gsap.set(gsap.config(), { 
        force3D: isSlowDevice ? false : true, // Disable 3D for slow devices
        nullTargetWarn: false,
        autoSleep: 60
      });

      // Performance-based animation settings
      const getAnimationSettings = () => {
        if (isMobile) {
          return {
            duration: isSlowDevice ? 0.3 : 0.5,
            stagger: 0.05,
            ease: "power1.out",
            scrubSpeed: 3
          };
        } else if (isTablet) {
          return {
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrubSpeed: 1.5
          };
        } else {
          return {
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrubSpeed: 0.8
          };
        }
      };

      const settings = getAnimationSettings();

      // Simplified title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: isMobile ? 10 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: settings.duration,
          ease: settings.ease,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            fastScrollEnd: true
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: settings.duration * 1.5,
          ease: settings.ease,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            fastScrollEnd: true
          }
        }
      );

      // Optimized plane animation for all devices
      if (planeRef.current && timelineRef.current && !isSlowDevice) {
        const plane = planeRef.current;
        const timelineContainer = timelineRef.current;
        
        gsap.set(plane, { 
          opacity: 0, 
          y: 0, 
          rotation: 0,
          willChange: isMobile ? "auto" : "transform"
        });

        // Fade in
        gsap.to(plane, {
          opacity: isMobile ? 0.7 : 1,
          duration: settings.duration * 0.8,
          delay: isMobile ? 0.2 : 0.5,
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        // Movement animation
        gsap.to(plane, {
          y: () => timelineContainer.offsetHeight - (isMobile ? 40 : 80),
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 60%",
            end: "bottom 60%",
            scrub: settings.scrubSpeed,
            onUpdate: isSlowDevice ? undefined : (self) => {
              // Throttled rotation updates
              if (Math.abs(self.getVelocity()) > (isMobile ? 50 : 30)) {
                gsap.to(plane, {
                  rotation: self.direction === 1 ? 0 : 180,
                  duration: isMobile ? 0.8 : 0.6,
                  ease: "power1.out",
                  overwrite: "auto"
                });
              }
            }
          }
        });
      } else if (isSlowDevice && planeRef.current) {
        // Static plane for very slow devices
        gsap.set(planeRef.current, { opacity: 0.5 });
      }

      // Timeline items with performance optimization
      gsap.fromTo(".timeline-item",
        { opacity: 0, y: isMobile ? 15 : 25 },
        {
          opacity: 1,
          y: 0,
          duration: settings.duration,
          stagger: settings.stagger,
          ease: settings.ease,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
            batch: true, // Batch processing for performance
            fastScrollEnd: true
          }
        }
      );

      // Year circles - only for non-mobile or high-performance devices
      if (!isMobile || !isSlowDevice) {
        gsap.fromTo(".year-circle",
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: settings.duration * 0.7,
            stagger: settings.stagger,
            ease: isSlowDevice ? "power1.out" : "back.out(1.7)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              batch: true
            }
          }
        );
      } else {
        // Static year circles for slow mobile devices
        gsap.set(".year-circle", { opacity: 1, scale: 1 });
      }

      // Desktop-only hover effects
      if (!isMobile && !isSlowDevice) {
        gsap.utils.toArray(".timeline-card").forEach((card) => {
          const cardEl = card as Element;
          
          let hoverTween: gsap.core.Tween;
          
          cardEl.addEventListener("mouseenter", () => {
            hoverTween = gsap.to(cardEl, {
              y: -3,
              scale: 1.01,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          });
          
          cardEl.addEventListener("mouseleave", () => {
            if (hoverTween) hoverTween.kill();
            gsap.to(cardEl, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            });
          });
        });
      }

      // Cleanup function
      return () => {
        if (planeRef.current) {
          gsap.set(planeRef.current, { willChange: "auto" });
        }
        gsap.killTweensOf(".timeline-card");
      };

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-6 sm:py-8 md:py-12 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
      id="Timeline"
    >
      {/* Minimal responsive background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-white/[0.015] sm:from-white/[0.02] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white/[0.01] sm:from-white/[0.015] to-transparent"></div>
      </div>

      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto relative z-10">
        {/* Fully responsive title */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-20">
          <h2 
            ref={titleRef}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Responsive timeline line */}
          <div className="timeline-line absolute left-4 sm:left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/15 via-white/10 to-white/15 md:transform md:-translate-x-1/2"></div>

          {/* Responsive plane */}
          <div 
            ref={planeRef}
            className="absolute left-4 sm:left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none"
          >
            <svg 
              className="text-white/80 transform rotate-180 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Responsive year circle */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 top-2 xs:top-2.5 sm:top-3 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black border border-white/15 hover:border-white/30 rounded-full flex items-center justify-center transition-colors duration-300">
                    <span className="text-white font-medium text-xs sm:text-xs md:text-sm">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Responsive content card */}
                <div className={`
                  pl-8 xs:pl-9 sm:pl-10 md:pl-0 pr-2 sm:pr-4 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-6 lg:pr-12' : 'md:pl-6 lg:pl-12'}
                `}>
                  <div className="timeline-card bg-white/[0.015] sm:bg-white/[0.02] hover:bg-white/[0.03] border border-white/6 hover:border-white/12 rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 xs:p-3 sm:p-4 md:p-5 lg:p-6 relative transition-all duration-300">
                    
                    {/* Responsive logo */}
                    {achievement.logo && (
                      <div className="absolute top-2 xs:top-2.5 sm:top-3 md:top-4 right-2 xs:right-2.5 sm:right-3 md:right-4 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/5 rounded flex items-center justify-center">
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
                    
                    <div className="pr-6 xs:pr-7 sm:pr-8 md:pr-10">
                      {/* Responsive year badge */}
                      <div className="inline-flex items-center px-1.5 xs:px-2 py-0.5 xs:py-1 mb-1.5 xs:mb-2 sm:mb-3 text-xs bg-white/8 text-white/70 rounded border border-white/10">
                        {achievement.year}
                      </div>

                      {/* Responsive title */}
                      <h3 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mb-1.5 xs:mb-2 sm:mb-3 leading-tight">
                        {achievement.title}
                      </h3>
                      
                      {/* Responsive description */}
                      <p className="text-white/60 text-xs sm:text-sm md:text-base mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 font-light leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Responsive highlight */}
                      <div className="border-l-2 border-white/20 pl-2 sm:pl-3">
                        <p className="text-white/80 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
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

        <div className="h-3 xs:h-4 sm:h-6 md:h-8 lg:h-12 xl:h-16"></div>
      </div>
    </section>
  );
};

export default Timeline;
