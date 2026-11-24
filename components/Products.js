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

const ProductImage = ({ src, label, dark, fit }) => (
  <div data-reveal="1" className="hover-lift img-zoom product-image" style={{
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    background: fit === 'contain' ? '#FFFFFF' : dark ? 'repeating-linear-gradient(135deg,#0F2847,#0F2847 10px,#12305A 10px,#12305A 20px)' : 'repeating-linear-gradient(135deg,#E4E9F0,#E4E9F0 10px,#D8DEE7 10px,#D8DEE7 20px)',
    border: fit === 'contain' ? `1px solid ${colors.border}` : undefined
  }}>
    {src ? (
      <img
        src={src}
        alt={label}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit === 'contain' ? 'contain' : 'cover', display: 'block' }}
      />
    ) : (
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 12.5, color: dark ? colors.gold : colors.muted
      }}>{label}</span>
    )}
  </div>
);

const ProductShowcase = ({ src, label }) => (
  <div data-reveal="1" className="product-image product-stage">
    <div className="product-spin">
      <img src={src} alt={label} className="product-spin-img" />
    </div>
    <div className="product-shadow" />
  </div>
);

const ProductRow = ({ reverse, src, label, ...card }) => (
  <div data-reveal="1" className="product-row">
    {reverse ? (
      <>
        <div className="product-row-reverse-1"><FeatureCard {...card} /></div>
        <div className="product-row-reverse-2"><ProductShowcase src={src} label={label} /></div>
      </>
    ) : (
      <>
        <ProductShowcase src={src} label={label} />
        <FeatureCard {...card} />
      </>
    )}
  </div>
);

const DOMAINS = [
  { key: 'embedded', title: 'Embedded Systems & IoT', src: '/embedded-systems-iot.webp', badge: 'Domain 01',
    desc: 'Raspberry Pi, Arduino, IoT trainer kits and LoRaWAN: complete embedded systems and IoT laboratories for programming, sensing, connectivity and edge projects.',
    features: ['Raspberry Pi Lab: Pi 3 B+, Pi 4 & Pi 5', 'Arduino Lab: UNO, UNO Q & VENTUNO Q', 'IoT Trainer Kits: Experience, Pro, Lite, Medical & Robotics', 'LoRaWAN Gateways & Nodes'] },
  { key: 'edge-ai', title: 'Edge AI, AIoT & Vision AI', src: '/edge-ai-aiot-vision-ai.webp', badge: 'Domain 02',
    desc: 'On-device AI labs and Centres of Excellence on STMicroelectronics: low-power machine learning, connected intelligence and real-time vision.',
    features: ['Edge AI Lab: Low-power ML on Microcontrollers', 'AIoT Lab: Wi-Fi, Bluetooth & Cloud Dashboards', 'Vision AI Lab: Real-time Object Detection', 'Centre of Excellence: 15 Edge AI + 15 AIoT + 10 Vision AI Seats'] },
  { key: 'quantum', title: 'Quantum Machine Learning', src: '/quantum-machine-learning.webp', badge: 'Domain 03',
    desc: 'Browser-based QML lab with real quantum hardware access: from data to qubits to working applications, in your existing computer lab.',
    features: ['Simulators & Real Quantum Hardware Access', '10 Structured Experiments with Manuals & Datasets', 'PennyLane & Qiskit with Python Code Export', 'Guided Courses, Faculty & Student Training'] },
  { key: 'vlsi', title: 'VLSI & FPGA', src: '/vlsi-fpga.webp', badge: 'Domain 04',
    desc: 'Digilent and Xilinx FPGA platforms for digital design, from first digital-logic labs to advanced VLSI projects.',
    features: ['Digilent FPGA Boards', 'Spartan, Artix-7 & Zynq Platforms', 'Industry-standard Design Flow', 'Digital Design & VLSI Labs'] },
  { key: 'test-measurement', title: 'Test & Measurement', src: '/test-measurement.webp', badge: 'Domain 05',
    desc: 'Oscilloscopes and Analog Discovery instruments for electronics, communication and embedded systems laboratories.',
    features: ['Digital Storage Oscilloscopes', 'Digilent Analog Discovery Series', 'Data Acquisition (DAQ)', 'Complete Lab Bench Setups'] },
  { key: 'pcb', title: 'PCB Design & Prototyping', src: '/pcb-design-prototyping.webp', badge: 'Domain 06',
    desc: 'PCB prototyping machine, soldering and assembly: take students from schematic to finished board in-house.',
    features: ['PCB Prototyping Machine: Drill, Engrave & Route', 'Gerber & G-Code Support', 'Soldering Station & Power Supply', 'PCB Assembly & Project Services'] },
  { key: 'automation', title: 'Industrial Automation & EV', src: '/industrial-automation-ev.webp', badge: 'Domain 07',
    desc: 'PLC, robotic automation, EV and BMS workbenches for industry-grade automation and electric-vehicle training.',
    features: ['PLC Programming Workbench with HMI', 'Robotic Automation', '2-Wheeler EV Workbench', 'Battery Management System Trainer'] },
  { key: 'idea-lab', title: 'AICTE IDEA Lab', src: '/aicte-idea-lab.webp', badge: 'Domain 08',
    desc: 'Complete IDEA Lab setup as per AICTE guidelines: a hands-on space for students to design, prototype and build real projects.',
    features: ['CNC Router, Mini Lathe & Milling', '3D Printer & 3D Scanner', 'PCB Prototyping & Test Equipment', 'Planning, Supply, Installation & Training'] },
  { key: 'smt', title: 'SMT Solutions', src: '/smt-solutions.webp', badge: 'Domain 09',
    desc: 'Pick & place and reflow for electronics manufacturing: teach and run small-batch SMT assembly in-house.',
    features: ['SMT Pick & Place Machine', 'Table-top Reflow Oven', 'Solder Paste to Inspection Workflow', 'Prototyping & Small-batch Production'] }
];

