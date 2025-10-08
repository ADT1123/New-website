import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { X } from 'phosphor-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'About us', href: '/AboutUs', isPage: true },
    { name: 'Projects', href: '/projects', isPage: true },
    { name: 'Contact', href: '/contact', isPage: true },
    { name: 'Sponsors', href: '/sponsors', isPage: true },

  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate square popup opening
      gsap.fromTo('.mobile-menu-popup', 
        { 
          opacity: 0, 
          scale: 0.8,
          y: -20,
          rotationY: -15 
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.5, 
          ease: 'back.out(1.7)' 
        }
      );
      
      // Stagger menu items
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, y: 20, x: -30 },
        { 
          opacity: 1, 
          y: 0, 
          x: 0,
          duration: 0.4, 
          stagger: 0.08, 
          delay: 0.3,
          ease: 'power2.out'
        }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href: string, isPage: boolean) => {
    if (isPage) {
      navigate(href);
    } else {
      if (location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    setIsOpen(false);
  };

  // Animated hamburger button component
  const AnimatedHamburger = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        className="md:hidden w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 z-10 group overflow-hidden"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <span className={`
            h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out transform-gpu
            ${isOpen 
              ? 'rotate-45 translate-y-2 w-6' 
              : 'rotate-0 translate-y-0 w-6 group-hover:w-7'
            }
          `}></span>
          
          <span className={`
            h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out transform-gpu
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100 w-5 group-hover:w-6'
            }
          `}></span>
          
          <span className={`
            h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out transform-gpu
            ${isOpen 
              ? '-rotate-45 -translate-y-2 w-6' 
              : 'rotate-0 translate-y-0 w-4 group-hover:w-5'
            }
          `}></span>
        </div>

        <div className={`
          absolute inset-0 rounded-xl bg-white/20 transform scale-0 transition-transform duration-300
          ${isOpen ? 'scale-100' : 'scale-0'}
        `}></div>
      </button>
    );
  };

  return (
    <>
      {/* Navigation - FIXED FOR MOBILE */}
      <nav 
        className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/20' 
            : 'bg-black/75 backdrop-blur-md'
        }`}
        style={{
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)',
          // Mobile fixes for navbar disappearing
          position: 'fixed',
          top: 0,
          willChange: 'transform'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link 
              to="/"
              className="group flex items-center space-x-3 z-10"
            >
              <img 
                src="/img/logo-Photoroom.png" 
                alt="Team UAS Logo" 
                className="h-16 md:h-16 transition-transform duration-300 group-hover:scale-110" 
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 z-10">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-white/80 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide group ${
                      location.pathname === item.href ? 'text-white' : ''
                    }`}
                  >
                    <span>{item.name}</span>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                      location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.isPage)}
                    className="relative text-white/80 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide group"
                  >
                    <span>{item.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-white transition-all duration-300"></div>
                  </button>
                )
              ))}
            </div>

            {/* Animated Mobile Hamburger Button */}
            <AnimatedHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </nav>

      {/* Square Mobile Menu Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden flex items-start justify-end p-4 pt-20">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          ></div>
          
          {/* Square Menu Container */}
          <div className="mobile-menu-popup relative w-72 sm:w-80 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img 
                  src="/img/LOGO5.png" 
                  alt="Team UAS Logo" 
                  className="h-8 w-auto" 
                />
                <span className="text-white font-semibold text-lg">Menu</span>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
              >
                <X size={16} className="text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={item.name} className="mobile-nav-item">
                  {item.isPage ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group relative block py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/15
                        ${location.pathname === item.href ? 'bg-white/10 text-white border-white/20' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="w-0 group-hover:w-4 h-0.5 bg-white/40 transition-all duration-300 rounded-full"></div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href, item.isPage)}
                      className="group relative w-full text-left py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/15"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="w-0 group-hover:w-4 h-0.5 bg-white/40 transition-all duration-300 rounded-full"></div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 pt-2 border-t border-white/10 mt-2">
              <div className="text-center">
                <p className="text-xs text-white/60">Team UAS NMIMS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navigation;
