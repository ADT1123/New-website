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
  DiscordLogo
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
      href: 'https://linkedin.com/company/teamuas-nmims', 
      label: 'LinkedIn',
      color: 'hover:text-white hover:bg-blue-600'
    },
    { 
      icon: TwitterLogo, 
      href: 'https://twitter.com/teamuas_nmims', 
      label: 'Twitter',
      color: 'hover:text-white hover:bg-blue-400'
    },
    { 
      icon: InstagramLogo, 
      href: 'https://instagram.com/teamuas_nmims', 
      label: 'Instagram',
      color: 'hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
    },
    { 
      icon: YoutubeLogo, 
      href: 'https://youtube.com/@teamuas-nmims', 
      label: 'YouTube',
      color: 'hover:text-white hover:bg-red-600'
    },
  ];

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with pre-filled content
    const subject = encodeURIComponent("Inquiry from Team UAS NMIMS Website");
    const body = encodeURIComponent(`Hello Team UAS NMIMS,\n\n${message}\n\nBest regards,\n${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    
    // Reset form
    setEmail('');
    setMessage('');
  };

  return (
    <section 
      ref={sectionRef}
       style={{ backgroundColor: '#0f0f0f' }}
      id="contact"
    >
      {/* Hero Section with Team Photo */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/[0.02] rounded-full blur-3xl top-[10%] left-[5%]"></div>
          <div className="absolute w-64 h-64 bg-white/[0.015] rounded-full blur-2xl bottom-[20%] right-[10%]"></div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12 z-10">
          <h1 className="title-text text-5xl md:text-7xl font-bold mb-4">
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

        {/* Simple Email Contact */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-white/8 transition-all duration-500">
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
              className="inline-block px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
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
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-white/8 transition-all duration-500">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="/img/NMIMS_LOGO1.png" // Replace with actual NMIMS logo path
                alt="NMIMS University Logo"
                className="h-20 md:h-24 mx-auto mb-6 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mb-4">NMIMS University</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Narsee Monjee Institute of Management Studies continues to support cutting-edge research 
                and innovation in technology, healthcare, and engineering solutions.
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-110 transition-all duration-300 ${social.color}`}
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
