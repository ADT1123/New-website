import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo,
  EnvelopeSimple,
  InstagramLogo,
  YoutubeLogo,
  DiscordLogo,
  FacebookLogo,
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Team and contact data
  const teamInfo = {
    title: " Team UAS NMIMS",
    subtitle: "Innovating the future of drone technology",
    teamPhoto: "/img/portfolio/thumbnails/img21.jpg", // Replace with your actual team photo
  };

  const contactEmail = "uasnmims@gmail.com"; // Replace with actual email
  
  const socialLinks = [
    { 
      icon: LinkedinLogo, 
      href: 'https://www.linkedin.com/company/uas-nmims/posts/?feedView=all', 
      label: 'LinkedIn',
      color: 'hover:text-white hover:bg-blue-600'
    },
    { 
      icon: FacebookLogo, 
      href: 'https://www.facebook.com/UASNMIMS/', 
      label: 'Facebook',
      color: 'hover:text-white hover:bg-blue-400'
    },
    { 
      icon: InstagramLogo, 
      href: 'https://www.instagram.com/uasnmims/#', 
      label: 'Instagram',
      color: 'hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
    },
    { 
      icon: YoutubeLogo, 
      href: 'https://www.youtube.com/channel/UCto9FMLqgt1F0MLdSEjdzgg', 
      label: 'YouTube',
      color: 'hover:text-white hover:bg-red-600'
    },
  ];

  useEffect(() => {
    // Inject minimal navy styles and interactive background
    const style = document.createElement("style");
    style.textContent = `
      .card-minimal {
        background: rgba(12,17,24,0.6);
        border: 1px solid rgba(80,140,210,0.20);
        border-radius: 18px;
        transition: transform .25s cubic-bezier(.2,.7,.1,1), border-color .25s, box-shadow .25s;
        backdrop-filter: blur(6px) saturate(120%);
        -webkit-backdrop-filter: blur(6px) saturate(120%);
        box-shadow: 0 10px 30px rgba(32,93,170,0.08);
      }
      .card-minimal:hover {
        transform: translateY(-3px);
        border-color: rgba(120,170,235,0.35);
        box-shadow: 0 16px 40px rgba(80,140,210,0.18);
      }
      .link-chip {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        transition: transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease;
      }
      .link-chip:hover {
        transform: translateY(-2px) scale(1.03);
        background: rgba(120,170,235,0.14);
        box-shadow: 0 8px 26px rgba(80,140,210,0.25);
        border-color: rgba(120,170,235,0.35);
      }
    `;
    document.head.appendChild(style);

    // Page animations
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Team photo animation
      gsap.fromTo(".team-photo",
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-photo",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Email section animation
      gsap.fromTo(emailRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Support section animation
      gsap.fromTo(supportRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: supportRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons staggered animation
      gsap.fromTo(".social-icon",
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Title text animation
      gsap.fromTo(".title-text",
        { opacity: 0, y: 30, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    // Interactive navy orbs
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      const bg = document.getElementById("contact-orbs");
      if (bg) {
        const orbs: HTMLDivElement[] = [];
        const count = 5;
        for (let i = 0; i < count; i++) {
          const orb = document.createElement("div");
          orb.style.position = "absolute";
          orb.style.width = `${260 + Math.random()*140}px`;
          orb.style.height = orb.style.width;
          orb.style.borderRadius = "50%";
          orb.style.left = `${Math.random()*90}%`;
          orb.style.top = `${Math.random()*85}%`;
          orb.style.pointerEvents = "none";
          orb.style.opacity = "0.55";
          orb.style.mixBlendMode = "screen";
          orb.style.filter = "blur(12px)";
          orb.style.background = [
            "radial-gradient(circle, rgba(80,140,210,0.26) 0%, transparent 80%)",
            "radial-gradient(circle, rgba(120,170,235,0.18) 0%, transparent 75%)",
            "radial-gradient(circle, rgba(50,100,185,0.22) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(32,93,170,0.16) 0%, transparent 85%)",
            "radial-gradient(circle, rgba(90,150,220,0.22) 0%, transparent 78%)",
          ][i % 5];

          bg.appendChild(orb);
          orbs.push(orb);

          gsap.to(orb, {
            x: () => Math.random()*120 - 60,
            y: () => Math.random()*100 - 50,
            duration: 22 + Math.random()*10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random()*6
          });
        }

        // Mouse-follow glow
        const glow = document.createElement("div");
        glow.style.position = "absolute";
        glow.style.width = "220px";
        glow.style.height = "220px";
        glow.style.borderRadius = "50%";
        glow.style.pointerEvents = "none";
        glow.style.opacity = "0.6";
        glow.style.mixBlendMode = "screen";
        glow.style.filter = "blur(12px)";
        glow.style.background = "radial-gradient(circle,rgba(120,170,235,0.28) 8%,rgba(80,140,210,0.20) 46%,transparent 90%)";
        bg.appendChild(glow);

        let last = 0;
        function move(e: MouseEvent | {clientX:number; clientY:number}) {
          const now = performance.now();
          if (now - last < 16) return; last = now;
          const r = bg.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          glow.style.left = `calc(${x}% - 110px)`;
          glow.style.top = `calc(${y}% - 110px)`;
        }
        bg.addEventListener("mousemove", move);
        bg.addEventListener("touchmove", (evt) => {
          if (evt.touches?.length) {
            move({ clientX: evt.touches[0].clientX, clientY: evt.touches[0].clientY } as MouseEvent);
          }
        });
      }
    }

    return () => {
      ctx.revert();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Inquiry from Team UAS NMIMS Website");
    const body = encodeURIComponent(`Hello Team UAS NMIMS,\n\n${message}\n\nBest regards,\n${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setEmail('');
    setMessage('');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #0c1118 0%, #05070b 100%)"
      }}
    >
      {/* Navy orbs background */}
      <div id="contact-orbs" className="pointer-events-none absolute inset-0 -z-10"></div>

      {/* Hero Section with Team Photo */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Title Section */}
        <div className="text-center mb-12 z-10">
          <h1 className="title-text text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
            {teamInfo.title}
          </h1>
          <p className="title-text text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-2">
            {teamInfo.subtitle}
          </p>
        </div>

        {/* Large Team Photo */}
        <div className="team-photo relative max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <img 
              src={teamInfo.teamPhoto}
              alt="Team UAS NMIMS"
              className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Team info overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-semibold mb-2">Team UAS NMIMS</h3>
                <p className="text-white/80">
                  Pioneers in drone technology and innovative engineering projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Via Email Section */}
      <div ref={emailRef} className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Touch</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions about our projects or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        {/* Email Card */}
        <div className="card-minimal p-8 md:p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <EnvelopeSimple size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us Via Email</h3>
            <p className="text-white/70 mb-6">
              Reach out to us directly for inquiries, collaborations, or any questions about our work
            </p>
            <a 
              href={`mailto:${contactEmail}`}
              className="inline-block text-2xl font-semibold text-white hover:text-gray-300 transition-colors duration-300 mb-4"
            >
              {contactEmail}
            </a>
            <br />
            <a 
              href={`mailto:${contactEmail}?subject=Inquiry from Team UAS NMIMS Website`}
              className="inline-block px-8 py-4 border rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgba(80,140,210,0.25)]"
              style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10))",
                borderColor: "rgba(120,170,235,0.35)"
              }}
            >
              Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Our Support Section */}
      <div ref={supportRef} className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Support</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Proudly supported by NMIMS University in our journey of innovation and excellence
          </p>
        </div>

        {/* NMIMS Logo Section */}
        <div className="card-minimal p-8 md:p-12">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="/img/NMIMS_LOGO1.png"
                alt="NMIMS University Logo"
                className="h-24 md:h-32 mx-auto mb-6 transition-transform duration-300 hover:scale-105 rounded-2xl"
              />
              <h3 className="text-2xl font-semibold mb-4">NMIMS University</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Narsee Monjee Institute of Management Studies continues to support cutting-edge research 
                and innovation in technology and engineering solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div ref={socialsRef} className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Follow Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Journey</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Stay updated with our latest projects, achievements, and innovations
          </p>
        </div>

        {/* Social Icons Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon link-chip group relative rounded-2xl p-6 hover:scale-110 transition-all duration-300 ${social.color}`}
                aria-label={social.label}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative flex flex-col items-center">
                  <IconComponent size={32} className="mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                    {social.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
