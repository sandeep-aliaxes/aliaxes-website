import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

// ============================================================================
// COLORS
// ============================================================================
const colors = {
  navy: '#0F2847',
  navyDark: '#0B1E36',
  navyPanel: '#12305A',
  gold: '#D4A537',
  goldSoft: 'rgba(212,165,55,0.15)',
  blue: '#6C8FC7',
  white: '#FFFFFF',
  bgLight: '#F7F8FA',
  ink: '#0F2847',
  body: '#4B5768',
  muted: '#8792A0',
  border: '#E7EAEF',
  navyDarkT: 'rgba(11,30,54,0.55)',
  whiteT: 'rgba(255,255,255,0.85)',
  bgLightT: 'rgba(247,248,250,0.85)',
  footerT: 'rgba(11,30,54,0.75)'
};

// ============================================================================
// SHARED FX (dot-grid / orbs / circuit-lines / particles)
// ============================================================================
const FxLayer = ({ variant = 'light', orbs = [], circuit, particles = [] }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        backgroundImage:
          variant === 'dark'
            ? 'linear-gradient(rgba(212,165,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,55,0.06) 1px, transparent 1px)'
            : 'linear-gradient(rgba(15,40,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,40,71,0.05) 1px, transparent 1px)',
        backgroundSize: '42px 42px'
      }}
    />
    {orbs.map((o, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(46px)',
          width: o.size,
          height: o.size,
          background: o.color,
          top: o.top,
          left: o.left,
          right: o.right,
          bottom: o.bottom,
          animation: `${o.anim || 'floatSlow'} ${o.duration || '13s'} ease-in-out infinite`
        }}
      />
    ))}
    {circuit && (
      <svg viewBox="0 0 1200 700" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65 }} preserveAspectRatio="none">
        {circuit.paths.map((p, i) => (
          <React.Fragment key={i}>
            <path d={p.d} fill="none" stroke={p.stroke} strokeWidth="1.3" strokeDasharray={p.dash || '7 11'}
              style={{ animation: `dashFlow ${p.duration || '7s'} linear infinite`, opacity: p.opacity ?? 0.35 }} />
            <circle r={p.dotSize || 4.5} fill={p.stroke}>
              <animateMotion dur={p.duration || '7s'} repeatCount="indefinite" path={p.d} />
            </circle>
          </React.Fragment>
        ))}
        {circuit.nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="3.5" fill={n.fill}
            style={{ animation: `pulseGlow 2.4s ease-in-out infinite ${n.delay || '0s'}` }} />
        ))}
      </svg>
    )}
    {particles.map((pt, i) => (
      <div key={i} style={{
        position: 'absolute', borderRadius: '50%',
        width: pt.size, height: pt.size, background: pt.color,
        left: pt.left, bottom: pt.bottom,
        animation: `particleUp 6s ease-in-out infinite ${pt.delay || '0s'}`
      }} />
    ))}
    <div className="fx-sweep" />
  </div>
);

// ============================================================================
// ICONS (monochrome line icons, no emoji)
// ============================================================================
const IconChip = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||34} height={p.size||34} fill="none" stroke={p.color||colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
  </svg>
);
const IconBot = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||34} height={p.size||34} fill="none" stroke={p.color||colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="7" width="14" height="12" rx="2" /><circle cx="9.5" cy="12.5" r="1.2" /><circle cx="14.5" cy="12.5" r="1.2" /><path d="M12 7V4M9 3h6" />
  </svg>
);
const IconBroadcast = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||34} height={p.size||34} fill="none" stroke={p.color||colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1.6" /><path d="M4 12c0-3 3.5-5 8-5s8 2 8 5-3.5 5-8 5-8-2-8-5z" /><path d="M12 4c2 2.5 2 13.5 0 16" />
  </svg>
);
const IconAtom = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||34} height={p.size||34} fill="none" stroke={p.color||colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9" ry="3.5" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
  </svg>
);
const IconLayers = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||34} height={p.size||34} fill="none" stroke={p.color||colors.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="8" height="8" rx="1.3" /><rect x="13" y="4" width="8" height="8" rx="1.3" /><rect x="3" y="14" width="8" height="8" rx="1.3" /><rect x="13" y="14" width="8" height="8" rx="1.3" />
  </svg>
);
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
  <svg viewBox="0 0 24 24" width={p.size||30} height={p.size||30} fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>
);
const IconMission = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.5 6.5L21 9l-5 4.5 1.5 7L12 17l-5.5 3.5L8 13.5 3 9l6.5-.5z" /></svg>
);
const IconVision = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={colors.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
);

