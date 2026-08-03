"use client";
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

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

export default function contact() {
  const [sectionRef, sectionIn] = useInView(0.1);

  return (
    <div data-screen-label="Contact">
      <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '32px 32px 100px', minHeight: '100vh' }}>
        <FxLayer
          orbs={[{ size: 320, color: 'rgba(70,120,190,0.13)', bottom: -100, right: -60, anim: 'floatSlow2', duration: '13s' }, { size: 260, color: 'rgba(212,165,55,0.12)', top: -80, left: -60 }]}
          circuit={{ paths: [{ d: 'M0 400 L200 400 L250 500 L500 500 L550 350 L850 350 L900 460 L1200 460', stroke: colors.navy, opacity: 0.14, dash: '6 12' }], nodes: [{ cx: 250, cy: 500, fill: colors.gold, delay: '0.4s' }, { cx: 900, cy: 460, fill: colors.blue, delay: '1s' }] }}
          particles={[{ size: 5, color: colors.gold, left: '12%', bottom: '14%', delay: '1.3s' }, { size: 4, color: colors.blue, left: '85%', bottom: '20%', delay: '2.9s' }]}
        />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className={`cw-reveal-item${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '0ms', fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 38, fontWeight: 700, color: colors.navy, margin: '0 0 56px' }}>
            Get in Touch
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginBottom: 56 }}>
            <div className={`cw-reveal-item cw-hover-lift${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '80ms', textAlign: 'center', padding: 20, borderRadius: 12 }}>
              <span className="cw-icon-pop" style={{ display: 'inline-flex' }}><Phone size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Phone</h3>
              <p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>+91 90194 78203</p>
            </div>
            <div className={`cw-reveal-item cw-hover-lift${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '160ms', textAlign: 'center', padding: 20, borderRadius: 12 }}>
              <span className="cw-icon-pop" style={{ display: 'inline-flex' }}><Mail size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Email</h3>
              <p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>sales@aliaxestech.com</p>
            </div>
            <div className={`cw-reveal-item cw-hover-lift${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '240ms', textAlign: 'center', padding: 20, borderRadius: 12 }}>
              <span className="cw-icon-pop" style={{ display: 'inline-flex' }}><MapPin size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Location</h3>
              <p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>Bangalore, India</p>
            </div>
          </div>

          <div className={`cw-reveal-item cw-hover-lift${sectionIn ? ' visible' : ''}`} style={{ ['--d']: '320ms', background: '#fff', borderRadius: 16, padding: 44, maxWidth: 620, margin: '0 auto', border: `1px solid ${colors.border}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" placeholder="Your Name" className="cw-field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none' }} />
              <input type="email" placeholder="Your Email" className="cw-field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none' }} />
              <textarea placeholder="Your Message" rows="5" className="cw-field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none', resize: 'vertical' }} />
              <button className="cw-btn-anim" style={{ width: '100%', padding: 15, borderRadius: 9, background: colors.navy, color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

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

        .cw-hover-lift {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease !important;
        }
        .cw-hover-lift:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 18px 34px rgba(15,40,71,0.12) !important;
        }

        .cw-icon-pop {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .cw-hover-lift:hover .cw-icon-pop {
          transform: scale(1.15) rotate(-4deg) !important;
        }

        .cw-field-anim {
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .cw-field-anim:focus {
          border-color: ${colors.gold} !important;
          box-shadow: 0 0 0 3px rgba(212,165,55,0.15) !important;
        }

        .cw-btn-anim {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, filter 0.3s ease !important;
        }
        .cw-btn-anim:hover {
          transform: translateY(-3px) scale(1.01) !important;
          box-shadow: 0 14px 30px rgba(15,40,71,0.28) !important;
          filter: brightness(1.05) !important;
        }
        .cw-btn-anim:active {
          transform: translateY(-1px) scale(0.99) !important;
        }
      `}</style>
    </div>
  );
}