const PRODUCTS_DATA = Object.fromEntries(DOMAINS.map(d => [d.key, { title: d.title }]));
// Older links (e.g. /products?tab=iot) open the closest current domain
const TAB_ALIASES = { iot: 'embedded', ai: 'edge-ai', 'pcb-smt': 'pcb', wireless: 'test-measurement' };

export default function Products() {
  const searchParams = useSearchParams();
  const { activeTab: tab, setActiveTab: setTab } = useProductsTab();

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    const resolved = TAB_ALIASES[urlTab] || urlTab;
    if (resolved && PRODUCTS_DATA[resolved]) {
      setTab(resolved);
    } else if (!PRODUCTS_DATA[tab]) {
      setTab('embedded');
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

        {DOMAINS.filter(d => d.key === tab).map((d, i) => (
          <div key={d.key} style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            <ProductRow src={d.src} label={d.title} badge={d.badge} badgeBg="#F7F2E4" badgeColor="#B8862A"
              title={d.title} desc={d.desc} features={d.features} />
          </div>
        ))}
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
        .product-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          perspective: 1200px;
        }
        .product-spin {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 360px;
          transform-style: preserve-3d;
          animation: productSpin 9s ease-in-out infinite;
          will-change: transform;
        }
        .product-spin-img {
          display: block;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 22px 28px rgba(15,40,71,0.22));
        }
        .product-shadow {
          position: absolute;
          bottom: 6px;
          left: 50%;
          width: 55%;
          height: 22px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(15,40,71,0.28), rgba(15,40,71,0) 70%);
          animation: productShadow 9s ease-in-out infinite;
        }
        .product-stage:hover .product-spin,
        .product-stage:hover .product-shadow { animation-play-state: paused; }
        @keyframes productSpin {
          0%   { transform: rotateY(-28deg) rotateX(8deg) translateY(0); }
          25%  { transform: rotateY(0deg) rotateX(4deg) translateY(-12px); }
          50%  { transform: rotateY(28deg) rotateX(8deg) translateY(0); }
          75%  { transform: rotateY(0deg) rotateX(4deg) translateY(-12px); }
          100% { transform: rotateY(-28deg) rotateX(8deg) translateY(0); }
        }
        @keyframes productShadow {
          0%, 50%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          25%, 75% { transform: translateX(-50%) scale(0.85); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .product-spin, .product-shadow { animation: none; }
        }
        @media (max-width: 860px) {
          .product-row {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          /* Force text first, image second on mobile, no matter the desktop order */
          .product-text { order: 1 !important; }
          .product-image { order: 2 !important; min-height: 260px; }
          .product-stage { min-height: 300px; }
          .product-spin { height: 270px; }
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