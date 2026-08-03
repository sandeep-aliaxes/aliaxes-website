"use client";

import { useRouter } from 'next/navigation';
import { colors } from './colors';
import FxLayer from './FxLayer';

const IconArrow = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Hero() {
  const router = useRouter();
  const go = (path) => { router.push(path); window.scrollTo(0, 0); };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: colors.navyDarkT, padding: '96px 32px 110px' }}>
      <FxLayer variant="dark"
        orbs={[
          { size: 520, color: 'radial-gradient(circle, rgba(212,165,55,0.16), transparent 70%)', top: -180, right: -140, anim: 'floatSlow', duration: '12s' },
          { size: 420, color: 'radial-gradient(circle, rgba(70,120,190,0.18), transparent 70%)', bottom: -160, left: -120, anim: 'floatSlow2', duration: '15s' }
        ]}
        circuit={{
          paths: [
            { d: 'M0 130 L220 130 L280 70 L520 70 L580 150 L900 150 L960 40 L1200 40', stroke: colors.gold, duration: '6s', opacity: 0.4 },
            { d: 'M1200 660 L980 660 L920 600 L680 600 L620 640 L340 640 L280 590 L0 590', stroke: colors.blue, duration: '8s', opacity: 0.35, dash: '6 12' }
          ],
          nodes: [
            { cx: 280, cy: 70, fill: colors.gold }, { cx: 580, cy: 150, fill: colors.gold, delay: '0.6s' },
            { cx: 960, cy: 40, fill: colors.gold, delay: '1.2s' }, { cx: 620, cy: 640, fill: colors.blue, delay: '0.3s' },
            { cx: 280, cy: 590, fill: colors.blue, delay: '0.9s' }
          ]
        }}
        particles={[
          { size: 5, color: colors.gold, left: '12%', bottom: '10%' }, { size: 4, color: colors.gold, left: '24%', bottom: '20%', delay: '1.4s' },
          { size: 6, color: colors.blue, left: '68%', bottom: '8%', delay: '2.6s' }, { size: 4, color: colors.gold, left: '80%', bottom: '24%', delay: '0.8s' },
          { size: 5, color: colors.blue, left: '50%', bottom: '14%', delay: '3.4s' }, { size: 4, color: colors.gold, left: '90%', bottom: '12%', delay: '2s' }
        ]}
      />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div data-reveal="1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(212,165,55,0.35)', color: colors.gold, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 32 }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg>
          Deep-Tech Solutions Partner
        </div>
        <h1 data-reveal-text="1" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(38px,6vw,68px)', lineHeight: 1.08, color: '#fff', margin: '0 0 26px' }}>
          Empowering Innovation. Engineering the Future.
        </h1>
        <p data-reveal="1" style={{ fontSize: 19, lineHeight: 1.6, color: '#B7C2D4', maxWidth: 680, margin: '0 auto 44px' }}>
          We deploy cutting-edge technology solutions across Agentic AI, Embedded Systems, IoT, VLSI and Quantum Computing — for institutions and industry building what's next.
        </p>
        <div data-reveal="1" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => go('/about')} data-magnetic="1" className="btn-anim" style={{ padding: '16px 34px', borderRadius: 9, fontWeight: 600, fontSize: 15.5, background: colors.gold, color: colors.navy, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            Explore Solutions <IconArrow />
          </button>
          <button onClick={() => go('/contact')} data-magnetic="1" className="btn-anim" style={{ padding: '16px 34px', borderRadius: 9, fontWeight: 600, fontSize: 15.5, background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}