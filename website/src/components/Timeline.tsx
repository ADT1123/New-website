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
      // Temporary: Using a working placeholder or remove logo field
      logo: "/img/NMIMS_LOGO1.png" 
    },
    {
      year: "2018", 
      title: "AUVSI SUAS 2018",
      description: "We participated for the third time in the 16th AUVSI SUAS 2018 with our hexa-copter. Over 75 teams from all across the globe participated.",
      highlight: "We secured 5th rank Worldwide and 1st among all Indian teams.",
      // logo: "/img/logos/auvsi-2018.png"
    },
    {
      year: "2017",
      title: "AUVSI SUAS 2017", 
      description: "We participated for the second time in competition with our new drone SkyKing'17. 56 teams from all across the globe participated.",
      highlight: "We secured a Mission Rank 28 at the competition.",
      // logo: "/img/logos/auvsi-2017.png"
    },
    {
      year: "2016",
      title: "AUVSI SUAS 2016",
      description: "We participated in the AUVSI SUAS 2016 competition held in Maryland, USA with our drone Scylla 2K16.",
      highlight: "We secured a Mission Rank 5 at the competition and 3rd among all Indian Teams.",
      // logo: "/img/logos/auvsi-2016.png"
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

      // Enhanced plane animation - no floating, smoother scroll
// Enhanced plane animation - no floating, smoother scroll
// Enhanced plane animation - no floating, smoother scroll
// Enhanced plane animation - no floating, smoother scroll
if (planeRef.current && timelineRef.current) {
  const plane = planeRef.current;
  const timelineContainer = timelineRef.current;
  
  // Create a quickTo function for super smooth rotation performance
  const rotatePlane = gsap.quickTo(plane, "rotation", {
    duration: 0.6,
    ease: "power2.out"
  });
  
  // Initial plane setup - starts upside down (facing down) due to rotate-180 in SVG
  gsap.set(plane, {
    opacity: 0,
    y: 0,
    rotation: 0 // Keep initial upside down orientation (facing down)
  });

  // Plane fade in first
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

  // Super smooth plane follows scroll down the timeline
  gsap.to(plane, {
    y: () => timelineContainer.offsetHeight - 80, // Move to bottom of timeline
    ease: "none",
    scrollTrigger: {
      trigger: timelineContainer,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 0.5, // Much smoother scroll following
      onUpdate: (self) => {
        // Super smooth rotation using quickTo for performance
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

      // Individual text elements fade in on scroll
      gsap.utils.toArray(".fade-in-text").forEach((element, index) => {
        return gsap.fromTo(
          element as HTMLElement,
          {
            opacity: 0,
            y: 20
          },
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
          {
            opacity: 0,
            scale: 0.8
          },
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

      // Card titles fade in
      gsap.utils.toArray(".card-title").forEach((title) => {
        return gsap.fromTo(title as HTMLElement,
          {
            opacity: 0,
            x: -20
          },
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

      // Card descriptions fade in
      gsap.utils.toArray(".card-description").forEach((desc) => {
        return gsap.fromTo(desc as HTMLElement,
          {
            opacity: 0,
            y: 15
          },
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

      // Card highlights fade in
      gsap.utils.toArray(".card-highlight").forEach((highlight) => {
        return gsap.fromTo(highlight as HTMLElement,
          {
            opacity: 0,
            x: -15
          },
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

      // Year circles fade in
      gsap.utils.toArray(".year-circle").forEach((circle) => {
        return gsap.fromTo(circle as Element,
          {
            opacity: 0,
            scale: 0
          },
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

      // Simple fade hover for cards
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

      // Minimal blinking stars animation
      gsap.to(".blink-star", {
        opacity: "random(0.2, 0.8)",
        duration: "random(2, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
      });

      // Subtle floating particles
      gsap.to(".float-particle", {
        y: "random(-8, 8)",
        x: "random(-6, 6)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
      });

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
      {/* Clean Background with More Stars & Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Gradient depth layers */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/[0.035] via-white/[0.018] to-transparent"></div>
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white/[0.025] via-white/[0.012] to-transparent"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white/[0.03] via-white/[0.015] to-transparent"></div>

        {/* Corner depth gradients */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent blur-3xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/[] via-white/[0.018] to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/[0.055] via-white/[0.022] to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/[0.045] via-white/[0.02] to-transparent blur-3xl"></div>

        {/* Center depth layers */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02] blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-bl from-white/[0.045] via-transparent to-white/[0.025] blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-gradient-to-tr from-white/[0.035] via-transparent to-white/[0.018] blur-2xl"></div>

        {/* More Blinking Stars - Well distributed */}
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full top-[8%] left-[5%] opacity-40"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-blue-200 rounded-full top-[12%] right-[8%] opacity-45"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full top-[18%] left-[92%] opacity-38"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-purple-200 rounded-full top-[24%] right-[15%] opacity-42"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full top-[30%] left-[12%] opacity-45"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-cyan-200 rounded-full top-[36%] right-[88%] opacity-40"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full top-[42%] left-[3%] opacity-48"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-white rounded-full top-[48%] right-[6%] opacity-35"></div>
        <div className="blink-star absolute w-1 h-1 bg-blue-200 rounded-full top-[54%] left-[95%] opacity-42"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-white rounded-full top-[60%] right-[12%] opacity-40"></div>
        <div className="blink-star absolute w-1 h-1 bg-purple-200 rounded-full top-[66%] left-[8%] opacity-38"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-white rounded-full top-[72%] right-[85%] opacity-45"></div>
        <div className="blink-star absolute w-1 h-1 bg-cyan-200 rounded-full top-[78%] left-[90%] opacity-42"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-white rounded-full top-[84%] right-[4%] opacity-40"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full bottom-[20%] left-[7%] opacity-48"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-blue-200 rounded-full bottom-[26%] right-[9%] opacity-35"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full bottom-[32%] left-[93%] opacity-42"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-purple-200 rounded-full bottom-[38%] right-[14%] opacity-40"></div>
        <div className="blink-star absolute w-1 h-1 bg-white rounded-full bottom-[44%] left-[4%] opacity-35"></div>
        <div className="blink-star absolute w-0.5 h-0.5 bg-cyan-200 rounded-full bottom-[15%] right-[11%] opacity-42"></div>

        {/* Way More Floating Particles - Random distribution */}
        <div className="float-particle absolute w-2 h-2 bg-white/20 rounded-full top-[10%] left-[18%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-blue-300/15 rounded-full top-[14%] right-[25%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-purple-300/18 rounded-full top-[22%] left-[75%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-white/16 rounded-full top-[28%] right-[42%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-cyan-300/20 rounded-full top-[34%] left-[28%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-white/22 rounded-full top-[40%] right-[68%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-blue-300/17 rounded-full top-[46%] left-[82%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-purple-300/19 rounded-full top-[52%] right-[15%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-white/18 rounded-full top-[58%] left-[35%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-cyan-300/16 rounded-full top-[64%] right-[55%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-white/21 rounded-full top-[70%] left-[65%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-blue-300/18 rounded-full top-[76%] right-[32%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-purple-300/17 rounded-full top-[82%] left-[22%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-white/19 rounded-full top-[88%] right-[78%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-cyan-300/20 rounded-full bottom-[22%] left-[45%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-white/17 rounded-full bottom-[28%] right-[28%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-blue-300/19 rounded-full bottom-[34%] left-[72%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-purple-300/16 rounded-full bottom-[40%] right-[48%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-white/20 rounded-full bottom-[46%] left-[15%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-cyan-300/18 rounded-full bottom-[52%] right-[65%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-white/16 rounded-full bottom-[58%] left-[88%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-blue-300/21 rounded-full bottom-[64%] right-[18%] blur-sm"></div>
        <div className="float-particle absolute w-2 h-2 bg-purple-300/18 rounded-full bottom-[70%] left-[38%] blur-sm"></div>
        <div className="float-particle absolute w-1.5 h-1.5 bg-white/17 rounded-full bottom-[76%] right-[85%] blur-sm"></div>
        
        {/* Additional smaller particles for density */}
        <div className="float-particle absolute w-1 h-1 bg-white/25 rounded-full top-[16%] left-[52%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-blue-200/20 rounded-full top-[26%] right-[58%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-white/23 rounded-full top-[38%] left-[15%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-purple-200/22 rounded-full top-[44%] right-[35%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-cyan-200/24 rounded-full top-[56%] left-[68%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-white/21 rounded-full top-[68%] right-[22%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-blue-200/19 rounded-full top-[74%] left-[42%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-white/26 rounded-full top-[86%] right-[62%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-purple-200/20 rounded-full bottom-[24%] left-[58%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-white/22 rounded-full bottom-[36%] right-[38%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-cyan-200/23 rounded-full bottom-[48%] left-[25%] blur-sm"></div>
        <div className="float-particle absolute w-1 h-1 bg-white/20 rounded-full bottom-[62%] right-[75%] blur-sm"></div>

        {/* Subtle middle section gradients */}
        <div className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-white/[0.02] via-white/[0.035] to-white/[0.02] blur-xl"></div>
        <div className="absolute top-0 left-1/2 w-32 h-full bg-gradient-to-b from-white/[0.018] via-white/[0.032] to-white/[0.018] blur-xl"></div>

        {/* Additional atmospheric layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.008] via-transparent to-white/[0.005] mix-blend-screen"></div>

      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
              {/* Bigger Upside Down Plane SVG Icon */}
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
              
              {/* Enhanced glowing trail behind plane */}
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

                        {/* Logo icon placeholder */}
                    {achievement.logo ? (
                      <img 
                        src={achievement.logo}
                        alt={`${achievement.title} logo`}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          // If image fails, show fallback
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
                      // Fallback icon if no logo
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
    </div>
  );
};

export default Timeline;
