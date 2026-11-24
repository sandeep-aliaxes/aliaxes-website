"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { colors } from './colors';
import FxLayer from './FxLayer';
import { useProductsTab } from './ProductsTabContext';

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
  const router = useRouter();
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

  const index = Math.max(0, DOMAINS.findIndex(d => d.key === tab));
  const d = DOMAINS[index];
  const prev = DOMAINS[(index - 1 + DOMAINS.length) % DOMAINS.length];
  const next = DOMAINS[(index + 1) % DOMAINS.length];
  const go = (key) => { setTab(key); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <section className="products-section pd-section">
      <FxLayer
        variant="dark"
        orbs={[
          { size: 420, color: 'rgba(212,165,55,0.20)', top: -140, right: -100 },
          { size: 360, color: 'rgba(70,120,190,0.28)', bottom: -120, left: -90, anim: 'floatSlow2', duration: '14s' }
        ]}
        circuit={{ paths: [{ d: 'M1200 520 L980 520 L920 620 L680 620 L620 500 L340 500 L280 600 L0 600', stroke: colors.gold, opacity: 0.25, dash: '6 12' }], nodes: [{ cx: 620, cy: 500, fill: colors.gold, delay: '0.3s' }, { cx: 280, cy: 600, fill: colors.blue, delay: '0.9s' }] }}
        particles={[{ size: 5, color: colors.gold, left: '80%', bottom: '10%', delay: '1.1s' }, { size: 4, color: colors.blue, left: '60%', bottom: '22%', delay: '2.8s' }, { size: 4, color: colors.gold, left: '20%', bottom: '30%', delay: '1.9s' }]}
      />
      <div className="pd-aurora" aria-hidden="true" />

      <div key={d.key} className="pd-wrap">
        <div className="pd-grid">
          <div className="pd-stage">
            <div className="pd-glow" />
            <div className="pd-ring pd-ring-1" />
            <div className="pd-ring pd-ring-2" />
            <div className="pd-spin">
              <img src={d.src} alt={d.title} className={d.key === 'idea-lab' ? 'pd-img pd-img-logo' : 'pd-img'} />
            </div>
            <div className="pd-floor" />
          </div>

          <div className="pd-text">
            <span className="pd-badge"><span className="pd-dot" />{d.badge} <span className="pd-of">/ {String(DOMAINS.length).padStart(2, '0')}</span></span>
            <h2 className="pd-title">{d.title}</h2>
            <span className="pd-line" />
            <p className="pd-desc">{d.desc}</p>
            <div className="pd-features">
              {d.features.map((f, i) => (
                <div key={f} className="pd-feature" style={{ animationDelay: `${0.35 + i * 0.12}s` }}>
                  <span className="pd-icon">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill={colors.gold}><rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" /></svg>
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="pd-actions">
              <button className="pd-btn pd-btn-gold" onClick={() => router.push('/contact')}>Request a Proposal</button>
              <button className="pd-btn pd-btn-ghost" onClick={() => go(next.key)}>Next: {next.title} &rarr;</button>
            </div>
          </div>
        </div>

        <div className="pd-pager">
          <button className="pd-arrow" onClick={() => go(prev.key)} aria-label={`Previous: ${prev.title}`}>&larr;</button>
          <div className="pd-progress"><span style={{ width: `${((index + 1) / DOMAINS.length) * 100}%` }} /></div>
          <button className="pd-arrow" onClick={() => go(next.key)} aria-label={`Next: ${next.title}`}>&rarr;</button>
        </div>
      </div>

      <style>{`
        .pd-section {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: 56px 32px 90px;
          background: radial-gradient(1200px 600px at 75% 10%, rgba(42,107,176,0.35), transparent 60%),
                      linear-gradient(160deg, rgba(11,30,54,0.97) 0%, rgba(18,48,90,0.95) 55%, rgba(11,30,54,0.98) 100%);
          color: #fff;
        }
        .pd-aurora {
          position: absolute; inset: -20%;
          background: conic-gradient(from 0deg at 50% 50%, rgba(212,165,55,0.10), rgba(70,120,190,0.14), rgba(212,165,55,0.04), rgba(70,120,190,0.12), rgba(212,165,55,0.10));
          filter: blur(80px);
          animation: pdAurora 24s linear infinite;
          pointer-events: none;
        }
        .pd-wrap { max-width: 1240px; margin: 0 auto; position: relative; z-index: 1; }
        .pd-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; }

        .pd-stage { position: relative; height: 560px; display: flex; align-items: center; justify-content: center; perspective: 1400px; }
        .pd-glow { position: absolute; width: 78%; aspect-ratio: 1; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,165,55,0.30) 0%, rgba(70,120,190,0.22) 38%, rgba(11,30,54,0) 70%);
          animation: pdPulse 6s ease-in-out infinite; }
        .pd-ring { position: absolute; border-radius: 50%; border: 1.5px dashed rgba(212,165,55,0.45); }
        .pd-ring-1 { width: 88%; aspect-ratio: 1; transform: rotateX(72deg); bottom: -12%; animation: pdRing 18s linear infinite; }
        .pd-ring-2 { width: 64%; aspect-ratio: 1; border-color: rgba(108,143,199,0.55); transform: rotateX(72deg); bottom: -2%; animation: pdRing 12s linear infinite reverse; }
        .pd-spin { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d; animation: pdSpin 10s ease-in-out infinite, pdIn 0.9s cubic-bezier(.2,.8,.2,1) both; }
        .pd-img { display: block; width: 100%; height: 100%; object-fit: contain; padding: 30px 20px 60px;
          filter: drop-shadow(0 30px 40px rgba(0,0,0,0.45)); }
        .pd-img-logo { padding: 60px 40px 80px; filter: drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 18px rgba(255,255,255,0.45)); }
        .pd-floor { position: absolute; bottom: 30px; left: 50%; width: 60%; height: 30px; transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.55), rgba(0,0,0,0) 70%); animation: pdFloor 10s ease-in-out infinite; }
        .pd-stage:hover .pd-spin, .pd-stage:hover .pd-floor { animation-play-state: paused; }

        .pd-badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 99px;
          border: 1px solid rgba(212,165,55,0.45); background: rgba(212,165,55,0.10); color: ${colors.gold};
          font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; animation: pdUp 0.6s ease both; }
        .pd-of { color: rgba(255,255,255,0.45); }
        .pd-dot { width: 8px; height: 8px; border-radius: 50%; background: ${colors.gold}; box-shadow: 0 0 0 0 rgba(212,165,55,0.7); animation: pdDot 1.8s infinite; }
        .pd-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(34px, 4.2vw, 54px); line-height: 1.08; font-weight: 700; margin: 22px 0 14px;
          background: linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 35%, ${colors.gold} 50%, #FFFFFF 65%, #FFFFFF 100%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: pdShine 5s linear infinite, pdUp 0.7s 0.1s ease both; }
        .pd-line { display: block; height: 3px; width: 90px; border-radius: 3px; background: linear-gradient(90deg, ${colors.gold}, rgba(212,165,55,0));
          transform-origin: left; animation: pdGrow 0.9s 0.25s ease both; }
        .pd-desc { color: #C3CEDF; font-size: 17px; line-height: 1.75; margin: 20px 0 26px; animation: pdUp 0.7s 0.2s ease both; }
        .pd-features { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .pd-feature { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(6px);
          color: #E7ECF4; font-size: 14.5px; font-weight: 500; line-height: 1.45;
          animation: pdSlide 0.6s ease both; transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease; }
        .pd-feature:hover { transform: translateY(-3px); border-color: rgba(212,165,55,0.55); background: rgba(212,165,55,0.10); }
        .pd-icon { flex-shrink: 0; margin-top: 2px; animation: pdSpinIcon 6s linear infinite; display: inline-flex; }
        .pd-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; animation: pdUp 0.7s 0.8s ease both; }
        .pd-btn { padding: 13px 24px; border-radius: 10px; font-weight: 700; font-size: 14.5px; cursor: pointer; font-family: 'IBM Plex Sans', sans-serif; transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; }
        .pd-btn-gold { background: ${colors.gold}; color: ${colors.navy}; border: none; box-shadow: 0 10px 30px rgba(212,165,55,0.35); }
        .pd-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(212,165,55,0.5); }
        .pd-btn-ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
        .pd-btn-ghost:hover { border-color: ${colors.gold}; color: ${colors.gold}; transform: translateY(-2px); }

        .pd-pager { display: flex; align-items: center; gap: 18px; margin-top: 46px; }
        .pd-arrow { width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.05);
          color: #fff; font-size: 18px; cursor: pointer; transition: all 0.25s ease; }
        .pd-arrow:hover { border-color: ${colors.gold}; color: ${colors.gold}; transform: scale(1.06); }
        .pd-progress { flex: 1; height: 3px; border-radius: 3px; background: rgba(255,255,255,0.12); overflow: hidden; }
        .pd-progress span { display: block; height: 100%; background: linear-gradient(90deg, ${colors.gold}, #F2D27A); transition: width 0.6s ease; }

        @keyframes pdSpin {
          0%   { transform: rotateY(-26deg) rotateX(7deg) translateY(0); }
          25%  { transform: rotateY(0deg) rotateX(3deg) translateY(-16px); }
          50%  { transform: rotateY(26deg) rotateX(7deg) translateY(0); }
          75%  { transform: rotateY(0deg) rotateX(3deg) translateY(-16px); }
          100% { transform: rotateY(-26deg) rotateX(7deg) translateY(0); }
        }
        @keyframes pdFloor { 0%,50%,100% { transform: translateX(-50%) scale(1); opacity: 1; } 25%,75% { transform: translateX(-50%) scale(0.82); opacity: 0.65; } }
        @keyframes pdIn { from { opacity: 0; scale: 0.85; } to { opacity: 1; scale: 1; } }
        @keyframes pdRing { from { transform: rotateX(72deg) rotateZ(0deg); } to { transform: rotateX(72deg) rotateZ(360deg); } }
        @keyframes pdPulse { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes pdAurora { to { transform: rotate(360deg); } }
        @keyframes pdShine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        @keyframes pdUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes pdSlide { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
        @keyframes pdGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes pdDot { 0% { box-shadow: 0 0 0 0 rgba(212,165,55,0.7); } 70% { box-shadow: 0 0 0 10px rgba(212,165,55,0); } 100% { box-shadow: 0 0 0 0 rgba(212,165,55,0); } }
        @keyframes pdSpinIcon { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .pd-spin, .pd-floor, .pd-ring, .pd-glow, .pd-aurora, .pd-title, .pd-icon, .pd-dot { animation: none !important; }
        }
        @media (max-width: 900px) {
          .pd-grid { grid-template-columns: 1fr; gap: 10px; }
          .pd-stage { height: 380px; }
          .pd-text { text-align: left; }
        }
        @media (max-width: 640px) {
          .pd-section { padding: 28px 18px 70px !important; }
          .pd-stage { height: 320px; }
          .pd-features { grid-template-columns: 1fr; }
          .pd-btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}
