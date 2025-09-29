import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const CleanPreloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fast logo entrance
    tl.fromTo(logoRef.current,
      { 
        opacity: 0,
        y: 20,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }
    )

    // Quick loader and text appear
    .fromTo([loaderRef.current, textRef.current],
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      0.2
    )

    // Fast progress animation
    .to({}, {
      duration: 1,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    }, 0.3)

    // Quick exit - logo moves up
    .to(logoRef.current, {
      y: -80,
      scale: 0.7,
      duration: 0.4,
      ease: "power2.in"
    }, "+=0.1")

    .to([loaderRef.current, textRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.3")

    // Fast background fade
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => onComplete()
    }, "-=0.1");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Logo */}
      <div className="mb-12">
        <img 
          ref={logoRef}
          src="/logo-Photoroom.png" 
          alt="Team UAS Logo" 
          className="h-28 md:h-32 filter drop-shadow-xl"
        />
      </div>

      {/* Clean Circular Loader */}
      <div ref={loaderRef} className="relative mb-6">
        <svg 
          className="w-16 h-16 transform -rotate-90" 
          viewBox="0 0 64 64"
        >
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="2"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 28}
            strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
            className="transition-all duration-100 ease-out"
          />
        </svg>
      </div>

      {/* Simple Loading Text */}
      <div ref={textRef} className="text-center">
        <div className="text-white/70 text-sm font-light tracking-widest">
          LOADING
        </div>
      </div>
    </div>
  );
};

export default CleanPreloader;
