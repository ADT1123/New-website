import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SpotlightCard.css';

gsap.registerPlugin(ScrollTrigger);

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(255, 255, 255, 0.20)',
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
      divRef.current.style.setProperty('--spotlight-color', 'rgba(212, 175, 55, 0.35)');
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

  const mainSupporter = {
    name: "NMIMS University",
    logo: "/img/NMIMS_LOGO4.png",
    logoClass: "nmims-logo rounded-border",
    description: "Narsee Monjee Institute of Management Studies - Our Primary Academic Partner",
    website: "https://nmims.edu"
  };

  const keySponsors = [
    {
      name: "NMIMS",
      logo: "/img/NMIMS_LOGO4.png",
      website: "https://nmims.edu"
    },
    {
      name: "SolidWorks",
      logo: "/img/Solidworks2.png", 
      website: "https://www.solidworks.com/"
    },
    {
      name: "Ansys",
      logo: "/img/Ansys1.png",
      website: "https://www.ansys.com/"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(mainSupporterRef.current,
        { opacity: 0, scale: 0.92, y: 50 },
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

  useEffect(() => {
    if (!carouselRef.current) return;

    const slides = carouselRef.current.querySelectorAll('.sponsor-slide');
    
    gsap.to(slides, {
      x: (index) => {
        const position = index - currentIndex;
        return `${position * 400}px`;
      },
      scale: (index) => {
        const position = Math.abs(index - currentIndex);
        return position === 0 ? 1.28 : 1.0;
      },
      opacity: (index) => {
        const position = Math.abs(index - currentIndex);
        return position === 0 ? 1 : 0.55;
      },
      filter: (index) => {
        const position = Math.abs(index - currentIndex);
        return position === 0 ? 'drop-shadow(0 6px 28px rgba(140,180,255,0.22))' : 'none';
      },
      duration: 0.85,
      ease: "power2.out",
      stagger: 0
    });
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % keySponsors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [keySponsors.length]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 px-4 navy-bg"
      id="sponsors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-hero">
            <span className="mr-3 text-slate-300">Our</span>
            <span className="text-white">Sponsors</span>
          </h1>
          <p className="text-xl text-slate-300/80 max-w-3xl mx-auto">
            We’re grateful for the support of partners who believe in innovation and excellence
          </p>
        </div>

        {/* Main Supporter Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
            Institutional Sponsor
          </h2>
          
          <div ref={mainSupporterRef} className="flex justify-center">
            <SpotlightCard 
              className="main-supporter-card"
              isMainSupporter={true}
            >
              <div className="relative rounded-3xl p-12 md:p-16 text-center max-w-2xl glass-card">
                <div className="mb-8">
                  <img 
                    src={mainSupporter.logo}
                    alt={mainSupporter.name}
                    className="h-24 md:h-32 mx-auto mb-6 transition-transform duration-300 hover:scale-105 rounded-2xl"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                  {mainSupporter.name}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {mainSupporter.description}
                </p>
                <a 
                  href={mainSupporter.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.10))',
                    color: '#D4AF37'
                  }}
                >
                  Visit Website
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Key Sponsors Carousel Section - LOGO ONLY */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-center mb-16">
            Key Sponsors
          </h2>
          
          {/* Logo-Only Carousel - No Text */}
          <div className="relative overflow-hidden py-16">
            <div ref={carouselRef} className="flex justify-center items-center" style={{ height: '200px' }}>
              {keySponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="sponsor-slide absolute group"
                  style={{ 
                    transform: `translateX(${(index - currentIndex) * 400}px) scale(${Math.abs(index - currentIndex) === 0 ? 1.28 : 1.0})`,
                    opacity: Math.abs(index - currentIndex) === 0 ? 1 : 0.55,
                    transition: 'all 0.85s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-48 h-32 logo-frame">
                      <img 
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full rounded-xl object-contain transition-all duration-300 hover:brightness-110"
                        style={{
                          filter: Math.abs(index - currentIndex) === 0 ? 'brightness(1) saturate(1.1)' : 'brightness(0.85) saturate(0.85)'
                        }}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-12 gap-2">
              {keySponsors.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'bg-slate-200 w-8' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sponsor Us Section */}
        <div className="text-center mt-32 pt-16 border-t border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Sponsor Us
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Join our community of supporters and help us drive innovation forward, then download our sponsorship brochure to explore partnership opportunities
          </p>
          
          {/* Brochure Download Section */}
          <div className="mb-12">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/img/UAS-SPONSORSHIP-BROCHURE.pdf';
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl btn-ghost"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Sponsorship Brochure
            </button>
          </div>

          {/* Contact Mail Section */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-200 mb-6">
              Ready to Partner With Us?
            </h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:uasnmims@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send us an Email
              </a>
              
              <div className="text-slate-300">
                <p className="text-sm">or reach us directly at</p>
                <a 
                  href="mailto:uasnmims@gmail.com" 
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300"
                >
                  uasnmims@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="text-center mt-20 pt-16">
          <h3 className="text-2xl font-semibold text-slate-200 mb-4">
            Thank You to All Our Partners
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Your support makes our innovative projects possible and helps us continue pushing the boundaries of technology
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
