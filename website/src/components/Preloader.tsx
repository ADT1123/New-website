import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const CleanPreloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Optimize for slower PCs
    gsap.set(gsap.config(), { 
      force3D: true,  // Hardware acceleration
      nullTargetWarn: false
    });

    // Check device performance
    const isSlowDevice = () => {
      return navigator.hardwareConcurrency <= 4 || 
             /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const performanceMultiplier = isSlowDevice() ? 0.7 : 1; // Slower animations for weak devices
    const tl = gsap.timeline();

    // Initial optimized setup
    gsap.set(logoRef.current, {
      y: 200, // Reduced travel distance
      scale: 0.4,
      opacity: 1,
      willChange: "transform, opacity", // Optimize for animations
      backfaceVisibility: "hidden" // Prevent flickering
    });

    tl
    // Smoother logo slide up
    .to(logoRef.current, {
      y: 0,
      scale: 1,
      duration: 0.8 * performanceMultiplier,
      ease: "power1.out", // Gentler easing for smoother performance
      force3D: true
    })

    // Shorter pause
    .to({}, { duration: 0.2 * performanceMultiplier })

    // Optimized scale and fade
    .to(logoRef.current, {
      scale: isSlowDevice() ? 8 : 12, // Less scaling for slower devices
      opacity: 0,
      duration: 1 * performanceMultiplier,
      ease: "power1.in", // Smoother easing
      force3D: true,
      onUpdate: function() {
        // Smooth opacity transition
        const progress = this.progress();
        if (progress > 0.6) {
          gsap.set(logoRef.current, {
            filter: `blur(${(progress - 0.6) * 5}px)`
          });
        }
      }
    })

    // Quick background fade
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "none",
      force3D: true,
      onComplete: () => {
        // Clean up
        gsap.set(logoRef.current, { willChange: "auto" });
        onComplete();
      }
    }, "-=0.3");

    return () => {
      tl.kill();
      gsap.set(logoRef.current, { willChange: "auto" });
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 35%, #030712 70%, #000000 100%)',
        backfaceVisibility: 'hidden', // Prevent flickering
        perspective: '1000px' // Better 3D rendering
      }}
    >
      <img 
        ref={logoRef}
        src="/logo-Photoroom.png" 
        alt="Team UAS Logo" 
        className="h-32 filter drop-shadow-2xl"
        style={{
          backfaceVisibility: 'hidden', // Prevent flickering
          WebkitFontSmoothing: 'antialiased',
          imageRendering: 'crisp-edges'
        }}
        loading="eager" // Priority loading
        decoding="sync"
      />
    </div>
  );
};

export default CleanPreloader;
