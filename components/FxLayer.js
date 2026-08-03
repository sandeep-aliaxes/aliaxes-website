import React from 'react';

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

export default FxLayer;