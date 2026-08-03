"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { colors } from './colors';
import { useProductsTab } from './ProductsTabContext';

const PRODUCT_ITEMS = [
  { key: 'embedded', label: 'Embedded Systems' },
  { key: 'ai', label: 'Agentic AI Stack' },
  { key: 'iot', label: 'Internet of Things' },
  { key: 'vlsi', label: 'VLSI Design' }
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { activeTab, setActiveTab } = useProductsTab();

  const isActive = (path) => pathname === path;
  const isProductPage = pathname === '/products';

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

  const click = (path) => {
    router.push(path);
    setMobileOpen(false);
    setProductsOpen(false);
    window.scrollTo(0, 0);
  };

  const clickProduct = (key) => {
    setActiveTab(key);
    if (pathname !== '/products') {
      router.push('/products');
    }
    setMobileOpen(false);
    setProductsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,30,54,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(212,165,55,0.18)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 84 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          <button onClick={() => click('/')} className="nav-link-anim" style={navBtn(isActive('/'))}>Home</button>
          <button onClick={() => click('/about')} className="nav-link-anim" style={navBtn(isActive('/about'))}>About</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProductsOpen(v => !v)} className="nav-link-anim" style={navBtn(isProductPage)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Products <ChevronDown size={13} /></span>
            </button>
            {productsOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: colors.navy, border: '1px solid rgba(212,165,55,0.25)', borderTop: `3px solid ${colors.gold}`, borderRadius: 10, padding: 8, minWidth: 210, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 60 }}>
                {PRODUCT_ITEMS.map(item => (
                  <button key={item.key} onClick={() => clickProduct(item.key)} style={subBtn(isProductPage && activeTab === item.key)}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => click('/insights')} className="nav-link-anim" style={navBtn(isActive('/insights'))}>Insights</button>
          <button onClick={() => click('/careers')} className="nav-link-anim" style={navBtn(isActive('/careers'))}>Careers</button>
          <button onClick={() => click('/contact')} data-magnetic="1" className="btn-anim" style={{ padding: '10px 22px', marginLeft: 8, borderRadius: 8, fontWeight: 600, fontSize: 14, background: colors.gold, color: colors.navy, border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Sans',sans-serif" }}>Contact Us</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setMobileOpen(v => !v)} className="nav-mobile-btn" style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <img onClick={() => click('/')} src="/ALIAXES.png" alt="Aliaxes Technologies" style={{ height: 52, width: 'auto', objectFit: 'contain', cursor: 'pointer', borderRadius: 8 }} />
        </div>
      </div>

      {mobileOpen && (
        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid rgba(212,165,55,0.15)' }}>
          <button onClick={() => click('/')} style={mobBtn(isActive('/'))}>Home</button>
          <button onClick={() => click('/about')} style={mobBtn(isActive('/about'))}>About</button>
          {PRODUCT_ITEMS.map(item => (
            <button key={item.key} onClick={() => clickProduct(item.key)} style={mobBtn(isProductPage && activeTab === item.key)}>{item.label}</button>
          ))}
          <button onClick={() => click('/insights')} style={mobBtn(isActive('/insights'))}>Insights</button>
          <button onClick={() => click('/careers')} style={mobBtn(isActive('/careers'))}>Careers</button>
          <button onClick={() => click('/contact')} style={mobBtn(isActive('/contact'))}>Contact Us</button>
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
}