// ============================================================================
// GLOBAL KEYFRAMES (injected once)
// ============================================================================
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; }
    @keyframes floatSlow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-12px,10px); } }
    @keyframes floatSlow2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(14px,-14px); } }
    @keyframes particleUp { 0% { transform: translateY(0); opacity:0; } 10% { opacity:0.7; } 90% { opacity:0.5; } 100% { transform: translateY(-140px); opacity:0; } }
    @keyframes dashFlow { to { stroke-dashoffset: -240; } }
    @keyframes pulseGlow { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
    @keyframes sweep { 0% { transform: translateX(-60%) rotate(8deg); } 100% { transform: translateX(160%) rotate(8deg); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    .fx-sweep { position:absolute; top:-40%; left:0; width:35%; height:180%; background:linear-gradient(90deg, transparent, rgba(212,165,55,0.09), transparent); animation: sweep 9s linear infinite; pointer-events:none; }
    @media (hover:none) { #aliaxes-cursor-dot, #aliaxes-cursor-ring { display:none !important; } }

    .hover-lift { transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.35s ease; will-change: transform; }
    .hover-lift:hover { transform: translateY(-10px); box-shadow: 0 24px 48px rgba(15,40,71,0.16); }
    .hover-lift-dark:hover { border-color: rgba(212,165,55,0.65) !important; box-shadow: 0 24px 48px rgba(0,0,0,0.38); }
    .hover-tilt { transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease; }
    .hover-tilt:hover { transform: translateY(-6px) rotate(-0.4deg); box-shadow: 0 18px 36px rgba(15,40,71,0.12); }

    .icon-pop { transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); display: inline-flex; }
    .hover-lift:hover .icon-pop, .hover-tilt:hover .icon-pop { transform: scale(1.18) rotate(-6deg); }

    .img-zoom { overflow: hidden; }
    .img-zoom img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .img-zoom:hover img { transform: scale(1.08); }

    .btn-anim { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, filter 0.3s ease; }
    .btn-anim:hover { transform: translateY(-3px) scale(1.015); box-shadow: 0 14px 30px rgba(212,165,55,0.32); filter: brightness(1.04); }
    .btn-anim:active { transform: translateY(-1px) scale(0.99); }

    .dot-anim { transition: width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease; }

    .field-anim { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
    .field-anim:focus { border-color: #D4A537 !important; box-shadow: 0 0 0 3px rgba(212,165,55,0.15); }

    .link-anim { transition: gap 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s ease; }
    .link-anim:hover { gap: 11px !important; color: #B8862A !important; }

    .social-anim { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease; }
    .social-anim:hover { transform: translateY(-4px); background: rgba(212,165,55,0.14); border-color: rgba(212,165,55,0.7); }

    .nav-link-anim { transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease; }
    .nav-link-anim:hover { transform: translateY(-1px); color: #D4A537 !important; }

    .tab-anim:hover { transform: translateY(-2px); color: #D4A537 !important; }

    .feature-row { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); border-radius: 8px; padding: 4px 6px; margin: -4px -6px; }
    .feature-row:hover { transform: translateX(6px); }
    .feature-row:hover .icon-pop { transform: scale(1.3) rotate(20deg); }

    .badge-pop { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); cursor: default; }
    .badge-pop:hover { transform: scale(1.08); }

    /* ---- Institutions marquee ---- */
    @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-track { animation: marqueeScroll 36s linear infinite; }
    .marquee-mask:hover .marquee-track { animation-play-state: paused; }
    .marquee-mask { -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
    .marquee-logo { transition: transform 0.35s ease, filter 0.35s ease; filter: drop-shadow(0 2px 6px rgba(15,40,71,0.08)); }
    .marquee-logo:hover { transform: scale(1.1); filter: drop-shadow(0 6px 14px rgba(15,40,71,0.18)); }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
    }
  `}</style>
);

// ============================================================================
// CUSTOM CURSOR
// ============================================================================
const CustomCursor = () => (
  <>
    <div id="aliaxes-cursor-ring" style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(212,165,55,0.5)', pointerEvents: 'none', zIndex: 9999, transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease', transform: 'translate(-100px,-100px)' }} />
    <div id="aliaxes-cursor-dot" style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, borderRadius: '50%', background: '#D4A537', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-100px,-100px)' }} />
  </>
);

// ============================================================================
// SITE MOTION: cursor, magnetic buttons, scroll-reveal, word-stagger text
// ============================================================================
function useSiteMotion(page) {
  const ioRef = useRef(null);
  const ioTextRef = useRef(null);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: mouse.x, y: mouse.y };
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    document.addEventListener('mousemove', onMouseMove);

    let rafId;
    const loop = () => {
      const dot = document.getElementById('aliaxes-cursor-dot');
      const ring = document.getElementById('aliaxes-cursor-ring');
      if (dot) dot.style.transform = `translate(${mouse.x - 3}px,${mouse.y - 3}px)`;
      if (ring) {
        cursorPos.x += (mouse.x - cursorPos.x) * 0.15;
        cursorPos.y += (mouse.y - cursorPos.y) * 0.15;
        const w = ring.offsetWidth || 36;
        ring.style.transform = `translate(${cursorPos.x - w / 2}px,${cursorPos.y - w / 2}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e) => {
      const t = e.target.closest && e.target.closest('button, a, [data-magnetic]');
      const ring = document.getElementById('aliaxes-cursor-ring');
      if (t && ring) { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.borderColor = '#D4A537'; ring.style.background = 'rgba(212,165,55,0.08)'; }
    };
    const onOut = (e) => {
      const t = e.target.closest && e.target.closest('button, a, [data-magnetic]');
      const ring = document.getElementById('aliaxes-cursor-ring');
      if (t && ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(212,165,55,0.5)'; ring.style.background = 'transparent'; }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let activeMagnet = null;
    const onMagnetMove = (e) => {
      const el = e.target.closest && e.target.closest('[data-magnetic]');
      if (el) {
        activeMagnet = el;
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        el.style.transition = 'transform 0.15s ease-out';
        el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.25}px)`;
      } else if (activeMagnet) {
        activeMagnet.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
        activeMagnet.style.transform = 'translate(0,0)';
        activeMagnet = null;
      }
    };
    document.addEventListener('mousemove', onMagnetMove);

    ioRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentNode;
          const idx = parent ? Array.prototype.indexOf.call(parent.children, entry.target) : 0;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, Math.max(0, idx) * 70);
          ioRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    ioTextRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll(':scope > span');
          spans.forEach((s) => { s.style.opacity = '1'; s.style.transform = 'none'; });
          ioTextRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousemove', onMagnetMove);
      cancelAnimationFrame(rafId);
      if (ioRef.current) ioRef.current.disconnect();
      if (ioTextRef.current) ioTextRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll('[data-reveal]:not([data-reveal-bound])');
      els.forEach((el) => {
        el.setAttribute('data-reveal-bound', '1');
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        if (ioRef.current) ioRef.current.observe(el);
      });

      const textEls = document.querySelectorAll('[data-reveal-text]:not([data-split-done])');
      textEls.forEach((el) => {
        el.setAttribute('data-split-done', '1');
        const words = el.textContent.split(' ');
        el.textContent = '';
        words.forEach((w, i) => {
          const span = document.createElement('span');
          span.textContent = w + (i < words.length - 1 ? '\u00A0' : '');
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(22px)';
          span.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`;
          el.appendChild(span);
        });
        if (ioTextRef.current) ioTextRef.current.observe(el);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [page]);
}

// ============================================================================
// VIDEO BACKGROUND (fixed, full-page, behind all content)
// ============================================================================
const VideoBackground = () => (
  <>
    <video autoPlay muted loop playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -2, pointerEvents: 'none' }}>
      <source src="/motion.mp4" type="video/mp4" />
    </video>
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(11,30,54,0.6), rgba(11,30,54,0.72))' }} />
  </>
);

// ============================================================================
// NAVIGATION
// ============================================================================
const PRODUCT_ITEMS = [
  { key: 'embedded', label: 'Embedded Systems' },
  { key: 'ai', label: 'Agentic AI Stack' },
  { key: 'iot', label: 'Internet of Things' },
  { key: 'vlsi', label: 'VLSI Design' }
];

const Navigation = ({ page, go }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const isProductPage = ['embedded', 'ai', 'iot', 'vlsi'].includes(page);

  const navBtn = (active) => ({
    padding: '10px 18px', borderRadius: 8, fontWeight: 600, fontSize: 14,
    background: active ? 'rgba(212,165,55,0.14)' : 'transparent',
    color: active ? colors.gold : '#C7D0DE', border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Sans',sans-serif", whiteSpace: 'nowrap'
  });
  const mobBtn = (active) => ({
    padding: '12px 16px', borderRadius: 8, fontWeight: 600, fontSize: 14.5, textAlign: 'left',
    background: active ? 'rgba(212,165,55,0.14)' : 'transparent',
    color: active ? colors.gold : '#C7D0DE', border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Sans',sans-serif"
  });
  const subBtn = (active) => ({
    display: 'block', width: '100%', textAlign: 'left', padding: '11px 16px', borderRadius: 6,
    background: active ? 'rgba(212,165,55,0.12)' : 'transparent', color: active ? colors.gold : '#DCE3EE',
    border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: "'IBM Plex Sans',sans-serif"
  });

  const click = (p) => { go(p); setMobileOpen(false); setProductsOpen(false); window.scrollTo(0, 0); };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,30,54,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(212,165,55,0.18)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 84 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          <button onClick={() => click('home')} className="nav-link-anim" style={navBtn(page === 'home')}>Home</button>
          <button onClick={() => click('about')} className="nav-link-anim" style={navBtn(page === 'about')}>About</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProductsOpen(v => !v)} className="nav-link-anim" style={navBtn(isProductPage)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Products <ChevronDown size={13} /></span>
            </button>
            {productsOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: colors.navy, border: '1px solid rgba(212,165,55,0.25)', borderTop: `3px solid ${colors.gold}`, borderRadius: 10, padding: 8, minWidth: 210, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 60 }}>
                {PRODUCT_ITEMS.map(item => (
                  <button key={item.key} onClick={() => click(item.key)} style={subBtn(page === item.key)}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => click('blogs')} className="nav-link-anim" style={navBtn(page === 'blogs')}>Insights</button>
          <button onClick={() => click('careers')} className="nav-link-anim" style={navBtn(page === 'careers')}>Careers</button>
          <button onClick={() => click('contact')} data-magnetic="1" className="btn-anim" style={{ padding: '10px 22px', marginLeft: 8, borderRadius: 8, fontWeight: 600, fontSize: 14, background: colors.gold, color: colors.navy, border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Sans',sans-serif" }}>Contact Us</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setMobileOpen(v => !v)} className="nav-mobile-btn" style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <img onClick={() => click('home')} src="/ALIAXES.png" alt="Aliaxes Technologies" style={{ height: 52, width: 'auto', objectFit: 'contain', cursor: 'pointer', borderRadius: 8 }} />
        </div>
      </div>

      {mobileOpen && (
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid rgba(212,165,55,0.15)' }}>
          <button onClick={() => click('home')} style={mobBtn(page === 'home')}>Home</button>
          <button onClick={() => click('about')} style={mobBtn(page === 'about')}>About</button>
          {PRODUCT_ITEMS.map(item => (
            <button key={item.key} onClick={() => click(item.key)} style={mobBtn(page === item.key)}>{item.label}</button>
          ))}
          <button onClick={() => click('blogs')} style={mobBtn(page === 'blogs')}>Insights</button>
          <button onClick={() => click('careers')} style={mobBtn(page === 'careers')}>Careers</button>
          <button onClick={() => click('contact')} style={mobBtn(page === 'contact')}>Contact Us</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
};

// ============================================================================
// COUNT-UP STAT
// ============================================================================
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
    <div ref={ref} data-reveal="1" className="hover-lift" style={{ padding: 12, borderRadius: 14 }}>
      <div className="icon-pop" style={{ width: 52, height: 52, borderRadius: 12, background: '#F7F2E4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{icon}</div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 46, color: colors.navy }}>{val}+</div>
      <p style={{ fontSize: 16, fontWeight: 600, color: '#3A4658', margin: '14px 0 4px' }}>{label}</p>
      <p style={{ fontSize: 14, color: colors.muted, margin: 0 }}>{sub}</p>
    </div>
  );
};

// ============================================================================
// HOME PAGE
// ============================================================================
const INSTITUTION_LOGOS = [
  { img: '/SRM.jpg', alt: 'SRM' },
  { img: '/KCT.png', alt: 'KCT' },
  { img: '/LBS.png', alt: 'LBS' },
  { img: '/cusat.png', alt: 'Cochin University of Science and Technology' },
  { img: '/nit-calicut.png', alt: 'NIT Calicut' },
  { img: '/nit-suratkal.jpg', alt: 'NIT Karnataka Surathkal' },
  { img: '/nit-meghalaya.jpg', alt: 'NIT Meghalaya' },
  { img: '/nit-arunachal.png', alt: 'NIT Arunachal Pradesh' },
  { img: '/nit-ap.jpg', alt: 'NIT Andhra Pradesh' }
];

const HomePage = ({ go }) => (
  <div data-screen-label="Home">
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
          <button onClick={() => go('about')} data-magnetic="1" className="btn-anim" style={{ padding: '16px 34px', borderRadius: 9, fontWeight: 600, fontSize: 15.5, background: colors.gold, color: colors.navy, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            Explore Solutions <IconArrow />
          </button>
          <button onClick={() => go('contact')} data-magnetic="1" className="btn-anim" style={{ padding: '16px 34px', borderRadius: 9, fontWeight: 600, fontSize: 15.5, background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
            Get in Touch
          </button>
        </div>
      </div>
    </section>

    <section style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '80px 32px' }}>
      <FxLayer orbs={[{ size: 340, color: 'rgba(212,165,55,0.14)', top: -120, left: -100 }]} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, textAlign: 'center' }}>
        <CountUpStat target={20} icon={<IconBuilding />} label="Partner Institutions" sub="Building innovation globally" />
        <CountUpStat target={1000} icon={<IconUsers />} label="Students Trained" sub="Shaping future innovators" />
        <CountUpStat target={10} icon={<IconGrid />} label="Active Projects" sub="Transforming industries" />
      </div>
    </section>

    <section style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '80px 0' }}>
      <FxLayer orbs={[{ size: 380, color: 'rgba(70,120,190,0.13)', bottom: -140, right: -100, anim: 'floatSlow2', duration: '14s' }]} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 32px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 30, fontWeight: 700, color: colors.navy, margin: '0 0 44px' }} data-reveal-text="1">Trusted by Leading Institutions</h2>
      </div>
      <div className="marquee-mask" style={{ position: 'relative', zIndex: 1, overflow: 'hidden', width: '100%' }}>
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', gap: 72, width: 'max-content' }}>
          {[...INSTITUTION_LOGOS, ...INSTITUTION_LOGOS].map((c, i) => (
            <img key={i} src={c.img} alt={c.alt} className="marquee-logo" style={{ height: 68, width: 'auto', maxWidth: 160, objectFit: 'contain', flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// ABOUT PAGE
// ============================================================================
const LAB_VIDEOS = [
  { video: 'Advanced_labs', title: 'Advanced Labs', desc: 'Cutting-edge infrastructure for innovation' },
  { video: 'Embedded_systems_lab', title: 'Embedded Systems Lab', desc: 'Hardware development and debugging' },
  { video: 'Iot_lab', title: 'IoT Lab', desc: 'Connected devices and sensors' },
  { video: 'AI_Lab', title: 'AI Lab', desc: 'Machine learning and AI solutions' },
  { video: 'Quantum_lab', title: 'Quantum Lab', desc: 'Quantum computing research' }
];

const AboutPage = () => {
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

  return (
    <div data-screen-label="About">
      <section style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '110px 32px 90px' }}>
        <FxLayer
          orbs={[{ size: 360, color: 'rgba(212,165,55,0.14)', top: -100, right: -80 }, { size: 280, color: 'rgba(70,120,190,0.11)', bottom: -100, left: -60, anim: 'floatSlow2', duration: '14s' }]}
          circuit={{ paths: [{ d: 'M0 560 L220 560 L280 460 L520 460 L580 340 L900 340 L960 220 L1200 220', stroke: colors.navy, opacity: 0.14 }], nodes: [{ cx: 280, cy: 460, fill: colors.gold }, { cx: 960, cy: 220, fill: colors.blue, delay: '0.8s' }] }}
          particles={[{ size: 5, color: colors.gold, left: '6%', bottom: '8%', delay: '0.4s' }, { size: 4, color: colors.blue, left: '18%', bottom: '20%', delay: '2.2s' }]}
        />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <h1 data-reveal-text="1" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(32px,4.5vw,48px)', lineHeight: 1.12, color: colors.navy, margin: '0 0 26px' }}>
              Empowering Innovation
            </h1>
            <p data-reveal="1" style={{ fontSize: 17, lineHeight: 1.7, color: colors.body, margin: '0 0 36px' }}>
              We accelerate prototyping, experimentation, and deployment through advanced lab solutions and expertise spanning Agentic AI, Embedded Systems, IoT, Quantum Computing, and VLSI Design.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div data-reveal="1" className="hover-tilt" style={{ padding: '22px 24px', borderRadius: 10, background: colors.bgLight, borderLeft: `3px solid ${colors.gold}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <IconMission /><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: colors.navy, margin: 0 }}>Mission</h3>
                </div>
                <p style={{ color: colors.body, margin: 0, fontSize: 15, lineHeight: 1.6 }}>Enable research and innovation by delivering state-of-the-art technology platforms and expertise.</p>
              </div>
              <div data-reveal="1" className="hover-tilt" style={{ padding: '22px 24px', borderRadius: 10, background: colors.bgLight, borderLeft: `3px solid ${colors.navy}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <IconVision /><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: colors.navy, margin: 0 }}>Vision</h3>
                </div>
                <p style={{ color: colors.body, margin: 0, fontSize: 15, lineHeight: 1.6 }}>Be the catalyst for technological transformation in education and industry globally.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="img-zoom" style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 420 }}>
              <video key={labIndex} autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}>
                <source src={`/${LAB_VIDEOS[labIndex].video}.mp4`} type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 26px', background: 'rgba(0,0,0,0.55)' }}>
                <h3 style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{LAB_VIDEOS[labIndex].title}</h3>
                <p style={{ color: '#C7D0DE', margin: 0, fontSize: 14 }}>{LAB_VIDEOS[labIndex].desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 9, marginTop: 22 }}>
              {LAB_VIDEOS.map((_, i) => (
                <button key={i} onClick={() => setLabIndex(i)} className="dot-anim" style={{
                  width: i === labIndex ? 18 : 11, height: 11, borderRadius: 99, border: 'none',
                  background: i === labIndex ? colors.gold : '#DDE2E9', cursor: 'pointer'
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '90px 32px' }}>
        <FxLayer
          orbs={[{ size: 300, color: 'rgba(212,165,55,0.13)', top: -90, left: '20%', anim: 'floatSlow2', duration: '13s' }]}
          circuit={{ paths: [{ d: 'M0 100 L250 100 L300 220 L650 220 L700 80 L1200 80', stroke: colors.navy, opacity: 0.12 }], nodes: [{ cx: 300, cy: 220, fill: colors.gold, delay: '0.3s' }] }}
        />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 34, fontWeight: 700, color: colors.navy, margin: '0 0 52px' }} data-reveal-text="1">Our Technology Expertise</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20 }}>
            {techCards.map((t, i) => (
              <div key={i} data-reveal="1" className="hover-lift hover-lift-dark" style={{ background: colors.navy, border: '1px solid rgba(212,165,55,0.3)', borderRadius: 14, padding: '30px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <span className="icon-pop">{t.icon}</span>
                <h3 style={{ color: '#fff', fontFamily: "'Space Grotesk',sans-serif", fontSize: 15.5, fontWeight: 600, margin: 0 }}>{t.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', background: colors.whiteT, padding: '90px 32px' }}>
        <FxLayer
          orbs={[{ size: 340, color: 'rgba(70,120,190,0.12)', bottom: -100, right: '10%' }]}
          circuit={{ paths: [{ d: 'M1200 400 L950 400 L900 280 L580 280 L530 420 L0 420', stroke: colors.navy, opacity: 0.12, dash: '6 12' }], nodes: [{ cx: 900, cy: 280, fill: colors.blue, delay: '0.7s' }] }}
        />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 34, fontWeight: 700, color: colors.navy, margin: '0 0 52px' }} data-reveal-text="1">Why Partner With Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {whyCards.map((w, i) => (
              <div key={i} data-reveal="1" className="hover-lift hover-lift-dark" style={{ padding: 30, borderRadius: 12, background: colors.navy, border: '1px solid transparent' }}>
                <div className="icon-pop" style={{ marginBottom: 16 }}>{w.icon}</div>
                <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 8px' }}>{w.title}</h3>
                <p style={{ color: '#A9B5C6', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// PRODUCTS PAGE
// ============================================================================
const FeatureCard = ({ badge, badgeBg, badgeColor, title, desc, features }) => (
  <div data-reveal="1">
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
  <div data-reveal="1" className="hover-lift img-zoom" style={{
    borderRadius: 14, minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    background: dark ? 'repeating-linear-gradient(135deg,#0F2847,#0F2847 10px,#12305A 10px,#12305A 20px)' : 'repeating-linear-gradient(135deg,#E4E9F0,#E4E9F0 10px,#D8DEE7 10px,#D8DEE7 20px)'
  }}>
    {src ? (
      <img src={src} alt={label} style={{ width: '100%', height: '100%', minHeight: 340, objectFit: 'cover' }} />
    ) : (
      <span style={{ fontFamily: 'monospace', fontSize: 12.5, color: dark ? colors.gold : colors.muted }}>{label}</span>
    )}
  </div>
);

const PRODUCTS_DATA = {
  embedded: { title: 'Embedded Systems' },
  ai: { title: 'Agentic AI Stack' },
  iot: { title: 'Internet of Things' },
  vlsi: { title: 'VLSI Design' }
};

const ProductsPage = ({ page, go }) => {
  const tabStyle = (active) => ({
    padding: '14px 22px', fontWeight: 600, fontSize: 14.5, background: 'transparent',
    color: active ? colors.navy : colors.muted, border: 'none', borderBottom: active ? `2.5px solid ${colors.gold}` : '2.5px solid transparent',
    cursor: 'pointer', marginBottom: -2, fontFamily: "'IBM Plex Sans',sans-serif", transition: 'color 0.3s ease, border-color 0.3s ease, transform 0.25s ease'
  });

  return (
    <div data-screen-label="Products">
      <section style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '110px 32px 100px', minHeight: '100vh' }}>
        <FxLayer
          orbs={[{ size: 340, color: 'rgba(212,165,55,0.13)', top: -100, right: -80 }, { size: 260, color: 'rgba(70,120,190,0.11)', bottom: -80, left: -60, anim: 'floatSlow2', duration: '14s' }]}
          circuit={{ paths: [{ d: 'M1200 520 L980 520 L920 620 L680 620 L620 500 L340 500 L280 600 L0 600', stroke: colors.navy, opacity: 0.14, dash: '6 12' }], nodes: [{ cx: 620, cy: 500, fill: colors.gold, delay: '0.3s' }, { cx: 280, cy: 600, fill: colors.blue, delay: '0.9s' }] }}
          particles={[{ size: 5, color: colors.gold, left: '80%', bottom: '10%', delay: '1.1s' }, { size: 4, color: colors.blue, left: '60%', bottom: '22%', delay: '2.8s' }]}
        />
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56, borderBottom: '1px solid #E3E7ED', paddingBottom: 2 }}>
            {Object.keys(PRODUCTS_DATA).map(key => (
              <button key={key} onClick={() => go(key)} className="tab-anim" style={tabStyle(page === key)}>{PRODUCTS_DATA[key].title}</button>
            ))}
          </div>

          {page === 'embedded' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <ProductImage src="/Raspberry_pi.png" label="Raspberry Pi Kit" />
                <FeatureCard badge="Hardware Kit" badgeBg="#F7F2E4" badgeColor="#B8862A" title="Raspberry Pi Embedded Kit"
                  desc="Complete embedded systems development kit featuring Raspberry Pi boards with a comprehensive hardware ecosystem. Perfect for learning embedded systems, IoT development, and building intelligent edge devices."
                  features={['Raspberry Pi 4/5 Board', 'GPIO Expansion Modules', 'Sensor Interfaces', 'Real-time OS Support']} />
              </div>
              <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <div style={{ order: 2 }}>
                  <FeatureCard badge="Hardware Kit" badgeBg="#F7F2E4" badgeColor="#B8862A" title="ST Embedded Kit"
                    desc="Professional-grade embedded systems kit featuring STMicroelectronics processors — for industrial applications, real-time systems, and production-ready deployments."
                    features={['STM32 Processors', 'Industrial Grade', 'Real-time Kernels', 'Enterprise Support']} />
                </div>
                <div style={{ order: 1 }}><ProductImage src="/ST.png" label="ST Kit" /></div>
              </div>
            </div>
          )}

          {page === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <ProductImage dark src="/Agentic_AI.png" label="Agentic AI" />
                <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Autonomous Agents & Systems Lab"
                  desc="Build intelligent autonomous agents that perceive, decide, and act independently. Master agentic AI frameworks for self-learning systems and intelligent task automation."
                  features={['Agent Architecture', 'Decision Making', 'Multi-Agent Systems']} />
              </div>
              <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <div style={{ order: 2 }}>
                  <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Advanced Edge Intelligence Lab"
                    desc="Deploy powerful AI models on edge devices like Raspberry Pi. Optimize machine learning for resource-constrained microprocessors."
                    features={['Edge AI Optimization', 'Real-time Inference', 'Low-power Processing']} />
                </div>
                <div style={{ order: 1 }}><ProductImage dark src="/Pi_AI.png" label="Edge AI" /></div>
              </div>
              <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                <ProductImage dark src="/ST_AI.png" label="Micro-Intelligence" />
                <FeatureCard badge="AI Lab" badgeBg="rgba(212,165,55,0.15)" badgeColor={colors.gold} title="Micro-Intelligence & Systems Lab"
                  desc="Implement AI on microcontrollers like STM32. Build ultra-lightweight intelligent systems for industrial IoT applications."
                  features={['Microcontroller AI', 'Ultra-Low Power', 'Industrial IoT']} />
              </div>
            </div>
          )}

          {page === 'iot' && (
            <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <ProductImage src="/IoT.png" label="IoT Suite" />
              <FeatureCard badge="Platform" badgeBg="#EAF0F9" badgeColor="#3A6CB0" title="IoT Solution Suite"
                desc="End-to-end IoT platform for connecting and managing distributed sensors — including cloud integration, real-time analytics, and secure communication."
                features={['MQTT / CoAP Protocols', 'Cloud Integration', 'Real-time Analytics', 'Security Protocols']} />
            </div>
          )}

          {page === 'vlsi' && (
            <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <ProductImage src="/VLSI.png" label="VLSI Suite" />
              <FeatureCard badge="Design Suite" badgeBg="#EAF0F9" badgeColor="#3A6CB0" title="VLSI Design Suite"
                desc="Complete VLSI design and verification environment for semiconductor design — professional tools for digital and analog IC design."
                features={['Circuit Simulation', 'Design Verification', 'DRC Tools', 'Manufacturing Support']} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// BLOGS PAGE
// ============================================================================
const BLOG_TOPICS = [
  { image: '/blog-agentic-ai.png', topic: 'Agentic AI', title: 'The Rise of Autonomous AI Agents', desc: 'How self-directed agents are reshaping automation and decision-making.' },
  { image: '/blog-embedded-systems.png', topic: 'Embedded Systems', title: 'Designing for the Edge', desc: 'Best practices for building reliable, real-time embedded hardware.' },
  { image: '/blog-iot.png', topic: 'Internet of Things', title: 'Connecting Everything at Scale', desc: 'Architecture patterns for reliable IoT deployments across industries.' },
  { image: '/blog-vlsi.png', topic: 'VLSI Design', title: 'Inside Modern Chip Design', desc: 'How VLSI innovation is powering the next generation of hardware.' },
  { image: '/blog-quantum.png', topic: 'Quantum Computing', title: "Quantum Computing: What's Next", desc: 'A look at where quantum research is headed and why it matters.' },
  { image: '/blog-industry-trends.png', topic: 'Industry Trends', title: 'Tech Trends Shaping Innovation', desc: "A roundup of the shifts driving today's technology landscape." }
];

const BlogsPage = () => (
  <div data-screen-label="Insights">
    <section style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '110px 32px 100px', minHeight: '100vh' }}>
      <FxLayer
        orbs={[{ size: 340, color: 'rgba(70,120,190,0.13)', top: -100, left: -80, anim: 'floatSlow2', duration: '14s' }, { size: 260, color: 'rgba(212,165,55,0.12)', bottom: -80, right: -60 }]}
        circuit={{ paths: [{ d: 'M0 200 L200 200 L250 300 L500 300 L550 150 L850 150 L900 260 L1200 260', stroke: colors.navy, opacity: 0.14 }], nodes: [{ cx: 250, cy: 300, fill: colors.blue }, { cx: 900, cy: 260, fill: colors.gold, delay: '0.6s' }] }}
        particles={[{ size: 5, color: colors.gold, left: '10%', bottom: '10%', delay: '0.6s' }, { size: 4, color: colors.blue, left: '88%', bottom: '18%', delay: '2.5s' }]}
      />
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 38, fontWeight: 700, color: colors.navy, margin: '0 0 14px' }} data-reveal-text="1">Insights & Articles</h1>
        <p style={{ textAlign: 'center', color: '#6C7C97', fontSize: 17, margin: '0 0 60px' }}>Stay updated with the latest technology insights and industry trends</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }}>
          {BLOG_TOPICS.map((b, i) => (
            <div key={i} data-reveal="1" className="hover-lift" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              <div className="img-zoom" style={{ height: 170, overflow: 'hidden' }}>
                <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: '#F7F2E4', color: '#B8862A', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>{b.topic}</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: colors.navy, margin: '0 0 10px' }}>{b.title}</h3>
                <p style={{ color: '#6C7C97', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>{b.desc}</p>
                <span className="link-anim" style={{ color: colors.gold, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Read More <ArrowRight size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// CAREERS PAGE
// ============================================================================
const CareersPage = () => (
  <div data-screen-label="Careers">
    <section style={{ position: 'relative', overflow: 'hidden', background: colors.navyDarkT, padding: '110px 32px 100px', minHeight: '100vh' }}>
      <FxLayer variant="dark"
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
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div data-reveal="1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(212,165,55,0.35)', color: colors.gold, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
          Careers
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 12px' }} data-reveal-text="1">Join Our Team</h1>
        <p data-reveal="1" style={{ color: '#B7C2D4', fontSize: 17, margin: '0 0 56px' }}>Be part of the innovation journey</p>
        <div data-reveal="1" className="hover-lift hover-lift-dark" style={{ position: 'relative', background: colors.navy, border: '1px solid rgba(212,165,55,0.28)', borderRadius: 18, padding: '64px 48px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${colors.gold},${colors.blue})` }} />
          <div className="icon-pop" style={{ width: 68, height: 68, borderRadius: 16, background: 'rgba(212,165,55,0.14)', border: '1px solid rgba(212,165,55,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <IconCheckCircle />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 27, fontWeight: 700, color: '#fff', margin: '0 0 18px' }}>We're Not Hiring Right Now</h2>
          <p style={{ color: '#C7D0DE', fontSize: 16.5, lineHeight: 1.7, margin: '0 0 12px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>Thanks for your interest! We don't have open positions at the moment, but we'd love to hear from talented professionals.</p>
          <p style={{ color: '#8FA0BC', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>When exciting opportunities open up, we'll reach out.</p>
          <p style={{ color: '#DCE3EE', fontSize: 15, margin: '0 0 20px' }}><strong>Email us at:</strong> <span style={{ color: colors.gold, fontWeight: 600 }}>careers@aliaxestech.com</span></p>
          <button className="btn-anim" data-magnetic="1" style={{ padding: '14px 32px', borderRadius: 9, background: colors.gold, color: colors.navy, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Send Your Profile</button>
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// CONTACT PAGE
// ============================================================================
const ContactPage = () => (
  <div data-screen-label="Contact">
    <section style={{ position: 'relative', overflow: 'hidden', background: colors.bgLightT, padding: '110px 32px 100px', minHeight: '100vh' }}>
      <FxLayer
        orbs={[{ size: 320, color: 'rgba(70,120,190,0.13)', bottom: -100, right: -60, anim: 'floatSlow2', duration: '13s' }, { size: 260, color: 'rgba(212,165,55,0.12)', top: -80, left: -60 }]}
        circuit={{ paths: [{ d: 'M0 400 L200 400 L250 500 L500 500 L550 350 L850 350 L900 460 L1200 460', stroke: colors.navy, opacity: 0.14, dash: '6 12' }], nodes: [{ cx: 250, cy: 500, fill: colors.gold, delay: '0.4s' }, { cx: 900, cy: 460, fill: colors.blue, delay: '1s' }] }}
        particles={[{ size: 5, color: colors.gold, left: '12%', bottom: '14%', delay: '1.3s' }, { size: 4, color: colors.blue, left: '85%', bottom: '20%', delay: '2.9s' }]}
      />
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", textAlign: 'center', fontSize: 38, fontWeight: 700, color: colors.navy, margin: '0 0 56px' }} data-reveal-text="1">Get in Touch</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginBottom: 56 }}>
          <div data-reveal="1" className="hover-lift" style={{ textAlign: 'center', padding: 20, borderRadius: 12 }}><span className="icon-pop" style={{ display: 'inline-flex' }}><Phone size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Phone</h3><p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>+91 90194 78203</p></div>
          <div data-reveal="1" className="hover-lift" style={{ textAlign: 'center', padding: 20, borderRadius: 12 }}><span className="icon-pop" style={{ display: 'inline-flex' }}><Mail size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Email</h3><p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>sales@aliaxestech.com</p></div>
          <div data-reveal="1" className="hover-lift" style={{ textAlign: 'center', padding: 20, borderRadius: 12 }}><span className="icon-pop" style={{ display: 'inline-flex' }}><MapPin size={30} color={colors.gold} style={{ marginBottom: 14 }} /></span><h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: colors.navy, margin: '0 0 6px' }}>Location</h3><p style={{ color: '#6C7C97', fontSize: 14.5, margin: 0 }}>Bangalore, India</p></div>
        </div>
        <div data-reveal="1" className="hover-lift" style={{ background: '#fff', borderRadius: 16, padding: 44, maxWidth: 620, margin: '0 auto', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input type="text" placeholder="Your Name" className="field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none' }} />
            <input type="email" placeholder="Your Email" className="field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none' }} />
            <textarea placeholder="Your Message" rows="5" className="field-anim" style={{ width: '100%', padding: '14px 18px', borderRadius: 9, border: '1px solid #DDE2E9', fontSize: 14.5, outline: 'none', resize: 'vertical' }} />
            <button className="btn-anim" data-magnetic="1" style={{ width: '100%', padding: 15, borderRadius: 9, background: colors.navy, color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Send Message</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = ({ go }) => (
  <footer style={{ position: 'relative', overflow: 'hidden', background: colors.footerT, borderTop: '1px solid rgba(212,165,55,0.18)' }}>
    <FxLayer variant="dark" orbs={[{ size: 300, color: 'rgba(212,165,55,0.1)', bottom: -120, left: '10%' }]} />
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
      <div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 16 }}>Aliaxes Technologies</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#8FA0BC' }}>
          <span>Bangalore, India</span><span>+91 90194 78203</span><span>sales@aliaxestech.com</span>
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: colors.gold, marginBottom: 16 }}>Quick Links</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[{ label: 'About', page: 'about' }, { label: 'Products', page: 'embedded' }, { label: 'Insights', page: 'blogs' }, { label: 'Careers', page: 'careers' }].map(l => (
            <button key={l.label} onClick={() => go(l.page)} className="link-anim" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer', fontSize: 14, color: '#8FA0BC', display: 'inline-flex' }}>{l.label}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: colors.gold, marginBottom: 16 }}>Company</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[{ label: 'Careers', page: 'careers' }, { label: 'About', page: 'about' }, { label: 'Contact', page: 'contact' }].map(l => (
            <button key={l.label} onClick={() => go(l.page)} className="link-anim" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer', fontSize: 14, color: '#8FA0BC', display: 'inline-flex' }}>{l.label}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: colors.gold, marginBottom: 16 }}>Connect</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['in', 'X', 'f'].map(s => (
            <div key={s} className="social-anim" style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(212,165,55,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.gold, fontSize: 12, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(212,165,55,0.15)', padding: '22px 32px', textAlign: 'center', fontSize: 13, color: '#6C7C97' }}>
      © 2026 Aliaxes Technologies. All rights reserved.
    </div>
  </footer>
);

// ============================================================================
// APP ROOT
// ============================================================================
const App = () => {
  const [page, setPage] = useState('home');
  useSiteMotion(page);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage go={setPage} />;
      case 'about': return <AboutPage />;
      case 'embedded': case 'ai': case 'iot': case 'vlsi': return <ProductsPage page={page} go={setPage} />;
      case 'blogs': return <BlogsPage />;
      case 'careers': return <CareersPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage go={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: 'transparent', minHeight: '100vh', color: '#101820', position: 'relative' }}>
      <GlobalStyles />
      <VideoBackground />
      <CustomCursor />
      <Navigation page={page} go={setPage} />
      {renderPage()}
      <Footer go={setPage} />
    </div>
  );
};

export default App;