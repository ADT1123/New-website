// components/AboutUltra.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUltra = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mult = prefersReduced ? 0.6 : 1;

    const ctx = gsap.context(() => {
      // Established badge pop
      gsap.fromTo(
        ".est-pill",
        { opacity: 0, y: 8, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 * mult, ease: "power2.out", delay: 0.1 }
      );

      // Big title reveal
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 22, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3 * mult,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-title", start: "top 80%", toggleActions: "play none none none" }
        }
      );

      // Underline fallback anim via inner element
      gsap.fromTo(
        ".accent-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2 * mult,
          ease: "power2.out",
          transformOrigin: "left",
          delay: 0.2
        }
      );

      // Paragraph lines stagger
      gsap.utils.toArray<HTMLElement>(".reveal-line .line").forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7 * mult,
          ease: "power1.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: ".reveal-line", start: "top 85%", toggleActions: "play none none none" }
        });
      });

      // Stats count-up
      document.querySelectorAll<HTMLElement>(".stat[data-target]").forEach((el, idx) => {
        const target = Number(el.dataset.target || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2 * mult,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          onUpdate: () => (el.textContent = Math.round(obj.val).toString()),
          delay: idx * 0.12
        });
      });

      // Cards lift-in
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9 * mult,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".cards-grid", start: "top 85%", toggleActions: "play none none none" }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden py-24 md:py-28 px-4 navy-bg"
      style={{ fontFamily: '"Inter","SF Pro Display",-apple-system,sans-serif' }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Established pill */}
        <div className="est-pill inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[rgba(255,140,20,0.8)] shadow-[0_0_12px_rgba(255,140,20,0.6)]"></span>
          ESTABLISHED IN 2014
        </div>

        {/* Title */}
        <h2
          className="about-title mt-6 text-4xl md:text-6xl font-extralight tracking-tight text-white"
          style={{ fontFamily: '"BankGothic Md BT",sans-serif' }}
        >
          About UAS NMIMS
          <span className="block h-[2px] w-40 mt-3 accent-line bg-gradient-to-r from-[rgba(255,140,20,0.8)] to-[rgba(255,140,20,0.1)]"></span>
        </h2>

        {/* Intro lines */}
        <div className="mt-8 md:mt-10 reveal-line">
          <p className="line text-white/85 text-lg md:text-xl leading-relaxed">
            UAS NMIMS is a student‑driven team pushing innovation in Unmanned Aerial Systems through hands‑on builds, research, and real mission engineering.
          </p>
          <p className="line text-white/70 text-base md:text-lg leading-relaxed mt-4">
            The vision is to craft autonomous platforms that navigate waypoints, analyze imagery for insights, deliver payloads reliably, and identify mission‑specific targets end‑to‑end.
          </p>
        </div>

        {/* Focus cards */}
        <div className="cards-grid grid md:grid-cols-3 gap-6 mt-12">
          <div className="about-card p-6">
            <h3 className="text-white text-lg font-semibold">Hands‑on Builds</h3>
            <p className="text-white/75 mt-2 text-sm">
              Airframes, avionics, propulsion and autonomy tightly integrated with rigorous testing loops.
            </p>
          </div>
          <div className="about-card p-6">
            <h3 className="text-white text-lg font-semibold">Applied Research</h3>
            <p className="text-white/75 mt-2 text-sm">
              Perception, guidance, mission planning and safety systems mapped to field outcomes.
            </p>
          </div>
          <div className="about-card p-6">
            <h3 className="text-white text-lg font-semibold">Real Missions</h3>
            <p className="text-white/75 mt-2 text-sm">
              Waypoints, payload ops, autonomous detection and reliable delivery workflows.
            </p>
          </div>
        </div>

        {/* Minimal stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="about-card p-5 text-center">
            <div className="stat text-3xl md:text-4xl font-semibold text-white" data-target="11">0</div>
            <div className="text-white/70 text-xs mt-1">Competitions Won</div>
          </div>
          <div className="about-card p-5 text-center">
            <div className="stat text-3xl md:text-4xl font-semibold text-white" data-target="28">0</div>
            <div className="text-white/70 text-xs mt-1">Vehicles Built</div>
          </div>
          <div className="about-card p-5 text-center">
            <div className="stat text-3xl md:text-4xl font-semibold text-white" data-target="750">0</div>
            <div className="text-white/70 text-xs mt-1">Flights Logged</div>
          </div>
          <div className="about-card p-5 text-center">
            <div className="stat text-3xl md:text-4xl font-semibold text-white" data-target="520">0</div>
            <div className="text-white/70 text-xs mt-1">Flight Hours</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUltra;
