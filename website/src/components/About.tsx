import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

    const ctx = gsap.context(() => {
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
            ease: "power1.out"
          });
        }
      };
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
    </section>
  );
};

export default About;
