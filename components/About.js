"use client";
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useState, useEffect, useRef } from 'react';

/* ---------- small hook: fires once when element scrolls into view ---------- */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // only animate in once
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function About() {
  const LAB_VIDEOS = [
    { video: 'Advanced_labs', title: 'Advanced Labs', desc: 'Cutting-edge infrastructure for innovation' },
    { video: 'Embedded_systems_lab', title: 'Embedded Systems Lab', desc: 'Hardware development and debugging' },
    { video: 'Iot_lab', title: 'IoT Lab', desc: 'Connected devices and sensors' },
    { video: 'AI_Lab', title: 'AI Lab', desc: 'Machine learning and AI solutions' },
    { video: 'Quantum_lab', title: 'Quantum Lab', desc: 'Quantum computing research' }
  ];

  const IconChip = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 34} height={p.size || 34} fill="none" stroke={p.color || colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
  const IconBot = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 34} height={p.size || 34} fill="none" stroke={p.color || colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="14" height="12" rx="2" /><circle cx="9.5" cy="12.5" r="1.2" /><circle cx="14.5" cy="12.5" r="1.2" /><path d="M12 7V4M9 3h6" />
    </svg>
  );
  const IconBroadcast = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 34} height={p.size || 34} fill="none" stroke={p.color || colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.6" /><path d="M4 12c0-3 3.5-5 8-5s8 2 8 5-3.5 5-8 5-8-2-8-5z" /><path d="M12 4c2 2.5 2 13.5 0 16" />
    </svg>
  );
  const IconAtom = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 34} height={p.size || 34} fill="none" stroke={p.color || colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9" ry="3.5" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </svg>
  );
  const IconLayers = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 34} height={p.size || 34} fill="none" stroke={p.color || colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="8" height="8" rx="1.3" /><rect x="13" y="4" width="8" height="8" rx="1.3" /><rect x="3" y="14" width="8" height="8" rx="1.3" /><rect x="13" y="14" width="8" height="8" rx="1.3" />
    </svg>
  );
  const IconBuilding = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 26} height={p.size || 26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M9 12h.01M15 12h.01M9 8h.01M15 8h.01" />
    </svg>
  );
  const IconUsers = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 26} height={p.size || 26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path d="M17 8.2a3 3 0 010 5.8M20.5 20c-.2-2.6-1.4-4.3-3-5.2" />
    </svg>
  );
  const IconGrid = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 26} height={p.size || 26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="7" rx="1.2" /><rect x="13" y="4" width="7" height="7" rx="1.2" /><rect x="4" y="13" width="7" height="7" rx="1.2" /><rect x="13" y="13" width="7" height="7" rx="1.2" />
    </svg>
  );
  const IconBadge = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M8 13l-2 8 6-3 6 3-2-8" /></svg>
  );
  const IconGridSmall = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.3" /><rect x="13" y="3" width="8" height="8" rx="1.3" /><rect x="3" y="13" width="8" height="8" rx="1.3" /><rect x="13" y="13" width="8" height="8" rx="1.3" /></svg>
  );
  const IconTrend = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 8-9" /><path d="M15 7h5v5" /></svg>
  );
  const IconSpark = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></svg>
  );
  const IconChat = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h13a3 3 0 013 3v7a3 3 0 01-3 3H9l-5 4v-4a3 3 0 01-3-3V7a3 3 0 013-3z" /></svg>
  );
  const IconGlobe = () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>
  );
  const IconDiamond = ({ color = colors.gold, size = 16 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" />
    </svg>
  );
  const IconArrow = () => (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
  const IconCheckCircle = (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 30} height={p.size || 30} fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>
  );
  const IconMission = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 6.5L21 9l-5 4.5 1.5 7L12 17l-5.5 3.5L8 13.5 3 9l6.5-.5z" /></svg>
  );
  const IconVision = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={colors.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
  );

  /* ---------------- video carousel: crossfade instead of remount ---------------- */
  const [labIndex, setLabIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLabIndex(i => (i + 1) % LAB_VIDEOS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const techCards = [
    { title: 'Embedded Systems', icon: <IconChip /> },
    { title: 'Agentic AI', icon: <IconBot /> },
    { title: 'Internet of Things', icon: <IconBroadcast /> },
    { title: 'Quantum Computing', icon: <IconAtom /> },
    { title: 'VLSI Design', icon: <IconLayers /> }
  ];
  const whyCards = [
    { icon: <IconBadge />, title: 'Industry Expertise', desc: 'Seasoned professionals from leading tech companies.' },
    { icon: <IconGridSmall />, title: 'Comprehensive Solutions', desc: 'End-to-end services covering every stage of the build.' },
    { icon: <IconTrend />, title: 'Proven Track Record', desc: '20+ institutions, 1,000+ students trained.' },
    { icon: <IconSpark />, title: 'Continuous Innovation', desc: 'Always ahead of emerging technology trends.' },
    { icon: <IconChat />, title: 'Personalized Support', desc: "Tailored solutions for each institution's goals." },
    { icon: <IconGlobe />, title: 'Global Standards', desc: 'Aligned with international best practices.' }
  ];

  /* scroll-triggered reveal refs, one per section */
  const [heroRef, heroIn] = useInView(0.15);
  const [techRef, techIn] = useInView(0.2);
  const [whyRef, whyIn] = useInView(0.2);

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div data-screen-label="About">

        {/* ---------------- HERO ---------------- */}
        <section ref={heroRef} className="cw-section" style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '40px 32px 32px' }}>
          <FxLayer
            orbs={[{ size: 360, color: 'rgba(212,165,55,0.14)', top: -100, right: -80 }, { size: 280, color: 'rgba(70,120,190,0.11)', bottom: -100, left: -60, anim: 'floatSlow2', duration: '14s' }]}
            circuit={{ paths: [{ d: 'M0 560 L220 560 L280 460 L520 460 L580 340 L900 340 L960 220 L1200 220', stroke: colors.navy, opacity: 0.14 }], nodes: [{ cx: 280, cy: 460, fill: colors.gold }, { cx: 960, cy: 220, fill: colors.blue, delay: '0.8s' }] }}
            particles={[{ size: 5, color: colors.gold, left: '6%', bottom: '8%', delay: '0.4s' }, { size: 4, color: colors.blue, left: '18%', bottom: '20%', delay: '2.2s' }]}
          />
          <div className="cw-hero-grid" style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1, gap: 72, alignItems: 'center' }}>
            <div>
              <h1 className={`cw-reveal-item${heroIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(32px,4.5vw,48px)', lineHeight: 1.12, color: colors.navy, margin: '0 0 26px' }}>
                Empowering Innovation
              </h1>
              <p className={`cw-reveal-item${heroIn ? ' visible' : ''}`} style={{ ['--d']: '120ms', fontSize: 17, lineHeight: 1.7, color: colors.body, margin: '0 0 36px' }}>
                We accelerate prototyping, experimentation, and deployment through advanced lab solutions and expertise spanning Agentic AI, Embedded Systems, IoT, Quantum Computing, and VLSI Design.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className={`cw-reveal-item cw-hover-tilt${heroIn ? ' visible' : ''}`} style={{ ['--d']: '240ms', padding: '22px 24px', borderRadius: 10, background: colors.bgLight, borderLeft: `3px solid ${colors.gold}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <IconMission /><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: colors.navy, margin: 0 }}>Mission</h3>
                  </div>
                  <p style={{ color: colors.body, margin: 0, fontSize: 15, lineHeight: 1.6 }}>Enable research and innovation by delivering state-of-the-art technology platforms and expertise.</p>
                </div>
                <div className={`cw-reveal-item cw-hover-tilt${heroIn ? ' visible' : ''}`} style={{ ['--d']: '360ms', padding: '22px 24px', borderRadius: 10, background: colors.bgLight, borderLeft: `3px solid ${colors.navy}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <IconVision /><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: colors.navy, margin: 0 }}>Vision</h3>
                  </div>
                  <p style={{ color: colors.body, margin: 0, fontSize: 15, lineHeight: 1.6 }}>Be the catalyst for technological transformation in education and industry globally.</p>
                </div>
              </div>
            </div>

            <div>
              <div
                className="cw-img-zoom cw-video-stage"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  background: colors.navy /* fallback so it never reads as blank if a video fails to load */
                }}
              >
                {LAB_VIDEOS.map((lv, i) => (
                  <video
                    key={lv.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="cw-crossfade-video"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: i === labIndex ? 1 : 0,
                      zIndex: i === labIndex ? 1 : 0
                    }}
                  >
                    <source src={`/${lv.video}.mp4`} type="video/mp4" />
                  </video>
                ))}
                <div className="cw-video-caption" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 26px', background: 'rgba(0,0,0,0.55)', zIndex: 2 }}>
                  <h3 style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{LAB_VIDEOS[labIndex].title}</h3>
                  <p style={{ color: '#C7D0DE', margin: 0, fontSize: 14 }}>{LAB_VIDEOS[labIndex].desc}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 9, marginTop: 14 }}>
                {LAB_VIDEOS.map((_, i) => (
                  <button key={i} onClick={() => setLabIndex(i)} className="cw-dot-anim" style={{
                    width: i === labIndex ? 18 : 11, height: 11, borderRadius: 99, border: 'none',
                    background: i === labIndex ? colors.gold : '#DDE2E9', cursor: 'pointer'
                  }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- TECH EXPERTISE ---------------- */}
        <section ref={techRef} className="cw-section" style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '32px 32px' }}>
          <FxLayer
            orbs={[{ size: 300, color: 'rgba(212,165,55,0.13)', top: -90, left: '20%', anim: 'floatSlow2', duration: '13s' }]}
            circuit={{ paths: [{ d: 'M0 100 L250 100 L300 220 L650 220 L700 80 L1200 80', stroke: colors.navy, opacity: 0.12 }], nodes: [{ cx: 300, cy: 220, fill: colors.gold, delay: '0.3s' }] }}
          />
          <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 className={`cw-reveal-item${techIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 34, fontWeight: 700, color: colors.navy, margin: '0 0 52px' }}>Our Technology Expertise</h2>
            <div className="cw-tech-grid" style={{ gap: 20 }}>
              {techCards.map((t, i) => (
                <div
                  key={i}
                  className={`cw-wave-item cw-hover-lift cw-hover-lift-dark${techIn ? ' visible' : ''}`}
                  style={{ ['--d']: `${i * 130}ms`, background: colors.navy, border: '1px solid rgba(212,165,55,0.3)', borderRadius: 14, padding: '30px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
                >
                  <span className="cw-icon-pop">{t.icon}</span>
                  <h3 style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontSize: 15.5, fontWeight: 600, margin: 0 }}>{t.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- WHY PARTNER ---------------- */}
        <section ref={whyRef} className="cw-section" style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '32px 32px' }}>
          <FxLayer
            orbs={[{ size: 340, color: 'rgba(70,120,190,0.12)', bottom: -100, right: '10%' }]}
            circuit={{ paths: [{ d: 'M1200 400 L950 400 L900 280 L580 280 L530 420 L0 420', stroke: colors.navy, opacity: 0.12, dash: '6 12' }], nodes: [{ cx: 900, cy: 280, fill: colors.blue, delay: '0.7s' }] }}
          />
          <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 className={`cw-reveal-item${whyIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 34, fontWeight: 700, color: colors.navy, margin: '0 0 52px' }}>Why Partner With Us</h2>
            <div className="cw-why-grid" style={{ gap: 22 }}>
              {whyCards.map((w, i) => (
                <div
                  key={i}
                  className={`cw-wave-item cw-hover-lift cw-hover-lift-dark${whyIn ? ' visible' : ''}`}
                  style={{ ['--d']: `${i * 130}ms`, padding: 30, borderRadius: 12, background: colors.navy, border: '1px solid rgba(212,165,55,0.18)' }}
                >
                  <div className="cw-icon-pop" style={{ marginBottom: 16 }}>{w.icon}</div>
                  <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 8px' }}>{w.title}</h3>
                  <p style={{ color: '#A9B5C6', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* ---------- responsive grids ---------- */
        .cw-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .cw-tech-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }
        .cw-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .cw-video-stage {
          height: 420px;
          min-height: 420px;
        }

        @media (max-width: 860px) {
          .cw-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .cw-video-stage {
            height: 280px !important;
            min-height: 280px !important;
          }
          .cw-tech-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .cw-why-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .cw-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .cw-tech-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ---------- simple fade-up reveal (hero text) ---------- */
        .cw-reveal-item {
          opacity: 0 !important;
          transform: translateY(28px) !important;
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: var(--d, 0ms);
        }
        .cw-reveal-item.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* ---------- wave-style staggered pop for card grids ---------- */
        .cw-wave-item {
          opacity: 0 !important;
          transform: translateY(46px) scale(0.9) !important;
          transition: opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: var(--d, 0ms);
          will-change: transform, opacity;
        }
        .cw-wave-item.visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          animation: cw-wave-bob 2.6s ease-in-out 1;
          animation-delay: var(--d, 0ms);
        }
        @keyframes cw-wave-bob {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-10px) scale(1.02); }
          55% { transform: translateY(4px) scale(0.99); }
          100% { transform: translateY(0) scale(1); }
        }

        /* ---------- hover effects (namespaced + !important so nothing global can silently win) ---------- */
        .cw-hover-tilt {
          transition: transform 0.35s ease, box-shadow 0.35s ease !important;
        }
        .cw-hover-tilt:hover {
          transform: translateY(-4px) rotateX(2deg) !important;
          box-shadow: 0 12px 28px rgba(20, 30, 60, 0.12) !important;
        }

        .cw-hover-lift {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease !important;
        }
        .cw-hover-lift:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35) !important;
        }
        .cw-hover-lift-dark:hover {
          border-color: rgba(212, 165, 55, 0.75) !important;
        }

        .cw-icon-pop {
          display: inline-flex;
          transition: transform 0.35s ease !important;
        }
        .cw-hover-lift:hover .cw-icon-pop {
          transform: scale(1.15) rotate(-4deg) !important;
        }

        .cw-dot-anim {
          transition: width 0.35s ease, background 0.35s ease, transform 0.2s ease !important;
        }
        .cw-dot-anim:hover {
          transform: scale(1.2) !important;
        }

        .cw-img-zoom {
          overflow: hidden !important;
        }
        .cw-img-zoom:hover .cw-crossfade-video {
          transform: scale(1.04) !important;
        }

        /* ---------- video crossfade ---------- */
        .cw-crossfade-video {
          transition: opacity 1s ease-in-out !important;
        }
        .cw-video-caption {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  );
}