// components/Timeline.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      year: "2019",
      title: "AUVSI SUAS 2019",
      description: "We Participated for the fourth time in the 17th AUVSI SUAS 2019 with our Hexa-Copter.",
      highlight: "4th rank Worldwide in Flight Readiness Review and 3rd among all Indian teams."
    },
    {
      year: "2018", 
      title: "AUVSI SUAS 2018",
      description: "We participated for the third time in the 16th AUVSI SUAS 2018 with our hexa-copter. Over 75 teams from all across the globe participated.",
      highlight: "We secured 5th rank Worldwide and 1st among all Indian teams."
    },
    {
      year: "2017",
      title: "AUVSI SUAS 2017", 
      description: "We participated for the second time in competition with our new drone SkyKing'17. 56 teams from all across the globe participated.",
      highlight: "We secured a Mission Rank 28 at the competition."
    },
    {
      year: "2016",
      title: "AUVSI SUAS 2016",
      description: "We participated in the AUVSI SUAS 2016 competition held in Maryland, USA with our drone Scylla 2K16.",
      highlight: "We secured a Mission Rank 5 at the competition and 3rd among all Indian Teams."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple animations
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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

      gsap.fromTo(".timeline-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-12 md:py-20 px-4 bg-black"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Just 3 subtle elements */}
        <div className="absolute w-96 h-96 bg-white/[0.015] rounded-full blur-3xl top-[20%] left-[10%]"></div>
        <div className="absolute w-64 h-64 bg-white/[0.01] rounded-full blur-2xl bottom-[30%] right-[15%]"></div>
        <div className="absolute w-2 h-2 bg-white/20 rounded-full top-[60%] left-[80%] animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our <span className="text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">Achievements</span>
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Enhanced Timeline Line */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/40 via-white/20 to-white/40 md:transform md:-translate-x-1/2"></div>

          <div className="space-y-16 md:space-y-24">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.year}
                className={`timeline-item relative ${
                  'md:flex md:items-center'
                } ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Enhanced Year Circle */}
                <div className="absolute left-6 md:left-1/2 top-3 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 transform -translate-x-1/2">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black border border-white/40 rounded-full flex items-center justify-center hover:border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300 group">
                    <span className="text-white font-medium text-xs md:text-sm group-hover:scale-110 transition-transform duration-300">
                      {achievement.year}
                    </span>
                  </div>
                </div>

                {/* Enhanced Content Card with Glow */}
                <div className={`
                  pl-14 pr-4 md:pl-0 md:pr-0 md:w-5/12 
                  ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}
                `}>
                  <div className="group relative bg-white/5 border border-white/15 rounded-xl p-4 md:p-6 hover:bg-white/8 hover:border-white/30 transition-all duration-300 overflow-hidden">
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="inline-block px-3 py-1 mb-3 md:mb-4 text-xs font-medium bg-white/15 text-white rounded-full border border-white/30 group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
                        {achievement.year}
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 leading-tight group-hover:text-white transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-white/75 leading-relaxed text-sm md:text-base mb-3 md:mb-4 group-hover:text-white/85 transition-colors duration-300">
                        {achievement.description}
                      </p>

                      {/* Gold Highlighted Achievement */}
                      <div className="border-l-2 border-white/40 pl-4 group-hover:border-white/60 transition-colors duration-300">
                        <p className="text-amber-300 font-medium text-sm md:text-base leading-relaxed group-hover:text-amber-200 transition-colors duration-300">
                          {achievement.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8 md:h-0"></div>
      </div>
    </div>
  );
};

export default Timeline;
