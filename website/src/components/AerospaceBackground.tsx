// components/AerospaceBackground.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AerospaceBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const AerospaceBackground = ({ className = "", children }: AerospaceBackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced geometric elements animation
      gsap.to(".bg-float", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(8, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
      });

      // Radar pulse animation
      gsap.to(".radar-ring", {
        scale: "random(0.95, 1.05)",
        opacity: "random(0.5, 1)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5
      });

      // Glowing data points pulse
      gsap.to(".bg-particle", {
        scale: "random(0.8, 1.3)",
        opacity: "random(0.3, 0.8)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.8
      });
    }, backgroundRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        background: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.025) 0%, transparent 50%),
          radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.02) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 35%, #030712 70%, #000000 100%)
        `,
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif'
      }}
    >
      {/* Advanced Interactive Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Technical Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Aerospace Circuit Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
            `,
            backgroundSize: '120px 120px, 80px 80px, 200px 200px, 200px 200px'
          }}
        />

        {/* Floating Geometric Elements */}
        <div className="bg-float absolute w-6 h-6 border border-white/5 rotate-45 top-[15%] left-[12%]"></div>
        <div className="bg-float absolute w-4 h-4 border border-blue-400/10 rounded-full top-[25%] right-[15%]"></div>
        <div className="bg-float absolute w-8 h-8 border border-white/4 top-[35%] left-[85%]"></div>
        <div className="bg-float absolute w-3 h-3 bg-white/5 rotate-45 top-[55%] left-[8%]"></div>
        <div className="bg-float absolute w-5 h-5 border border-purple-400/8 rounded-full top-[70%] right-[20%]"></div>
        
        {/* Radar/Sonar Rings */}
        <div className="radar-ring absolute top-[30%] left-[15%] w-32 h-32 border border-white/[0.02] rounded-full"></div>
        <div className="radar-ring absolute top-[30%] left-[15%] w-48 h-48 border border-white/[0.015] rounded-full"></div>
        <div className="radar-ring absolute bottom-[25%] right-[10%] w-40 h-40 border border-blue-400/[0.015] rounded-full"></div>
        <div className="radar-ring absolute bottom-[25%] right-[10%] w-56 h-56 border border-blue-400/[0.01] rounded-full"></div>

        {/* Interactive Data Points */}
        <div className="bg-particle absolute w-2 h-2 bg-blue-400/20 rounded-full top-[20%] left-[25%] shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
        <div className="bg-particle absolute w-1.5 h-1.5 bg-green-400/15 rounded-full top-[40%] right-[30%] shadow-[0_0_8px_rgba(34,197,94,0.2)]"></div>
        <div className="bg-particle absolute w-2 h-2 bg-purple-400/15 rounded-full top-[65%] left-[70%] shadow-[0_0_10px_rgba(168,85,247,0.25)]"></div>
        <div className="bg-particle absolute w-1 h-1 bg-white/25 rounded-full bottom-[35%] right-[25%] shadow-[0_0_6px_rgba(255,255,255,0.4)]"></div>

        {/* Atmospheric Depth Layers */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-950/[0.02] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-950/[0.03] via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white/[0.008] via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white/[0.01] via-transparent to-transparent"></div>

        {/* Constellation Elements */}
        <div className="absolute top-[18%] left-[22%] w-px h-8 bg-white/5 rotate-12"></div>
        <div className="absolute top-[18%] left-[22%] w-8 h-px bg-white/5 rotate-12"></div>
        <div className="absolute top-[45%] right-[35%] w-px h-6 bg-blue-400/8 -rotate-45"></div>
        <div className="absolute top-[45%] right-[35%] w-6 h-px bg-blue-400/8 -rotate-45"></div>
        <div className="absolute bottom-[30%] left-[45%] w-px h-4 bg-purple-400/6 rotate-45"></div>
        <div className="absolute bottom-[30%] left-[45%] w-4 h-px bg-purple-400/6 rotate-45"></div>

        {/* Subtle Glowing Orbs for Depth */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-500/[0.008] rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] right-[8%] w-80 h-80 bg-purple-500/[0.006] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] left-[30%] w-72 h-72 bg-green-500/[0.005] rounded-full blur-3xl"></div>
        
        {/* Technical Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-white/5"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-white/5"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-white/5"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-white/5"></div>
      </div>

      {/* Content goes here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AerospaceBackground;
