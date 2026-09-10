"use client";
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

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

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 90194 78203',
    sub: 'Mon–Sat, 9am–6pm IST',
    href: 'tel:+919019478203',
    cta: 'Call now',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'sales@aliaxestech.com',
    sub: "We'll reply within 24 hours",
    href: 'mailto:sales@aliaxestech.com',
    cta: 'Send an email',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Bangalore, India',
    sub: 'By appointment only',
    href: 'https://maps.google.com/?q=Bangalore,India',
    cta: 'Get directions',
  },
];

export default function contact() {
  const [sectionRef, sectionIn] = useInView(0.1);

  return (
    <div data-screen-label="Contact">
      <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '100px 32px 120px', minHeight: '100vh' }}>
        <FxLayer
          orbs={[{ size: 320, color: 'rgba(70,120,190,0.13)', bottom: -100, right: -60, anim: 'floatSlow2', duration: '13s' }, { size: 260, color: 'rgba(212,165,55,0.12)', top: -80, left: -60 }]}
          circuit={{ paths: [{ d: 'M0 400 L200 400 L250 500 L500 500 L550 350 L850 350 L900 460 L1200 460', stroke: colors.navy, opacity: 0.14, dash: '6 12' }], nodes: [{ cx: 250, cy: 500, fill: colors.gold, delay: '0.4s' }, { cx: 900, cy: 460, fill: colors.blue, delay: '1s' }] }}
          particles={[{ size: 5, color: colors.gold, left: '12%', bottom: '14%', delay: '1.3s' }, { size: 4, color: colors.blue, left: '85%', bottom: '20%', delay: '2.9s' }]}
        />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            className={`cw-reveal-item${sectionIn ? ' visible' : ''}`}
            style={{ ['--d']: '0ms', textAlign: 'center', marginBottom: 64 }}
          >
            <span style={{ display: 'inline-block', fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.gold, marginBottom: 14 }}>
              Get in Touch
            </span>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 42, fontWeight: 700, color: colors.navy, margin: '0 0 14px', lineHeight: 1.15 }}>
              Let's start a conversation
            </h1>
            <p style={{ color: '#6C7C97', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
              Reach out through whichever channel works best for you — we're happy to help.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {CONTACT_CARDS.map(({ icon: Icon, label, value, sub, href, cta }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`cw-reveal-item cw-hover-lift${sectionIn ? ' visible' : ''}`}
                style={{
                  ['--d']: `${80 + i * 100}ms`,
                  display: 'block',
                  textDecoration: 'none',
                  background: '#fff',
                  borderRadius: 18,
                  padding: '38px 28px',
                  border: `1px solid ${colors.border}`,
                  position: 'relative',
                }}
              >
                <span
                  className="cw-icon-pop"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: 'rgba(212,165,55,0.12)',
                    marginBottom: 22,
                  }}
                >
                  <Icon size={26} color={colors.gold} />
                </span>

                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#8B96A8', margin: '0 0 10px' }}>
                  {label}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>
                  {value}
                </p>
                <p style={{ color: '#6C7C97', fontSize: 13.5, margin: '0 0 22px' }}>
                  {sub}
                </p>

                <span
                  className="cw-cta-anim"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: colors.navy,
                  }}
                >
                  {cta}
                  <ArrowUpRight size={15} />
                </span>
              </a>
            ))}
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
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease !important;
        }
        .cw-hover-lift:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 18px 34px rgba(15,40,71,0.12) !important;
          border-color: ${colors.gold} !important;
        }

        .cw-icon-pop {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1) !important;
        }
        .cw-hover-lift:hover .cw-icon-pop {
          transform: scale(1.15) rotate(-4deg) !important;
        }

        .cw-cta-anim {
          transition: gap 0.3s ease, color 0.3s ease !important;
        }
        .cw-hover-lift:hover .cw-cta-anim {
          gap: 10px !important;
          color: ${colors.gold} !important;
        }
      `}</style>
    </div>
  );
}