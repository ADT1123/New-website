import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  InstagramLogo, 
  FacebookLogo, 
  LinkedinLogo, 
  YoutubeLogo,
  Phone,
  Envelope,
  MapPin,
  Heart
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple floating particles
      gsap.to(".particle", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

      // Footer sections slide in
      gsap.fromTo(".footer-section", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons simple animation
      gsap.fromTo(".social-icon", 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.5)",
          delay: 0.8
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { 
      icon: InstagramLogo, 
      href: 'https://www.instagram.com/uasnmims', 
      label: 'Instagram',
      hoverColor: 'hover:text-pink-500'
    },
    { 
      icon: FacebookLogo, 
      href: 'https://www.facebook.com/UASNMIMS/', 
      label: 'Facebook',
      hoverColor: 'hover:text-blue-500'
    },
    { 
      icon: LinkedinLogo, 
      href: 'https://www.linkedin.com/company/uas-nmims/posts/?feedView=all', 
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-600'
    },
    { 
      icon: YoutubeLogo, 
      href: 'https://www.youtube.com/channel/UCto9FMLqgt1F0MLdSEjdzgg', 
      label: 'YouTube',
      hoverColor: 'hover:text-red-500'
    }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative py-20 px-4 bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Minimal background with subtle colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple particles with subtle colors */}
        <div className="particle absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-blue-400/20 blur-sm"></div>
        <div className="particle absolute top-[60%] left-[80%] w-3 h-3 rounded-full bg-white/15 blur-sm"></div>
        <div className="particle absolute bottom-[30%] left-[30%] w-2.5 h-2.5 rounded-full bg-purple-400/15 blur-sm"></div>
        <div className="particle absolute bottom-[70%] right-[20%] w-2 h-2 rounded-full bg-white/25 blur-sm"></div>

        {/* Subtle background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/[0.015] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          
          {/* Reach Us Section */}
          <div className="footer-section space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8 relative">
              Reach Us At
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-400/60"></div>
            </h3>
            
            <div className="space-y-4">
              {/* Captain */}
              <div className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-400/20 transition-colors duration-300">
                    <Phone size={20} className="text-white/80 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Vaibhav Tayal (Captain)</p>
                    <a href="tel:+919252480742" className="text-white/70 hover:text-blue-400 transition-colors duration-300">
                      +91 9252480742
                    </a>
                  </div>
                </div>
              </div>

              {/* Vice Captain */}
              <div className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 hover:border-purple-400/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-purple-400/20 transition-colors duration-300">
                    <Phone size={20} className="text-white/80 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Om Biscuitwala (Vice-Captain)</p>
                    <a href="tel:+917447779897" className="text-white/70 hover:text-purple-400 transition-colors duration-300">
                      +91 7447779897
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-colors duration-300">
                    <Envelope size={20} className="text-white/80" />
                  </div>
                  <div>
                    <a href="mailto:uasnmims@gmail.com" className="text-white/70 hover:text-white transition-colors duration-300 font-medium">
                      uasnmims@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Us Section */}
          <div className="footer-section space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8 relative">
              Visit Us At
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-400/60"></div>
            </h3>
            
            <div className="group p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-colors duration-300 flex-shrink-0">
                  <MapPin size={24} className="text-white/80" />
                </div>
                <div>
                  <a 
                    href="https://www.google.com/maps/place/21%C2%B017'03.7%22N+74%C2%B050'40.6%22E/@21.2843732,74.8440688,206m/data=!3m2!1e3!4b1!4m9!1m2!2m1!1snmims+shirpur!3m5!1s0x0:0x0!7e2!8m2!3d21.2843715!4d74.8446156"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300 leading-relaxed"
                  >
                    UAS NMIMS lab,<br />
                    B-Wing 1st Floor,<br />
                    Academic Wing,<br />
                    Mukesh Patel Technology Park,<br />
                    Babulde, Near Tapi Bridge,<br />
                    Shirpur, Maharashtra 425405
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Connected Section */}
          <div className="footer-section space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8 relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/40"></div>
            </h3>
            
            <div className="flex space-x-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <IconComponent size={24} className={`text-white/80 group-hover:text-white ${social.hoverColor} transition-colors duration-300`} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © 2024 Team UAS NMIMS. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center text-sm text-white/60">
              <span>Made with</span>
              <Heart size={16} className="text-red-400 mx-2 animate-pulse" />
              <span>by Team UAS NMIMS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
