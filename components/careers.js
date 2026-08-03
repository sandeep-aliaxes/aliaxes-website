"use client";
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useState, useEffect, useRef } from 'react';

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

const IconCheckCircle = (p) => (
  <svg viewBox="0 0 24 24" width={p.size || 30} height={p.size || 30} fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" />
  </svg>
);

export default function Careers() {
  const [sectionRef, sectionIn] = useInView(0.1);

  return (
    <div data-screen-label="Careers">
      <section ref={sectionRef} className="cw-careers-section" style={{ position: 'relative', overflow: 'hidden', background: colors.navyDarkT, padding: '32px 32px 100px', minHeight: '100vh', boxSizing: 'border-box', width: '100%', maxWidth: '100vw' }}>
        <FxLayer
          variant="dark"
          orbs={[{ size: 420, color: 'rgba(212,165,55,0.16)', top: -160, right: -100 }, { size: 360, color: 'rgba(70,120,190,0.16)', bottom: -150, left: -100, anim: 'floatSlow2', duration: '15s' }]}
          circuit={{
            paths: [
              { d: 'M0 120 L180 120 L230 220 L480 220 L530 90 L820 90 L870 190 L1200 190', stroke: colors.gold, opacity: 0.4 },
              { d: 'M1200 560 L1000 560 L950 470 L700 470 L650 600 L360 600 L310 480 L0 480', stroke: colors.blue, opacity: 0.35, dash: '6 12', duration: '9s' }
            ],
            nodes: [{ cx: 230, cy: 220, fill: colors.gold }, { cx: 530, cy: 90, fill: colors.gold, delay: '0.7s' }, { cx: 950, cy: 470, fill: colors.blue, delay: '0.4s' }, { cx: 650, cy: 600, fill: colors.blue, delay: '1.1s' }]
          }}
          particles={[{ size: 5, color: colors.gold, left: '14%', bottom: '12%', delay: '0.3s' }, { size: 4, color: colors.blue, left: '82%', bottom: '18%', delay: '2.1s' }, { size: 4, color: colors.gold, left: '68%', bottom: '8%', delay: '3.2s' }, { size: 5, color: colors.blue, left: '30%', bottom: '22%', delay: '1.5s' }]}
        />
        <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center', boxSizing: 'border-box' }}>
          <div className={`cw-reveal-item${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(212,165,55,0.35)', color: colors.gold, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            Careers
          </div>
          <h1 className={`cw-reveal-item cw-h1${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '80ms', fontFamily: "'Space Grotesk',sans-serif", fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
            Join Our Team
          </h1>
          <p className={`cw-reveal-item${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '140ms', color: '#B7C2D4', fontSize: 17, margin: '0 0 56px' }}>
            Be part of the innovation journey
          </p>

          <div className={`cw-reveal-item cw-hover-lift-dark cw-card${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '220ms', position: 'relative', background: colors.navy, border: '1px solid rgba(212,165,55,0.28)', borderRadius: 18, padding: '64px 48px', overflow: 'hidden', boxSizing: 'border-box', width: '100%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${colors.gold},${colors.blue})` }} />
            <div className="cw-icon-pop" style={{ width: 68, height: 68, borderRadius: 16, background: 'rgba(212,165,55,0.14)', border: '1px solid rgba(212,165,55,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <IconCheckCircle />
            </div>
            <h2 className="cw-h2" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 27, fontWeight: 700, color: '#fff', margin: '0 0 18px' }}>We're Not Hiring Right Now</h2>
            <p style={{ color: '#C7D0DE', fontSize: 16.5, lineHeight: 1.7, margin: '0 0 12px', maxWidth: '100%', width: 560, marginLeft: 'auto', marginRight: 'auto', boxSizing: 'border-box' }}>Thanks for your interest! We don't have open positions at the moment, but we'd love to hear from talented professionals.</p>
            <p style={{ color: '#8FA0BC', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px', maxWidth: '100%', width: 560, marginLeft: 'auto', marginRight: 'auto', boxSizing: 'border-box' }}>When exciting opportunities open up, we'll reach out.</p>
            <p style={{ color: '#DCE3EE', fontSize: 15, margin: '0 0 20px' }}><strong>Email us at:</strong> <span style={{ color: colors.gold, fontWeight: 600 }}>sandeep@aliaxestech.com</span></p>
            <a
              href="mailto:sandeep@aliaxestech.com"
              className="cw-btn-anim"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: 9,
                background: colors.gold,
                color: colors.navy,
                border: 'none',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                textDecoration: 'none',
                boxSizing: 'border-box',
                maxWidth: '100%',
              }}
            >
              Send Your Profile
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        [data-screen-label="Careers"] * {
          box-sizing: border-box;
        }
        [data-screen-label="Careers"] .cw-careers-section > div:first-child {
          max-width: 100%;
          overflow: hidden;
        }
      `}</style>

      <style jsx>{`
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

        .cw-hover-lift-dark {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease !important;
        }
        .cw-hover-lift-dark:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(212,165,55,0.65) !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.38) !important;
        }

        .cw-icon-pop {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .cw-hover-lift-dark:hover .cw-icon-pop {
          transform: scale(1.15) rotate(-6deg) !important;
        }

        .cw-btn-anim {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, filter 0.3s ease !important;
        }
        .cw-btn-anim:hover {
          transform: translateY(-3px) scale(1.015) !important;
          box-shadow: 0 14px 30px rgba(212,165,55,0.32) !important;
          filter: brightness(1.04) !important;
        }
        .cw-btn-anim:active {
          transform: translateY(-1px) scale(0.99) !important;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 768px) {
          .cw-careers-section {
            padding: 90px 20px 70px !important;
          }
          .cw-h1 {
            font-size: 30px !important;
          }
          .cw-card {
            padding: 44px 26px !important;
          }
          .cw-h2 {
            font-size: 22px !important;
          }
        }

        @media (max-width: 480px) {
          .cw-careers-section {
            padding: 70px 16px 56px !important;
          }
          .cw-h1 {
            font-size: 26px !important;
          }
          .cw-card {
            padding: 36px 18px !important;
          }
          .cw-h2 {
            font-size: 20px !important;
          }
          .cw-btn-anim {
            width: 100% !important;
            padding: 14px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}