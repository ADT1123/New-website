import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, Gear, Timer, Package } from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Replace these arrays with actual data
  const researchProjects = [
    {
      id: 1,
      title: "PLSLM",
      description:
        "Precision Location Soft Landing Mechanism: Used for Precision Landing irrespective of the surface protecting Drone as well as payload",
      image: "/img/Hexa1.jpg",
      category: "Research",
    },
    {
      id: 2,
      title: "VTOL",
      description:
        "Many Industries are shifting towards VTOL because of its speed like aircraft and hovering capacity to that of multirotor providing benefits of both.",
      image: "/img/VTOL1.png",
      category: "Research",
    },
    {
      id: 3,
      title: "Swarm",
      description:
        "Interactive and collective behaviour of drones has the ability to cover large areas for surveillance, dowsing forest fires, rescue operation.",
      image: "/img/SWARM.jpg",
      category: "Research",
    },
  ];

  // Systems Data
  const systems = [
    {
      id: 4,
      title: "Black Peafowl",
      description:
        "Peafowl is capable of fully autonomous flight, object detection and payload delivery with high endurance flight upto 45 mins",
      image: "/img/Hexa.jpg",
      category: "System",
      learnMoreUrl:
        "https://drive.google.com/open?id=1sU2-ivuG49dHb8_QbWLeHOfReVDFhuUs",
    },
    {
      id: 5,
      title: "MTD",
      description:
        "MTD is basic fixed wing designed to carry payload upto 3kgs and click high quality images with endurance upto 30 mins",
      image: "/img/MTD.jpg",
      category: "System",
      learnMoreUrl:
        "https://drive.google.com/open?id=1o_yZYhDHwxwdOPTK9AyDE-TnO9Af5hDj",
    },
    {
      id: 6,
      title: "UGV",
      description:
        "It is Unmanned Grounded Vehicle used to autonomously perform payload delivery wherever Aerial Systems can't reach",
      image: "/img/UGV.jpg",
      category: "System",
      learnMoreUrl:
        "https://drive.google.com/open?id=1PdfsITLalp7NEdLJIPB1cMG7GweHn0uN",
    },
  ];

  // Vehicles Data
  const vehicles = [
    {
      id: 7,
      title: "Hex",
      description:
        "Advanced multi-rotor platform for heavy payload delivery and surveillance missions",
      image: "/img/HEX1.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "5.2 kg",
        flightTime: "35 minutes",
        maxSpeed: "65 km/h",
        features: [
          "GPS Navigation",
          "Obstacle Avoidance",
          "Auto Return",
          "Real-time Telemetry",
        ],
      },
    },
    {
      id: 8,
      title: "Pawan",
      description:
        "Long-range surveillance and mapping drone with extended flight capabilities",
      image: "/img/Pawan.png",
      category: "Vehicle",
      specs: {
        maxPayload: "2.8 kg",
        flightTime: "120 minutes",
        maxSpeed: "95 km/h",
        features: [
          "Auto Takeoff/Landing",
          "Waypoint Navigation",
          "Live Video Stream",
          "Weather Resistant",
        ],
      },
    },
    {
      id: 9,
      title: "Priya",
      description:
        "Fast Versatile for aerial photography and precision applications",
      image: "/img/Priya.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "3.5 kg",
        flightTime: "42 minutes",
        maxSpeed: "58 km/h",
        features: [
          "4K Camera Gimbal",
          "Precision Spraying",
          "Crop Monitoring",
          "AI Object Detection",
        ],
      },
    },
    {
      id: 10,
      title: "Ground Rover Alpha",
      description:
        "All-terrain autonomous ground vehicle for last-mile delivery and inspection tasks",
      image: "/img/UGV.jpg",
      category: "Vehicle",
      specs: {
        maxPayload: "15 kg",
        flightTime: "8 hours",
        maxSpeed: "25 km/h",
        features: [
          "All-Terrain Mobility",
          "Remote Operation",
          "Modular Payload",
          "Night Vision",
        ],
      },
    },
  ];

  useEffect(() => {
    // Inject global navy background + component styles locally
    const style = document.createElement("style");
    style.textContent = `
      /* Deep navy background with subtle animated sheen (scoped here for Projects) */
      .navy-bg {
        position: relative;
        overflow: hidden;
        background: radial-gradient(1200px circle at 20% 10%, #000000 0%, #070d18 35%, #000000 60%, #0d1423 100%);
      }
      .navy-bg::before {
        content: "";
        position: absolute;
        inset: -20%;
        background:
          radial-gradient(600px 600px at 70% 20%, rgba(10, 11, 13, 0.1), transparent 60%),
          radial-gradient(520px 520px at 25% 75%, rgba(8, 11, 16, 0.1), transparent 60%);
        filter: blur(30px);
        animation: drift 14s ease-in-out infinite alternate;
        pointer-events: none;
      }
      @keyframes drift {
        0%   { transform: translate3d(-1%, -2%, 0); opacity: 0.75; }
        100% { transform: translate3d(1%, 2%, 0); opacity: 0.95; }
      }

      /* Card and orb styles (NAVY PALETTE) */
      .minimal-card {
        background: rgba(20,23,30,0.80);
        border-radius: 1.3rem;
        border: 1.5px solid rgba(32, 93, 170, 0.20);
        box-shadow: 0 6px 38px 2px rgba(32,93,170,0.10), 0 1px 7px rgba(0,0,0,0.12);
        transition: box-shadow 0.25s, border-color 0.25s, transform 0.32s cubic-bezier(.2,.7,.1,1.1);
        backdrop-filter: blur(6px) saturate(125%);
        -webkit-backdrop-filter: blur(6px) saturate(125%);
        overflow: hidden;
        position: relative;
        perspective: 700px;
      }
      .minimal-card img {
        border-radius: 1.3rem 1.3rem 0 0;
        transition: transform 0.5s;
        will-change: transform;
      }
      .minimal-card:hover {
        border-color: rgba(32, 93, 170, 0.35);
        box-shadow: 0 10px 45px 3px rgba(32,93,170,0.18), 0 4px 22px rgba(80,140,210,0.10);
        transform: scale(1.025);
      }
      .minimal-card:hover img { transform: scale(1.04); }
      .minimal-card-glow {
        pointer-events: none;
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        border-radius: inherit;
        opacity: 0.45;
        background: radial-gradient(circle at var(--x,50%) var(--y,40%), rgba(80,140,210,0.22), transparent 63%);
        z-index: 3;
        mix-blend-mode: screen;
        filter: blur(12px) saturate(2.1);
      }
      .vehicle-info-expand {
        position: absolute;
        inset: 0 0 0 0;
        background: linear-gradient( to top, rgba(10,12,18,0.97) 88%, rgba(80,140,210,0.10) 100% );
        backdrop-filter: blur(6px) saturate(180%);
        -webkit-backdrop-filter: blur(6px) saturate(180%);
        z-index: 6;
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.42s cubic-bezier(.2,.8,.2,1), opacity 0.28s ease;
        border-radius: 0 0 1.3rem 1.3rem;
        pointer-events: none;
        display: flex; flex-direction: column;
        will-change: transform, opacity;
      }
      .minimal-card:hover .vehicle-info-expand,
      .minimal-card:focus .vehicle-info-expand {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .minimal-card[data-open="true"] .vehicle-info-expand {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
      .vehicle-info-expand-content { padding: 1.4rem 1.1rem 1.2rem 1.1rem; color: #fff; }
      .vehicle-specs-group { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0.72rem; }
      .vehicle-spec-box {
        background: rgba(255,255,255,0.06);
        border-radius:8px; padding: 0.42rem 0.7rem; font-size:0.93rem;
        border:1px solid rgba(80,140,210,0.16); color:#fff; margin-bottom:4px;
      }
      .vehicle-feature-chip {
        display:inline-block; background:rgba(80,140,210,0.12);
        color:#fff; font-weight:400; border-radius:8px; font-size:0.8rem;
        margin:0 6px 7px 0; padding:3.5px 11px 2.5px 11px; border:1px solid rgba(80,140,210,0.22);
      }
      .system-learn-btn {
        opacity:0; pointer-events:none; transition:opacity 0.35s;
        position:absolute; left:0; top:0; width:100%; height:100%; display:flex; align-items:center;justify-content:center;z-index:6;
      }
      .minimal-card:hover .system-learn-btn,
      .minimal-card:focus .system-learn-btn {
        opacity:1; pointer-events:auto;
      }

      /* Top scrim for text readability over images */
      .card-image-wrap { position: relative; }
      .card-top-scrim {
        position:absolute; inset:0;
        background:linear-gradient(to top, rgba(0,8,20,0.42) 18%, rgba(0,8,20,0.22) 46%, transparent 70%);
        opacity:0; transition:opacity .35s ease;
      }
      .minimal-card:hover .card-top-scrim, .minimal-card:focus .card-top-scrim { opacity:.95; }
    `;
    document.head.appendChild(style);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const animationMultiplier = prefersReducedMotion ? 0.5 : 1;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 26, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1 * animationMultiplier,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current!,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards entrance
      gsap.fromTo(
        ".minimal-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7 * animationMultiplier,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtle parallax on grids
      gsap.to(".cards-container", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, sectionRef);

    // INTERACTIVE BG ORBS (NAVY)
    if (!prefersReducedMotion) {
      const bg = document.getElementById("bg-orb-gradient");
      if (bg) {
        const orbCount = 4;
        const orbs: HTMLDivElement[] = [];
        for (let i = 0; i < orbCount; i++) {
          const orb = document.createElement("div");
          orb.style.position = "absolute";
          orb.style.width = `${260 + Math.random() * 155}px`;
          orb.style.height = orb.style.width;
          orb.style.borderRadius = "50%";
          orb.style.left = `${Math.random() * 85}%`;
          orb.style.top = `${Math.random() * 80}%`;
          orb.style.pointerEvents = "none";
          orb.style.opacity = "0.66";
          orb.style.mixBlendMode = "screen";
          orb.style.background = [
            "radial-gradient(circle, rgba(80,140,210,0.26) 0%, transparent 80%)",
            "radial-gradient(circle, rgba(120,170,235,0.18) 0%, transparent 75%)",
            "radial-gradient(circle, rgba(50,100,185,0.22) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(32,93,170,0.16) 0%, transparent 85%)",
          ][i % 4];
          bg.appendChild(orb);
          orbs.push(orb);

          gsap.to(orb, {
            x: () => Math.random() * 100 - 50,
            y: () => Math.random() * 80 - 40,
            duration: 18 + Math.random() * 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 7,
          });
        }
        // mouse-follow orb
        const mouseOrb = document.createElement("div");
        mouseOrb.style.position = "absolute";
        mouseOrb.style.width = "220px";
        mouseOrb.style.height = "220px";
        mouseOrb.style.borderRadius = "50%";
        mouseOrb.style.pointerEvents = "none";
        mouseOrb.style.background =
          "radial-gradient(circle,rgba(120,170,235,0.28) 6%,rgba(80,140,210,0.20) 45%,transparent 90%)";
        mouseOrb.style.mixBlendMode = "screen";
        mouseOrb.style.filter = "blur(12px)";
        mouseOrb.style.opacity = "0.68";
        bg.appendChild(mouseOrb);

        let last = 0;
        function updateMouseOrb(e: MouseEvent | { clientX: number; clientY: number }) {
          const now = performance.now();
          if (now - last < 16) return;
          last = now;
          const rect = bg.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          mouseOrb.style.left = `calc(${x}% - 110px)`;
          mouseOrb.style.top = `calc(${y}% - 110px)`;
        }
        bg.addEventListener("mousemove", updateMouseOrb);
        bg.addEventListener("touchmove", (evt) => {
          if (evt.touches?.length) {
            updateMouseOrb({
              clientX: evt.touches[0].clientX,
              clientY: evt.touches[0].clientY,
            } as MouseEvent);
          }
        });
        mouseOrb.style.left = "50%";
        mouseOrb.style.top = "50%";

        return () => {
          orbs.forEach((orb) => bg.removeChild(orb));
          bg.removeChild(mouseOrb);
        };
      }
    }

    return () => {
      ctx.revert();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  // Card glow effect: track pointer and set CSS vars
  function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  }

  // Touch toggle for vehicle info panel
  function handleCardTap(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget as HTMLDivElement;
    const opened = card.getAttribute("data-open") === "true";
    card.setAttribute("data-open", opened ? "false" : "true");
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 px-4 relative overflow-hidden navy-bg"
      id="projects"
      style={{
        fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
        // removed inline background to use the navy gradient injected above
      }}
    >
      {/* Animated Background (sits above gradient, below content) */}
      <div
        id="bg-orb-gradient"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-extralight text-white mb-2 tracking-tight"
            style={{ fontFamily: '"Poppins", "Inter", sans-serif' }}
          >
            Our{" "}
            <span className="font-light bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Research & Systems
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Platforms, payloads, autonomy — engineered for missions.
          </p>
          <div
            className="w-24 h-px mx-auto mt-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(120,170,235,0.7), transparent)",
            }}
          ></div>
        </div>

        {/* Vehicles Section */}
        <div className="mb-32">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Our Vehicles
          </h3>
          <div className="cards-container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="minimal-card group relative cursor-pointer"
                tabIndex={0}
                aria-label={`${vehicle.title} specifications`}
                onMouseMove={handleCardMouseMove}
                onClick={handleCardTap}
                style={{ minHeight: "20rem", transition: "min-height 0.4s" }}
              >
                <span
                  className="minimal-card-glow"
                  style={{ "--x": "50%", "--y": "40%" } as any}
                />
                <div className="card-image-wrap relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="card-top-scrim" />
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="text-lg font-medium text-white">
                    {vehicle.title}
                  </h4>
                  <p className="text-white/80 text-sm font-light leading-relaxed">
                    {vehicle.description}
                  </p>
                  <div className="inline-block px-3 py-1 text-xs bg-white/15 text-white/90 rounded-full border border-white/25 font-medium">
                    {vehicle.category}
                  </div>
                </div>
                {/* Interactive details expand on hover/focus/tap */}
                <div className="vehicle-info-expand">
                  <div className="vehicle-info-expand-content">
                    <div className="vehicle-specs-group">
                      <div className="vehicle-spec-box">
                        <Package
                          size={13}
                          style={{ marginRight: "4px", marginBottom: "-2px" }}
                        />
                        Payload{" "}
                        <b style={{ float: "right" }}>
                          {vehicle.specs.maxPayload}
                        </b>
                      </div>
                      <div className="vehicle-spec-box">
                        <Timer
                          size={13}
                          style={{ marginRight: "4px", marginBottom: "-2px" }}
                        />
                        Flight{" "}
                        <b style={{ float: "right" }}>
                          {vehicle.specs.flightTime}
                        </b>
                      </div>
                      <div
                        className="vehicle-spec-box"
                        style={{ gridColumn: "span 2" }}
                      >
                        Max Speed{" "}
                        <b style={{ float: "right" }}>
                          {vehicle.specs.maxSpeed}
                        </b>
                      </div>
                    </div>
                    <div style={{ marginBottom: ".5rem", color: "#4F86C6" }}>
                      Key Features:
                    </div>
                    <div style={{ marginBottom: "-.2rem" }}>
                      {vehicle.specs.features.map((f, i) => (
                        <span className="vehicle-feature-chip" key={i}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Section */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Research Projects
          </h3>
          <div className="cards-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {researchProjects.map((project) => (
              <div
                key={project.id}
                className="minimal-card group relative cursor-pointer"
                tabIndex={0}
                onMouseMove={handleCardMouseMove}
              >
                <span
                  className="minimal-card-glow"
                  style={{ "--x": "50%", "--y": "40%" } as any}
                />
                <div className="card-image-wrap relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                  <div className="card-top-scrim" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm font-light">
                    {project.description}
                  </p>
                  <div className="inline-block px-3 py-1 text-xs bg-white/12 text-white/90 rounded-full border border-white/25 font-medium">
                    {project.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systems Section */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-12 text-center tracking-wide">
            Our Systems
          </h3>
          <div className="cards-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <div
                key={system.id}
                className="minimal-card group relative cursor-pointer"
                tabIndex={0}
                onMouseMove={handleCardMouseMove}
                title={system.title}
                style={{ minHeight: "19rem" }}
              >
                <span
                  className="minimal-card-glow"
                  style={{ "--x": "50%", "--y": "40%" } as any}
                />
                <div className="card-image-wrap relative overflow-hidden">
                  <img
                    src={system.image}
                    alt={system.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                  <div className="card-top-scrim" />
                  {/* System Learn Button */}
                  <div className="system-learn-btn">
                    <a
                      href={system.learnMoreUrl}
                      tabIndex={-1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-[rgba(40,80,160,0.55)] hover:bg-[rgba(40,80,160,0.75)] backdrop-blur-md border border-white/40 text-white font-medium"
                      >
                        <ArrowSquareOut size={16} className="mr-2" />
                        Learn More
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-medium text-white group-hover:text-white transition-colors duration-300">
                    {system.title}
                  </h4>
                  <p className="text-white/80 leading-relaxed text-sm font-light">
                    {system.description}
                  </p>
                  <div className="inline-block px-3 py-1 text-xs bg-white/12 text-white/90 rounded-full border border-white/25 font-medium">
                    {system.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
