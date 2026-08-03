"use client";
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/* ---------- small hook: fires once when element scrolls into view ---------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const BLOG_TOPICS = [
  { image: '/blog-agentic-ai.png', topic: 'Agentic AI', title: 'The Rise of Autonomous AI Agents', desc: 'How self-directed agents are reshaping automation and decision-making.' },
  { image: '/blog-embedded-systems.png', topic: 'Embedded Systems', title: 'Designing for the Edge', desc: 'Best practices for building reliable, real-time embedded hardware.' },
  { image: '/blog-iot.png', topic: 'Internet of Things', title: 'Connecting Everything at Scale', desc: 'Architecture patterns for reliable IoT deployments across industries.' },
  { image: '/blog-vlsi.png', topic: 'VLSI Design', title: 'Inside Modern Chip Design', desc: 'How VLSI innovation is powering the next generation of hardware.' },
  { image: '/blog-quantum.png', topic: 'Quantum Computing', title: "Quantum Computing: What's Next", desc: 'A look at where quantum research is headed and why it matters.' },
  { image: '/blog-industry-trends.png', topic: 'Industry Trends', title: 'Tech Trends Shaping Innovation', desc: "A roundup of the shifts driving today's technology landscape." }
];

export default function insight() {
  const [sectionRef, sectionIn] = useInView(0.1);

  return (
    <div data-screen-label="Insights">
      <section ref={sectionRef} className="cw-insights-section" style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '32px 32px 100px', minHeight: '100vh' }}>
        <FxLayer
          orbs={[{ size: 340, color: 'rgba(70,120,190,0.13)', top: -100, left: -80, anim: 'floatSlow2', duration: '14s' }, { size: 260, color: 'rgba(212,165,55,0.12)', bottom: -80, right: -60 }]}
          circuit={{ paths: [{ d: 'M0 200 L200 200 L250 300 L500 300 L550 150 L850 150 L900 260 L1200 260', stroke: colors.navy, opacity: 0.14 }], nodes: [{ cx: 250, cy: 300, fill: colors.blue }, { cx: 900, cy: 260, fill: colors.gold, delay: '0.6s' }] }}
          particles={[{ size: 5, color: colors.gold, left: '10%', bottom: '10%', delay: '0.6s' }, { size: 4, color: colors.blue, left: '88%', bottom: '18%', delay: '2.5s' }]}
        />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className={`cw-reveal-item${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 'clamp(28px,4.5vw,38px)', fontWeight: 700, color: colors.navy, margin: '0 0 14px' }}>
            Insights &amp; Articles
          </h1>
          <p className={`cw-reveal-item${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '80ms', textAlign: 'center', color: '#6C7C97', fontSize: 17, margin: '0 0 60px' }}>
            Stay updated with the latest technology insights and industry trends
          </p>

          <div className="cw-insights-grid" style={{ gap: 26 }}>
            {BLOG_TOPICS.map((b, i) => (
              <div
                key={i}
                className={`cw-wave-item cw-hover-lift${sectionIn ? ' visible' : ''}`}
                style={{ ['--d']: `${160 + i * 110}ms`, background: '#fff', borderRadius: 14, overflow: 'hidden', border: `1px solid ${colors.border}` }}
              >
                <div className="cw-img-zoom" style={{ height: 170, overflow: 'hidden' }}>
                  <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: '#F7F2E4', color: '#B8862A', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>{b.topic}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: colors.navy, margin: '0 0 10px' }}>{b.title}</h3>
                  <p style={{ color: '#6C7C97', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{b.desc}</p>
                  <span className="cw-link-anim" style={{ color: colors.gold, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .cw-insights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 900px) {
          .cw-insights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .cw-insights-grid {
            grid-template-columns: 1fr !important;
          }
          .cw-insights-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
            padding-bottom: 64px !important;
          }
        }

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

        .cw-wave-item {
          opacity: 0 !important;
          transform: translateY(40px) scale(0.94) !important;
          transition: opacity 0.55s cubic-bezier(0.34,1.56,0.64,1), transform 0.55s cubic-bezier(0.34,1.56,0.64,1);
          transition-delay: var(--d, 0ms);
        }
        .cw-wave-item.visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }

        .cw-hover-lift {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease !important;
        }
        .cw-hover-lift:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 18px 34px rgba(15,40,71,0.14) !important;
        }

        .cw-img-zoom {
          overflow: hidden !important;
        }
        .cw-img-zoom img {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1) !important;
        }
        .cw-hover-lift:hover .cw-img-zoom img {
          transform: scale(1.08) !important;
        }

        .cw-link-anim {
          transition: gap 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s ease !important;
        }
        .cw-link-anim:hover {
          gap: 11px !important;
          color: #B8862A !important;
        }
      `}</style>
    </div>
  );
}