import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SpotlightCard.css';

gsap.registerPlugin(ScrollTrigger);

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  isMainSupporter = false 
}) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    if (isMainSupporter) {
      divRef.current.style.setProperty('--spotlight-color', 'rgba(212, 175, 55, 0.4)');
    } else {
      divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    }
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
};

const Sponsors = () => {
  const sectionRef = useRef(null);
  const mainSupporterRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Main Supporter - NMIMS
  const mainSupporter = {
    name: "NMIMS University",
    logo: "/img/nmims-logo.png",
    description: "Narsee Monjee Institute of Management Studies - Our Primary Academic Partner",
    website: "https://nmims.edu"
  };

  // Key Sponsors Data (for carousel)
  const keySponsors = [
    {
      name: "TechCorp Solutions",
      logo: "/img/sponsors/techcorp.png",
      description: "Leading technology solutions provider"
    },
    {
      name: "InnovateX Labs",
      logo: "/img/sponsors/innovatex.png", 
      description: "Research and development partner"
    },
    {
      name: "DroneWorks Inc",
      logo: "/img/sponsors/droneworks.png",
      description: "Drone technology and manufacturing"
    },
    {
      name: "AI Dynamics",
      logo: "/img/sponsors/aidynamics.png",
      description: "Artificial intelligence solutions"
    },
    {
      name: "Healthcare Plus",
      logo: "/img/sponsors/healthcareplus.png",
      description: "Healthcare technology innovations"
    },
    {
      name: "Future Systems",
      logo: "/img/sponsors/futuresystems.png",
      description: "Next-generation system integration"
    },
    {
      name: "Robotics Hub",
      logo: "/img/sponsors/roboticshub.png",
      description: "Advanced robotics and automation"
    },
    {
      name: "CloudTech Pro",
      logo: "/img/sponsors/cloudtech.png",
      description: "Cloud computing and infrastructure"
    },
    {
      name: "Innovation Studio",
      logo: "/img/sponsors/innovationstudio.png",
      description: "Creative technology solutions"
    },
    {
      name: "NextGen Ventures",
      logo: "/img/sponsors/nextgen.png",
      description: "Investment and business development"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Main supporter animation
      gsap.fromTo(mainSupporterRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: mainSupporterRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Carousel animation setup
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP transition animation
  useEffect(() => {
    if (!carouselRef.current) return;

    const slides = carouselRef.current.querySelectorAll('.sponsor-slide');
    
    gsap.to(slides, {
      x: (index) => {
        const position = index - currentIndex;
        return `${position * 350}px`; // 350px spacing between slides
      },
      scale: (index) => {
        const position = Math.abs(index - currentIndex);
        return position === 0 ? 1.1 : 0.9; // Center slide larger, others smaller
      },
      opacity: (index) => {
        const position = Math.abs(index - currentIndex);
        return position === 0 ? 1 : 0.6; // Center slide fully visible, others semi-transparent
      },
      duration: 0.8,
      ease: "power2.out",
      stagger: 0
    });
  }, [currentIndex]);

  // Auto-slide carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % keySponsors.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [keySponsors.length]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 px-4"
      style={{ backgroundColor: '#0f0f0f' }}
      id="sponsors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">Supporters</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're grateful for the support of our partners who believe in our vision of innovation and excellence
          </p>
        </div>

        {/* Main Supporter Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
            Institutional Sponsor
            </span>
          </h2>
          
          <div ref={mainSupporterRef} className="flex justify-center">
            <SpotlightCard 
              className="main-supporter-card"
              isMainSupporter={true}
            >
              <div className="relative rounded-3xl p-12 md:p-16 text-center max-w-2xl"
                   style={{ 
                     backgroundColor: 'rgba(255, 255, 255, 0.03)'
                   }}>
                <div className="mb-8">
                  <img 
                    src={mainSupporter.logo}
                    alt={mainSupporter.name}
                    className="h-24 md:h-32 mx-auto mb-6 transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                  {mainSupporter.name}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {mainSupporter.description}
                </p>
                <a 
                  href={mainSupporter.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.1))',
                    color: '#D4AF37'
                  }}
                >
                  Visit Website
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Key Sponsors Carousel Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-center mb-16">
            Key Sponsors
          </h2>
          
          {/* Smooth GSAP Carousel */}
          <div className="relative overflow-hidden py-16">
            <div ref={carouselRef} className="flex justify-center items-center" style={{ height: '300px' }}>
              {keySponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="sponsor-slide absolute"
                  style={{ 
                    transform: `translateX(${(index - currentIndex) * 350}px) scale(${Math.abs(index - currentIndex) === 0 ? 1.1 : 0.9})`,
                    opacity: Math.abs(index - currentIndex) === 0 ? 1 : 0.6,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="relative rounded-2xl p-8 text-center w-80"
                       style={{ 
                         backgroundColor: 'rgba(255, 255, 255, 0.04)'
                       }}>
                    
                    {/* Logo Section */}
                    <div className="mb-6">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-xl flex items-center justify-center"
                           style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                        <div className="w-20 h-20 rounded-lg flex items-center justify-center"
                             style={{ backgroundColor: `hsl(${index * 36}, 70%, 60%)` }}>
                          <span className="text-white font-bold text-xl">
                            {sponsor.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-100 mb-3">
                        {sponsor.name}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                        {sponsor.description}
                      </p>
                      
                      <button className="text-sm text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {keySponsors.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'bg-gray-300 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="text-center mt-20 pt-16" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">
            Thank You to All Our Partners
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your support makes our innovative projects possible and helps us continue pushing the boundaries of technology and healthcare solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
