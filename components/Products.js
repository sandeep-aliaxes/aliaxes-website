"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useProductsTab } from './ProductsTabContext';

const IconDiamond = ({ color = colors.gold, size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" />
  </svg>
);

const FeatureCard = ({ badge, badgeBg, badgeColor, title, desc, features }) => (
  <div data-reveal="1" className="product-text">
    <span className="badge-pop" style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 99, background: badgeBg, color: badgeColor, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>{badge}</span>
    <h3 data-reveal-text="1" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 27, fontWeight: 700, color: colors.navy, margin: '0 0 14px' }}>{title}</h3>
    <p style={{ color: colors.body, fontSize: 15.5, lineHeight: 1.7, margin: '0 0 24px' }}>{desc}</p>
    <div className="hover-lift" style={{ background: '#fff', border: `1px solid ${colors.border}`, borderRadius: 12, padding: '22px 24px', boxShadow: '0 8px 24px rgba(15,40,71,0.05)' }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: colors.muted, marginBottom: 14 }}>Key Features</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        {features.map((f, i) => (
          <div key={i} data-reveal="1" className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span className="icon-pop"><IconDiamond /></span><span style={{ color: '#33404F', fontSize: 14.5, fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductImage = ({ src, label, dark }) => (
  <div data-reveal="1" className="hover-lift img-zoom product-image" style={{
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    background: dark ? 'repeating-linear-gradient(135deg,#0F2847,#0F2847 10px,#12305A 10px,#12305A 20px)' : 'repeating-linear-gradient(135deg,#E4E9F0,#E4E9F0 10px,#D8DEE7 10px,#D8DEE7 20px)'
  }}>
    {src ? (
      <img
        src={src}
        alt={label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    ) : (
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 12.5, color: dark ? colors.gold : colors.muted
      }}>{label}</span>
    )}
  </div>
);

const PRODUCTS_DATA = {
  embedded: { title: 'Embedded Systems' },
  ai: { title: 'Agentic AI Stack' },
  iot: { title: 'Internet of Things' },
  vlsi: { title: 'VLSI Design' }
};


export default function Products() {
  const searchParams = useSearchParams();
  const { activeTab: tab, setActiveTab: setTab } = useProductsTab();

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab && PRODUCTS_DATA[urlTab]) {
      setTab(urlTab);
    }
  }, [searchParams]);


  const tabStyle = (active) => ({
    padding: '14px 22px', fontWeight: 600, fontSize: 14.5, background: 'transparent',
    color: active ? colors.navy : colors.muted, border: 'none', borderBottom: active ? `2.5px solid ${colors.gold}` : '2.5px solid transparent',
    cursor: 'pointer', marginBottom: -2, fontFamily: "'IBM Plex Sans',sans-serif", whiteSpace: 'nowrap', transition: 'color 0.3s ease, border-color 0.3s ease, transform 0.25s ease'
  });

  return (
    <section className="products-section" style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '32px 32px 100px', minHeight: '100vh' }}>
      <FxLayer
        orbs={[{ size: 340, color: 'rgba(212,165,55,0.13)', top: -100, right: -80 }, { size: 260, color: 'rgba(70,120,190,0.11)', bottom: -80, left: -60, anim: 'floatSlow2', duration: '14s' }]}
        circuit={{ paths: [{ d: 'M1200 520 L980 520 L920 620 L680 620 L620 500 L340 500 L280 600 L0 600', stroke: colors.navy, opacity: 0.14, dash: '6 12' }], nodes: [{ cx: 620, cy: 500, fill: colors.gold, delay: '0.3s' }, { cx: 280, cy: 600, fill: colors.blue, delay: '0.9s' }] }}
        particles={[{ size: 5, color: colors.gold, left: '80%', bottom: '10%', delay: '1.1s' }, { size: 4, color: colors.blue, left: '60%', bottom: '22%', delay: '2.8s' }]}
      />
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56, borderBottom: '1px solid #E3E7ED', paddingBottom: 2 }}>
          {Object.keys(PRODUCTS_DATA).map(key => (
            <button key={key} onClick={() => setTab(key)} className="tab-anim" style={tabStyle(tab === key)}>{PRODUCTS_DATA[key].title}</button>
          ))}
        </div>

        {tab === 'embedded' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            <div data-reveal="1" className="product-row">
              <ProductImage src="/Raspberry_pi.png" label="Raspberry Pi Kit" />
              <FeatureCard badge="Hardware Kit" badgeBg="#F7F2E4" badgeColor="#B8862A" title="Raspberry Pi Embedded Kit"
                desc="Complete embedded systems development kit featuring Raspberry Pi boards with a comprehensive hardware ecosystem. Perfect for learning embedded systems, IoT development, and building intelligent edge devices."
                features={['Raspberry Pi 4/5 Board', 'GPIO Expansion Modules', 'Sensor Interfaces', 'Real-time OS Support']} />
            </div>
            <div data-reveal="1" className="product-row">
              <div className="product-row-reverse-1">
                <FeatureCard badge="Hardware Kit" badgeBg="#F7F2E4" badgeColor="#B8862A" title="ST Embedded Kit"
                  desc="Professional-grade embedded systems kit featuring STMicroelectronics processors — for industrial applications, real-time systems, and production-ready deployments."
                  features={['STM32 Processors', 'Industrial Grade', 'Real-time Kernels', 'Enterprise Support']} />
              </div>
              <div className="product-row-reverse-2"><ProductImage src="/ST.png" label="ST Kit" /></div>
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            <div data-reveal="1" className="product-row">
              <ProductImage dark src="/Agentic_AI.png" label="Agentic AI" />
              <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Autonomous Agents & Systems Lab"
                desc="Build intelligent autonomous agents that perceive, decide, and act independently. Master agentic AI frameworks for self-learning systems and intelligent task automation."
                features={['Agent Architecture', 'Decision Making', 'Multi-Agent Systems']} />
            </div>
            <div data-reveal="1" className="product-row">
              <div className="product-row-reverse-1">
                <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Advanced Edge Intelligence Lab"
                  desc="Deploy powerful AI models on edge devices like Raspberry Pi. Optimize machine learning for resource-constrained microprocessors."
                  features={['Edge AI Optimization', 'Real-time Inference', 'Low-power Processing']} />
              </div>
              <div className="product-row-reverse-2"><ProductImage dark src="/Pi_AI.png" label="Edge AI" /></div>
            </div>
            <div data-reveal="1" className="product-row">
              <ProductImage dark src="/ST_AI.png" label="Micro-Intelligence" />
              <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Micro-Intelligence & Systems Lab"
                desc="Implement AI on microcontrollers like STM32. Build ultra-lightweight intelligent systems for industrial IoT applications."
                features={['Microcontroller AI', 'Ultra-Low Power', 'Industrial IoT']} />
            </div>
          </div>
        )}

        {tab === 'iot' && (
          <div data-reveal="1" className="product-row">
            <ProductImage src="/IoT.png" label="IoT Suite" />
            <FeatureCard badge="Platform" badgeBg="#EAF0F9" badgeColor="#3A6CB0" title="IoT Solution Suite"
              desc="End-to-end IoT platform for connecting and managing distributed sensors — including cloud integration, real-time analytics, and secure communication."
              features={['MQTT / CoAP Protocols', 'Cloud Integration', 'Real-time Analytics', 'Security Protocols']} />
          </div>
        )}

        {tab === 'vlsi' && (
          <div data-reveal="1" className="product-row">
            <ProductImage src="/VLSI.png" label="VLSI Suite" />
            <FeatureCard badge="Design Suite" badgeBg="#EAF0F9" badgeColor="#3A6CB0" title="VLSI Design Suite"
              desc="Complete VLSI design and verification environment for semiconductor design — professional tools for digital and analog IC design."
              features={['Circuit Simulation', 'Design Verification', 'DRC Tools', 'Manufacturing Support']} />
          </div>
        )}
      </div>

      <style>{`
        .product-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .product-row-reverse-1 { order: 2; }
        .product-row-reverse-2 { order: 1; }
        .product-image {
          min-height: 340px;
        }
        @media (max-width: 860px) {
          .product-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          /* Force text first, image second on mobile, no matter the desktop order */
          .product-text { order: 1 !important; }
          .product-image { order: 2 !important; min-height: 260px; }
          .product-row-reverse-1 { order: 1; }
          .product-row-reverse-2 { order: 2; }
        }
        @media (max-width: 640px) {
          .products-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}