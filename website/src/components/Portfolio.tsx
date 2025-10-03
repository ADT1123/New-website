// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Timeline from './Timeline'; // ← Fixed import path
import Contact from './Contact';
import Footer from './Footer';
import LogoLoop from './LogoLoop';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);

  // Partner logos data
  const partnerLogos = [
    {
      src: '/logo-Photoroom.png',
      alt: 'Team UAS NMIMS',
      href: '#'
    },
    {
      src: '/img/NMIMS_LOGO4.png',
      title: 'NMIMS University'
    },
    {
      src: '/img/Solidworks2.png',
      title: 'AUVSI Competition'
    },
    {
      src: '/img/Ansys1.png',
      title: 'DRDO Partner'
    },
    {
      src: '/logo-Photoroom.png',
      title: 'IEEE'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.main-content', { opacity: 0, scale: 1.1 });
    });
    return () => ctx.revert();
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    gsap.to('.main-content', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 0.2
    });
  };

  return (
    <div className="relative">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className="main-content">
        
        <main>
          <Navigation />
          <section id="home">
            <Hero />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="Timeline"> {/* ← Add this section */}
            <Timeline />
          </section>

          {/* Partners Section with LogoLoop */}
          <section className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-96 h-96 bg-white/[0.02] rounded-full blur-3xl top-[20%] left-[10%]"></div>
              <div className="absolute w-80 h-80 bg-white/[0.015] rounded-full blur-3xl bottom-[30%] right-[15%]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Our Partners & <span className="text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">Sponsors</span>
                </h2>
                <p className="text-white/70 text-lg">
                  Collaborating with industry leaders and academic institutions
                </p>
              </div>
              
              <LogoLoop 
                logos={partnerLogos}
                speed={50}
                direction="left"
                logoHeight={60}
                gap={100}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#000000"
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
              />
            </div>
          </section>
          
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
