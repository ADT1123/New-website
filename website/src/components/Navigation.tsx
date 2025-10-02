import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'Achievements', href: '/#Timeline', isPage: false },
    //{ name: 'About', href: '/#about', isPage: false },
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
      gsap.fromTo('.mobile-menu', 
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
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

  return (
    <>
      {/* Clean Navigation */}
        <nav className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 shadow-lg ${

          scrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/20 shadow-black/30' 
            : 'bg-black/75 backdrop-blur-md shadow-black/20'
        }`}>


        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Simple Logo */}
            <Link 
              to="/"
              className="group flex items-center space-x-3 z-10"
            >
              <img 
                src="/img/LOGO5.png" 
                alt="Team UAS Logo" 
                className="h-24 md:h-16 transition-transform duration-300 group-hover:scale-110" 

              />
            </Link>

            {/* Clean Desktop Menu */}
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
                    
                    {/* Simple underline */}
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
                    
                    {/* Simple underline */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-white transition-all duration-300"></div>
                  </button>
                )
              ))}
            </div>

            {/* Simple Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-10"
            >
              <List size={18} className="text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Clean Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="mobile-menu absolute right-0 top-0 h-full w-72 max-w-full bg-black/95 backdrop-blur-xl border-l border-white/20">
            
            {/* Simple Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Simple Navigation Items */}
            <nav className="p-6 space-y-4">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-nav-item block py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 ${
                      location.pathname === item.href ? 'bg-white/10 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.isPage)}
                    className="mobile-nav-item block w-full text-left py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </nav>

            {/* Simple Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <div className="text-center">
                <p className="text-sm text-white/60">
                  Team UAS
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
