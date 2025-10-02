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
    const ctx = gsap.context(() => {
      // GSAP matchMedia for responsive animations
      const mm = gsap.matchMedia();

      // Mobile optimizations (up to 767px)
      mm.add("(max-width: 767px)", () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          gsap.set([titleRef.current, ".timeline-item", ".timeline-line", planeRef.current], { opacity: 1 });
          return;
        }

        // Mobile GSAP config - performance first
        gsap.set(gsap.config(), { 
          force3D: false, // Better for mobile
          nullTargetWarn: false
        });

        // Mobile title animation
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );

        // Mobile timeline line
        gsap.fromTo(".timeline-line",
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // MOBILE PLANE ANIMATION - Ultra optimized
        if (planeRef.current && timelineRef.current) {
          const plane = planeRef.current;
          const timelineContainer = timelineRef.current;
          
          gsap.set(plane, { 
            opacity: 0, 
            y: 0, 
            rotation: 0,
            scale: 1,
            transformOrigin: "center center"
          });

          // Simple fade in
          gsap.to(plane, {
            opacity: 0.8,
            scale: 1.1,
            duration: 0.5,
            delay: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          });

          // Smooth mobile movement with better performance
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1.5,
              onUpdate: (self) => {
                // Optimized rotation for mobile
                const progress = self.progress;
                const targetRotation = self.direction === 1 ? 0 : 180;
                
                // Only update rotation if significant change
                if (Math.abs(self.getVelocity()) > 20) {
                  gsap.set(plane, { 
                    rotation: targetRotation,
                    scale: 1 + (progress * 0.2) // Subtle scale effect
                  });
                }
              }
            }
          });

          tl.to(plane, {
            y: () => timelineContainer.offsetHeight - 50,
            ease: "none"
          });
        }

        // Mobile timeline items - simple fade
        gsap.fromTo(".timeline-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );

        // Mobile year circles
        gsap.fromTo(".year-circle",
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Tablet optimizations (768px - 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        gsap.set(gsap.config(), { force3D: true, nullTargetWarn: false });

        // Tablet animations - balanced performance
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 25 },
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

        // Tablet plane animation
        if (planeRef.current && timelineRef.current) {
          const plane = planeRef.current;
          const timelineContainer = timelineRef.current;
          
          gsap.set(plane, { opacity: 0, y: 0, rotation: 0, willChange: "transform" });

          gsap.to(plane, {
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          });

          gsap.to(plane, {
            y: () => timelineContainer.offsetHeight - 70,
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1,
              onUpdate: (self) => {
                gsap.to(plane, {
                  rotation: self.direction === 1 ? 0 : 180,
                  duration: 0.5,
                  ease: "power1.out"
                });
              }
            }
          });
        }

        gsap.fromTo(".timeline-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );

        gsap.fromTo(".year-circle",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Desktop optimizations (1024px+)
      mm.add("(min-width: 1024px)", () => {
        gsap.set(gsap.config(), { force3D: true, nullTargetWarn: false });

        // Full desktop animations
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );

        // Desktop plane animation - full features
        if (planeRef.current && timelineRef.current) {
          const plane = planeRef.current;
          const timelineContainer = timelineRef.current;
          
          gsap.set(plane, { 
            opacity: 0, 
            y: 0, 
            rotation: 0, 
            scale: 1,
            willChange: "transform"
          });

          gsap.to(plane, {
            opacity: 1,
            duration: 0.8,
            delay: 0.8,
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
              scrub: 0.8,
              onUpdate: (self) => {
                const targetRotation = self.direction === 1 ? 0 : 180;
                gsap.to(plane, {
                  rotation: targetRotation,
                  scale: 1 + (Math.abs(self.getVelocity()) * 0.01),
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
            }
          });
        }

        gsap.fromTo(".timeline-item",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              toggleActions: "play none none none"
            }
          }
        );

        gsap.fromTo(".year-circle",
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Desktop hover effects
        gsap.utils.toArray(".timeline-card").forEach((card) => {
          const cardEl = card as Element;
          
          cardEl.addEventListener("mouseenter", () => {
            gsap.to(cardEl, {
              y: -5,
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(255,255,255,0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          cardEl.addEventListener("mouseleave", () => {
            gsap.to(cardEl, {
              y: 0,
              scale: 1,
              boxShadow: "0 0 0px rgba(255,255,255,0)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      });

      // Cleanup
      return () => {
        mm.revert();
        if (planeRef.current) {
          gsap.set(planeRef.current, { willChange: "auto" });
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
      id="Timeline"
    >
      {/* Responsive background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-20 sm:h-32 md:h-40 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 sm:h-32 md:h-40 bg-gradient-to-t from-white/[0.015] to-transparent"></div>
        
        {/* Responsive corner accents */}
        <div className="hidden md:block absolute top-0 left-0 w-32 lg:w-64 h-32 lg:h-64 bg-gradient-to-br from-white/[0.02] to-transparent blur-2xl lg:blur-3xl"></div>
        <div className="hidden md:block absolute bottom-0 right-0 w-32 lg:w-64 h-32 lg:h-64 bg-gradient-to-tl from-white/[0.02] to-transparent blur-2xl lg:blur-3xl"></div>
      </div>

      <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto relative z-10">
        {/* Responsive Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Responsive Timeline Line */}
          <div className="timeline-line absolute left-4 sm:left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/20 via-white/15 to-white/20 md:transform md:-translate-x-1/2"></div>

          {/* Responsive Plane */}
          <div 
            ref={planeRef}
            className="absolute left-4 sm:left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="relative">
              <svg 
                className="text-white/85 transform rotate-180 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                  fill="currentColor"
                />
              </svg>
              
              {/* Trail - desktop only */}
              <div className="hidden lg:block absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 bg-white/8 rounded-full blur-sm opacity-50"></div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Responsive Year Circle */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 top-2 sm:top-3 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="text-white font-medium text-xs sm:text-xs md:text-sm">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Responsive Content Card */}
                <div className={`
                  pl-8 sm:pl-10 md:pl-0 pr-2 sm:pr-4 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}
                `}>
                  <div className="timeline-card bg-white/[0.02] hover:bg-white/[0.04] border border-white/8 hover:border-white/15 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 relative transition-all duration-300 overflow-hidden">
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl"></div>
                    
                    {/* Responsive Logo */}
                    {achievement.logo && (
                      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/5 rounded flex items-center justify-center">
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
                    
                    <div className="relative pr-6 sm:pr-8 md:pr-10">
                      {/* Year badge */}
                      <div className="inline-flex items-center px-2 py-1 mb-2 sm:mb-3 text-xs bg-white/8 text-white/70 rounded border border-white/15">
                        {achievement.year}
                      </div>

                      {/* Responsive Title */}
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white mb-2 sm:mb-3 leading-tight">
                        {achievement.title}
                      </h3>
                      
                      {/* Responsive Description */}
                      <p className="text-white/60 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 font-light leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Responsive Highlight */}
                      <div className="border-l-2 border-white/20 pl-2 sm:pl-3">
                        <p className="text-white/80 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
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

        <div className="h-4 sm:h-6 md:h-8 lg:h-12 xl:h-16"></div>
      </div>
    </section>
  );
};

export default Timeline;
