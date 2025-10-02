import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import Orb from './Orb';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  // Typewriter animation state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = ['Develop.', 'Create.', 'Design.', 'Innovate.', 'Build.'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Hero content animations with slightly more dramatic entrance
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 100, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power3.out" }
      );
      
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=1.2"
      );
      
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.7"
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Fixed Typewriter effect
  useEffect(() => {
    let timeoutId;
    
    const typeSpeed = 150;
    const deleteSpeed = 75;
    const delayBetweenWords = 2000;

    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Word completed, wait before deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Deletion completed, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* WebGL Orb Background - Full coverage */}
      <div className="absolute inset-0 w-full h-full min-w-full min-h-full">
        <Orb 
          hueShift={240} // Blue-purple hue for tech feel
        />
      </div>

      {/* Optional: Add multiple orbs for layered effect */}
      <div className="absolute inset-0 w-full h-full min-w-full min-h-full opacity-30">
        <Orb 
          hueShift={180} // Cyan hue
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Content - Responsive */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
        {/* Main Title - Bigger Mobile Only */}
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 md:mb-6 text-white"
          style={{ fontFamily: "'BankGothic Md BT', sans-serif" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>TEAM</span>
            <span className="bg-white bg-clip-text text-transparent">
              UAS NMIMS
            </span>
          </div>
        </h1>
        
        {/* Typewriter Text - Bigger Mobile Only */}
        <div className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-200 mb-6 md:mb-8 font-bold min-h-[1.2em] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span style={{ fontFamily: "'BankGothic Md BT', sans-serif" }}>We</span>
          <span 
            style={{ fontFamily: "'BankGothic Md BT', sans-serif" }}
            ref={typewriterRef}
            className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent relative"
          >
            {currentText}
            <span className="animate-pulse text-orange-400 ml-1">|</span>
          </span>
        </div>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow-lg px-4"
        >
        </p>
        
        {/* Buttons - Mobile Responsive */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-black border-2 border-white/20 text-white hover:backdrop-blur-lg hover:bg-black/70 hover:shadow-lg px-6 md:px-8 py-4 md:py-6 text-base md:text-lg transition-all duration-300 hover:border-white/50"
          >
            LEARN MORE
          </Button>
          <Link to="/projects" className="w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-black border-2 border-white/20 text-white hover:backdrop-blur-lg hover:bg-black/70 hover:shadow-lg px-6 md:px-8 py-4 md:py-6 text-base md:text-lg transition-all duration-300 hover:border-white/50"
            >
              OUR SYSTEMS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
