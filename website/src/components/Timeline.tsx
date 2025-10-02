// components/Timeline.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AerospaceBackground from './AerospaceBackground';

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
      // Optimized animations for slower PCs
      gsap.set(gsap.config(), { force3D: false });

      // Title fade in
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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line grows
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced plane animation
      if (planeRef.current && timelineRef.current) {
        const plane = planeRef.current;
        const timelineContainer = timelineRef.current;
        
        const rotatePlane = gsap.quickTo(plane, "rotation", {
          duration: 0.6,
          ease: "power2.out"
        });
        
        gsap.set(plane, {
          opacity: 0,
          y: 0,
          rotation: 0
        });

        gsap.to(plane, {
          opacity: 1,
          duration: 0.6,
          delay: 1,
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(plane, {
          y: () => timelineContainer.offsetHeight - 80,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 0.5,
            onUpdate: (self) => {
              const targetRotation = self.direction === 1 ? 0 : 180;
              rotatePlane(targetRotation);
            }
          }
        });
      }

      // Timeline items fade in with stagger
      gsap.fromTo(".timeline-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual text elements animations
      gsap.utils.toArray(".fade-in-text").forEach((element, index) => {
        return gsap.fromTo(
          element as HTMLElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element as HTMLElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        );
      });

      // Year badges fade in
      gsap.utils.toArray(".year-badge").forEach((badge) => {
        return gsap.fromTo(badge as Element,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badge as Element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Card animations
      gsap.utils.toArray(".card-title").forEach((title) => {
        return gsap.fromTo(title as HTMLElement,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title as HTMLElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray(".card-description").forEach((desc) => {
        return gsap.fromTo(desc as HTMLElement,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: desc as HTMLElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: 0.2
          }
        );
      });

      gsap.utils.toArray(".card-highlight").forEach((highlight) => {
        return gsap.fromTo(highlight as HTMLElement,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: highlight as HTMLElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: 0.3
          }
        );
      });

      gsap.utils.toArray(".year-circle").forEach((circle) => {
        return gsap.fromTo(circle as Element,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: circle as Element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Card hover effects
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        const cardEl = card as Element;
        
        cardEl.addEventListener("mouseenter", () => {
          gsap.to(cardEl, {
            opacity: 0.8,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cardEl.querySelector(".card-glow"), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        cardEl.addEventListener("mouseleave", () => {
          gsap.to(cardEl, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(cardEl.querySelector(".card-glow"), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <AerospaceBackground className="min-h-screen py-12 md:py-20 px-4" id="Timeline">
      <div ref={sectionRef} className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-tight"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Enhanced Timeline Line */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/30 via-white/20 to-white/30 md:transform md:-translate-x-1/2"></div>

          {/* Enhanced Bigger Upside Down Plane */}
          <div 
            ref={planeRef}
            className="absolute left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="relative">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/95 drop-shadow-lg transform rotate-180"
              >
                <path 
                  d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                  fill="currentColor"
                />
              </svg>
              
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-white/15 rounded-full blur-lg opacity-50"></div>
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-white/25 rounded-full blur-md opacity-70"></div>
            </div>
          </div>

          <div className="space-y-16 md:space-y-20">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Interactive Year Circle */}
                <div className="absolute left-6 md:left-1/2 top-4 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-12 h-12 md:w-14 md:h-14 bg-black border border-white/30 rounded-full flex items-center justify-center hover:border-white/60 transition-all duration-500 cursor-pointer group">
                    <span className="text-white font-medium text-xs md:text-sm group-hover:scale-110 transition-transform duration-300">
                      {achievement.year}
                    </span>
                    <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Simple Clean Content Card */}
                <div className={`
                  pl-14 pr-4 md:pl-0 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}
                `}>
                  <div className="timeline-card group relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 transition-all duration-300 cursor-pointer overflow-hidden hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] z-20">

                    {/* Simple glow effect */}
                    <div className="card-glow absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl opacity-0 transition-opacity duration-300 blur-sm -z-10"></div>
                    
                    {/* Logo Placeholder - Top Right */}
                    <div className="absolute top-5 right-5 md:top-6 md:right-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden hover:bg-white/10 transition-all duration-300">

                        {achievement.logo ? (
                          <img 
                            src={achievement.logo}
                            alt={`${achievement.title} logo`}
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `
                                  <div class="text-white/40 text-xs font-medium text-center">
                                    ${achievement.year}
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        )}

                      </div>
                    </div>
                    
                    {/* Content with individual fade-in classes */}
                    <div className="relative z-10 pr-16 md:pr-20">
                      {/* Year badge */}
                      <div className="year-badge inline-flex items-center px-3 py-1.5 mb-4 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                        {achievement.year}
                      </div>

                      {/* Title */}
                      <h3 className="card-title text-lg md:text-xl font-medium text-white mb-4 leading-tight group-hover:text-white transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="card-description text-white/70 leading-relaxed text-sm md:text-base mb-5 font-light group-hover:text-white/85 transition-colors duration-300">
                        {achievement.description}
                      </p>

                      {/* Highlight */}
                      <div className="card-highlight border-l-2 border-white/30 pl-4 group-hover:border-white/50 transition-all duration-300">
                        <p className="text-white font-medium text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                          {achievement.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Simple bottom accent */}
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-12 md:h-16"></div>
      </div>
    </AerospaceBackground>
  );
};

export default Timeline;
