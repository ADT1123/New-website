import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Timeline from './Timeline';
import Contact from './Contact';
import Footer from './Footer';
import LogoLoop from './LogoLoop';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Partner logos data unchanged
  const partnerLogos = [
    { src: '/logo-Photoroom.png', alt: 'Team UAS NMIMS', href: '#' },
    { src: '/img/NMIMS_LOGO4.png', title: 'NMIMS University',href: 'https://www.nmims.edu' },
    { src: '/img/Solidworks2.png', title: 'SolidWorks',href: 'https://www.Solidworks.com' },
    { src: '/img/Ansys1.png', title: 'Ansys', href: 'https://www.ansys.com' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.main-content', { opacity: 0, scale: 1.1 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Add subtle floating animated blobs background
    const container = backgroundRef.current;
    if (!container) return;

    const blobs: HTMLDivElement[] = [];
    for (let i = 0; i < 6; i++) {
      const blob = document.createElement('div');
      blob.style.position = 'absolute';
      blob.style.top = `${Math.random() * 100}%`;
      blob.style.left = `${Math.random() * 100}%`;
      blob.style.width = `${280 + Math.random() * 140}px`;
      blob.style.height = blob.style.width;
      blob.style.borderRadius = '50%';
      blob.style.background = `radial-gradient(circle, rgba(255,140,20,0.18) 0%, transparent 85%)`;
      blob.style.filter = `blur(${12 + Math.random() * 6}px)`;
      blob.style.opacity = '0.6';
      blob.style.mixBlendMode = 'screen';
      blob.style.pointerEvents = 'none';

      container.appendChild(blob);
      blobs.push(blob);

      gsap.to(blob, {
        x: () => Math.random() * 120 - 60,
        y: () => Math.random() * 110 - 55,
        duration: 20 + Math.random() * 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 10,
      });
    }

    return () => {
      blobs.forEach(b => container.removeChild(b));
    };
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
    <div className="relative min-h-screen">
      {/* Animated background blobs */}
      <div 
        ref={backgroundRef} 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ backgroundColor: '#0a0a0a' }}
      ></div>

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

          <section id="Timeline">
            <Timeline />
          </section>

          {/* Partners Section with LogoLoop */}
          <section className="py-20 bg-black relative overflow-hidden">
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
