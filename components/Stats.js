"use client";

import { useState, useEffect, useRef } from 'react';
import { colors } from './colors';
import FxLayer from './FxLayer';

const IconBuilding = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||26} height={p.size||26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M9 12h.01M15 12h.01M9 8h.01M15 8h.01" />
  </svg>
);
const IconUsers = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||26} height={p.size||26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path d="M17 8.2a3 3 0 010 5.8M20.5 20c-.2-2.6-1.4-4.3-3-5.2" />
  </svg>
);
const IconGrid = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||26} height={p.size||26} fill="none" stroke={colors.gold} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="7" height="7" rx="1.2" /><rect x="13" y="4" width="7" height="7" rx="1.2" /><rect x="4" y="13" width="7" height="7" rx="1.2" /><rect x="13" y="13" width="7" height="7" rx="1.2" />
  </svg>
);

const CountUpStat = ({ target, icon, label, sub }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const duration = 1400;
        const timer = setInterval(() => {
          const t = Math.min(1, (Date.now() - start) / duration);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.floor(target * ease));
          if (t >= 1) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} data-reveal="1" className="hover-lift cw-stat-item" style={{ padding: 12, borderRadius: 14, boxSizing: 'border-box' }}>
      <div className="icon-pop cw-stat-icon" style={{ width: 52, height: 52, borderRadius: 12, background: '#F7F2E4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{icon}</div>
      <div className="cw-stat-number" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 46, color: colors.navy }}>{val}+</div>
      <p className="cw-stat-label" style={{ fontSize: 16, fontWeight: 600, color: '#3A4658', margin: '14px 0 4px' }}>{label}</p>
      <p className="cw-stat-sub" style={{ fontSize: 14, color: colors.muted, margin: 0 }}>{sub}</p>
    </div>
  );
};

export default function Stats() {
  return (
    <section className="cw-stats-section" style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '80px 32px', boxSizing: 'border-box', width: '100%' }}>
      <FxLayer orbs={[{ size: 340, color: 'rgba(212,165,55,0.14)', top: -120, left: -100 }]} />
      <div className="cw-stats-grid" style={{ maxWidth: 1120, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center', boxSizing: 'border-box' }}>
        <CountUpStat target={20} icon={<IconBuilding />} label="Partner Institutions" sub="Building innovation globally" />
        <CountUpStat target={1000} icon={<IconUsers />} label="Students Trained" sub="Shaping future innovators" />
        <CountUpStat target={10} icon={<IconGrid />} label="Active Projects" sub="Transforming industries" />
      </div>

      <style jsx>{`
        .cw-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 860px) {
          .cw-stats-section {
            padding: 60px 24px !important;
          }
          .cw-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }

        @media (max-width: 560px) {
          .cw-stats-section {
            padding: 48px 20px !important;
          }
          .cw-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .cw-stat-number {
            font-size: 38px !important;
          }
          .cw-stat-label {
            font-size: 15px !important;
          }
          .cw-stat-sub {
            font-size: 13.5px !important;
          }
        }
      `}</style>
    </section>
  );
}