import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      year: "2025",
      title: "Boeing National Aeromodelling Competition, IIT Bombay (2024–25)",
      description: "Achieved 2nd place in the Zonal Round, showcasing technica innovation, teamwork, and precision in aeromodelling. Advanced to the National Finale, where the team was among the Top 12 in India to represent at IIT Bombay.",
      highlight: "2nd Place in Zonal Round, Top 12 National Finalists",
      logo: "/img/Techfest.jpeg"
    },
    {
      year: "2023",
      title: "Drone Log Competition, IIT Bombay Techfest",
      description: "Secured 2nd position in this national-level event focused on warehouse management using drones. The challenge tested our ability to design and operate drones for tasks such as payload handling, precision navigation, and efficient logistics execution",
      highlight: "2nd Place Nationally among 30+ Teams",
      logo: "/img/Techfest.jpeg"
    },
    {
      year: "2018",
      title: "AUVSI SUAS 2018",
      description: "We participated for the third time in the 16th AUVSI SUAS 2018 with our hexa-copter. Over 75 teams from all across the globe participated.",
      highlight: "We secured 5th rank Worldwide and 1st among all Indian teams.",
      logo: "/img/SUAS.jpeg"
    },
    {
      year: "2016",
      title: "AUVSI SUAS 2016",
      description: "We participated in the AUVSI SUAS 2016 competition held in Maryland, USA with our drone Scylla 2K16.",
      highlight: "We secured a Mission Rank 5 at the competition and 3rd among all Indian Teams.",
      logo: "/img/SUAS.jpeg"
    },
  ];

  // Inject the navy background CSS (scoped for this component)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Deep navy background with subtle animated sheen */
      .navy-bg {
        position: relative;
        overflow: hidden;
        background: radial-gradient(1200px circle at 20% 10%, #000000 0%, #070d18 35%, #000000 60%, #0d1423 100%);
      }
      .navy-bg::before {
        content: "";
        position: absolute;
        inset: -20%;
        background:
          radial-gradient(600px 600px at 70% 20%, rgba(10, 11, 13, 0.1), transparent 60%),
          radial-gradient(520px 520px at 25% 75%, rgba(8, 11, 16, 0.1), transparent 60%);
        filter: blur(30px);
        animation: drift 14s ease-in-out infinite alternate;
        pointer-events: none;
      }
      @keyframes drift {
        0%   { transform: translate3d(-1%, -2%, 0); opacity: 0.75; }
        100% { transform: translate3d(1%, 2%, 0); opacity: 0.95; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      description: "We design and build autonomous systems that solve real-world problems. From search and rescue operations to environmental monitoring, our drones are built to make a difference where it matters most."
    },
    {
      id: "approach", 
      title: "Our Approach",
      description: "We believe in learning by doing. Every project starts with understanding the problem, designing innovative solutions, and building functional prototypes that can actually fly and perform in the field."
    },
    {
      id: "impact",
      title: "Our Impact",
      description: "Through national competitions, research publications, and industry collaborations, we're building the next generation of aerospace engineers while contributing to cutting-edge drone technology."
    }
  ];

  const stats = [
    { number: 6, label: "Competitions Won", suffix: "+" },
    { number: 10, label: "Vehicles Made", suffix: "+" },
    { number: 500, label: "Flight Hours", suffix: "+" }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationMultiplier = prefersReducedMotion ? 0.6 : 1;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ".timeline-item", ".timeline-line", planeRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(gsap.config(), { force3D: true, nullTargetWarn: false });
      gsap.fromTo(".section-title",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2 * animationMultiplier,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".about-text",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1 * animationMultiplier,
          ease: "power1.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".section-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9 * animationMultiplier,
          stagger: 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".sections-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".stats-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1 * animationMultiplier,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".stat-card",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8 * animationMultiplier,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      stats.forEach((stat, index) => {
        const counter = { value: 0 };
        const element = document.querySelector(`#counter-${index}`);
        if (element) {
          gsap.to(counter, {
            value: stat.number,
            duration: 2.5 * animationMultiplier,
            ease: "power2.out",
            delay: 0.5 + (index * 0.2),
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            },
            onUpdate: () => {
              element.textContent = Math.round(counter.value).toString();
            }
          });
        }
      });

      gsap.to(".bg-float", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.2
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!prefersReducedMotion) {
          gsap.to(".bg-particle", {
            x: (index) => (e.clientX - window.innerWidth / 2) * (index + 1) * 0.005,
            
            y: (index) => (e.clientY - window.innerHeight / 2) * (index + 1) * 0.005,
            duration: 2,
            ease: "power1.out",
            
          });
        }
      };
      const getSettings = () => {
        if (isMobile) return { duration: 0.6, stagger: 0.08, ease: "power2.out", scrubSpeed: 1.2, planeOpacity: 0.95, glowIntensity: 0.15 };
        if (isTablet) return { duration: 0.7, stagger: 0.12, ease: "power2.out", scrubSpeed: 1, planeOpacity: 1, glowIntensity: 0.2 };
        return { duration: 0.8, stagger: 0.15, ease: "power2.out", scrubSpeed: 0.8, planeOpacity: 1, glowIntensity: 0.25 };
      }; // device adapt [memory:3]
      const settings = getSettings();

      gsap.fromTo(titleRef.current, { opacity: 0, y: isMobile ? 15 : 25 }, {
        opacity: 1, y: 0, duration: settings.duration, ease: settings.ease,
        scrollTrigger: { trigger: titleRef.current, start: "top 90%", toggleActions: "play none none none" }
      }); // title reveal [memory:3]

      gsap.fromTo(".timeline-line", { scaleY: 0, transformOrigin: "top" }, {
        scaleY: 1, duration: settings.duration * 1.5, ease: settings.ease,
        scrollTrigger: { trigger: timelineRef.current, start: "top 85%", toggleActions: "play none none none" }
      }); // grow line [memory:3]

      if (planeRef.current && timelineRef.current) {
        const plane = planeRef.current;
        const timelineContainer = timelineRef.current;

        gsap.set(plane, { opacity: 0, y: 0, rotation: 0, scale: 1, willChange: "transform", transformOrigin: "center" }); // setup [memory:3]

        gsap.fromTo(plane,
          { opacity: 0, scale: 0.3, y: -15, filter: "drop-shadow(0 0 0px rgba(255,255,255,0))" },
          {
            opacity: settings.planeOpacity, scale: 1.1, y: 0,
            filter: `drop-shadow(0 0 15px rgba(255,255,255,${settings.glowIntensity}))`,
            duration: settings.duration * 1.2, delay: isMobile ? 0.4 : 0.6, ease: "back.out(1.7)",
            scrollTrigger: { trigger: timelineContainer, start: "top 80%", toggleActions: "play none none none" }
          }
        ); // plane enter [memory:3]

        gsap.to(plane, {
          y: () => timelineContainer.offsetHeight - (isMobile ? 60 : 90), ease: "none",
          scrollTrigger: {
            trigger: timelineContainer, start: "top 60%", end: "bottom 60%", scrub: settings.scrubSpeed,
            onUpdate: (self) => {
              const v = Math.abs(self.getVelocity());
              if (v > (isMobile ? 25 : 30)) {
                const targetRotation = self.direction === 1 ? 0 : 180;
                const scaleEffect = Math.min(1 + v * 0.003, isMobile ? 1.4 : 1.3);
                const glow = Math.min(v * 0.01, 30);
                gsap.to(plane, {
                  rotation: targetRotation,
                  scale: scaleEffect,
                  filter: `drop-shadow(0 0 ${glow}px rgba(255,255,255,${settings.glowIntensity * 2}))`,
                  duration: isMobile ? 0.5 : 0.6, ease: "power2.out",
                  onComplete: () => gsap.to(plane, {
                    scale: 1.1,
                    filter: `drop-shadow(0 0 15px rgba(255,255,255,${settings.glowIntensity}))`,
                    duration: 0.4, ease: "power2.out"
                  })
                });
              }
            }
          }
        }); // plane scroll [memory:3]

        gsap.to(plane, {
          filter: `drop-shadow(0 0 20px rgba(255,255,255,${settings.glowIntensity * 1.5}))`,
          duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
        }); // idle pulse [memory:3]
      }

      gsap.fromTo(".timeline-item", { opacity: 0, y: isMobile ? 20 : 30, x: isMobile ? 10 : 0 }, {
        opacity: 1, y: 0, x: 0, duration: settings.duration, stagger: settings.stagger, ease: settings.ease,
        scrollTrigger: { trigger: timelineRef.current, start: "top 75%", toggleActions: "play none none none" }
      }); // entries [memory:3]

      gsap.fromTo(".year-circle", { opacity: 0, scale: 0.6, rotationY: -90 }, {
        opacity: 1, scale: 1, rotationY: 0, duration: settings.duration, stagger: settings.stagger, ease: "back.out(1.7)",
        scrollTrigger: { trigger: timelineRef.current, start: "top 80%", toggleActions: "play none none none" }
      });
      sectionRef.current?.addEventListener('mousemove', handleMouseMove);

      return () => {
        sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden navy-bg"
      style={{
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
      id="about"
    >
      {/* Minimal Interactive Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle floating elements */}
        <div className="bg-float absolute w-1 h-1 bg-white/12 rounded-full top-[20%] left-[15%]"></div>
        <div className="bg-float absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[30%] right-[20%]"></div>
        <div className="bg-float absolute w-1 h-1 bg-white/15 rounded-full top-[60%] left-[80%]"></div>
        <div className="bg-float absolute w-2 h-2 bg-white/8 rounded-full top-[70%] left-[25%]"></div>
        <div className="bg-float absolute w-1 h-1 bg-white/12 rounded-full bottom-[25%] right-[30%]"></div>

        {/* Interactive particles */}
        <div className="bg-particle absolute w-1 h-1 bg-white/15 rounded-full top-[35%] left-[10%]"></div>
        <div className="bg-particle absolute w-1.5 h-1.5 bg-white/12 rounded-full top-[45%] right-[15%]"></div>
        <div className="bg-particle absolute w-1 h-1 bg-white/18 rounded-full top-[75%] left-[70%]"></div>
        <div className="bg-particle absolute w-2 h-2 bg-white/10 rounded-full bottom-[40%] right-[10%]"></div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-[25%] left-[8%] w-32 h-32 bg-white/[0.015] rounded-full blur-2xl"></div>
        <div className="absolute bottom-[30%] right-[12%] w-40 h-40 bg-white/[0.01] rounded-full blur-3xl"></div>
        <div className="absolute top-[55%] left-[45%] w-36 h-36 bg-white/[0.015] rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Simple Header */}
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
            About Us
          </h2>

          {/* Introduction */}
          <div className="about-text max-w-4xl mx-auto">
            <p className="text-lg text-white/75 leading-relaxed font-light">
              We're a student-driven team passionate about pushing the boundaries of unmanned systems. 
              Our focus is on creating practical, innovative solutions through hands-on engineering and collaborative research.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="sections-grid grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {sections.map((section, index) => (
            <div key={section.id} className="section-card group relative">
              <div className="bg-white/[0.04] border border-white/12 rounded-2xl p-8 h-full hover:bg-white/[0.06] hover:border-white/20 transition-all duration-700 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-xl font-medium text-white mb-6 tracking-wide">
                    {section.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">
                    {section.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white/25 group-hover:w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* ✨ ANIMATED STATS SECTION ✨ */}
        <div ref={statsRef} className="stats-container relative py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] rounded-3xl border border-white/10"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card text-center">
                <div className="mb-3">
                  <span id={`counter-${index}`} className="text-4xl md:text-5xl font-bold text-white">0</span>
                  <span className="text-4xl md:text-5xl font-bold text-white/80">{stat.suffix}</span>
                </div>
                <div className="text-white/70 text-base md:text-lg font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    <div className="h-10 sm:h-12 md:h-16 lg:h-20" aria-hidden="true"></div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 tl-soft-top"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40 tl-soft-bottom"></div>
      </div>

      <div className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-20">
          <h2
            ref={titleRef}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2"
          >
            Our <span className="font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-4 sm:left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/40 via-white/25 to-white/40 md:transform md:-translate-x-1/2"></div>

          <div ref={planeRef} className="absolute left-4 sm:left-6 md:left-1/2 top-0 transform -translate-x-1/2 z-30 pointer-events-none">
            <div className="relative">
              <svg className="text-white drop-shadow-2xl transform rotate-180 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.year}
                className={`timeline-item relative ${'md:flex md:items-center'} ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-4 sm:left-6 md:left-1/2 top-2 xs:top-2.5 sm:top-3 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 transform -translate-x-1/2">
                  <div className="year-circle w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-13 lg:h-13 bg-gradient-to-br from-black/90 to-gray-900/90 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg">
                    <span className="text-white font-semibold text-xs sm:text-sm md:text-base">{achievement.year}</span>
                  </div>
                </div>

                <div className={`
                  pl-8 xs:pl-9 sm:pl-10 md:pl-0 pr-2 sm:pr-4 md:pr-0 md:w-5/12
                  ${index % 2 === 0 ? 'md:pr-6 lg:pr-12' : 'md:pl-6 lg:pl-12'}
                `}>
                  <div className="timeline-card relative bg-gradient-to-br from-white/[0.03] via-white/[0.02] to-white/[0.015] border border-white/10 rounded-xl md:rounded-2xl lg:rounded-3xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 transition-all duration-300 overflow-hidden">
                    {achievement.logo && (
                      <div className="absolute top-3 xs:top-3.5 sm:top-4 md:top-5 right-3 xs:right-3.5 sm:right-4 md:right-5 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/15">
                        <img
                          src={achievement.logo}
                          alt={`${achievement.title} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}

                    <div className="relative pr-8 xs:pr-9 sm:pr-10 md:pr-12 lg:pr-14">
                      <div className="inline-flex items-center px-2.5 xs:px-3 py-1.5 mb-2 sm:mb-3 text-xs bg-white/15 text-white/90 rounded-full border border-white/20 font-medium backdrop-blur-sm">
                        {achievement.year}
                      </div>

                      <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 leading-tight">
                        {achievement.title}
                      </h3>

                      <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg mb-2.5 xs:mb-3 sm:mb-4 md:mb-5 font-light leading-relaxed">
                        {achievement.description}
                      </p>

                      <div className="border-l-2 border-white/25 pl-3 sm:pl-4 bg-white/[0.02] rounded-r-lg py-2">
                        <p className="text-white/90 font-semibold text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                          {achievement.highlight}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/30 to-white/20 hover:w-full transition-all duration-500 ease-out rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="h-4 xs:h-6 sm:h-8 md:h-12 lg:h-16 xl:h-20"></div>
      </div>
    </section>

    
  );

};

export default About;
