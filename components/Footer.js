"use client";

import { useRouter } from "next/navigation";
import { colors } from "./colors";
import FxLayer from "./FxLayer";

export default function Footer() {
  const router = useRouter();

  const go = (path) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className="cw-footer"
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.footerT,
        borderTop: "1px solid rgba(212,165,55,0.18)",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <FxLayer
        variant="dark"
        orbs={[
          {
            size: 300,
            color: "rgba(212,165,55,0.1)",
            bottom: -120,
            left: "10%",
          },
        ]}
      />

      <div
        className="cw-footer-grid"
        style={{
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          padding: "64px 32px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 48,
          boxSizing: "border-box",
        }}
      >
        {/* Company */}
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Aliaxes Technologies
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 14,
              color: "#8FA0BC",
            }}
          >
            <span>Bangalore, India</span>
            <span>+91 90194 78203</span>
            <span>sales@aliaxestech.com</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: colors.gold,
              marginBottom: 16,
            }}
          >
            Quick Links
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              { label: "About", page: "/about" },
              { label: "Products", page: "/products" },
              { label: "Insights", page: "/blogs" },
              { label: "Careers", page: "/careers" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.page)}
                className="link-anim"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#8FA0BC",
                  fontSize: 14,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: colors.gold,
              marginBottom: 16,
            }}
          >
            Company
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              { label: "Careers", page: "/careers" },
              { label: "About", page: "/about" },
              { label: "Contact", page: "/contact" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.page)}
                className="link-anim"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#8FA0BC",
                  fontSize: 14,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: colors.gold,
              marginBottom: 16,
            }}
          >
            Connect
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {["in", "X", "f"].map((item) => (
              <div
                key={item}
                className="social-anim"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid rgba(212,165,55,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.gold,
                  fontWeight: 700,
                  fontSize: 12,
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(212,165,55,0.15)",
          padding: "22px 32px",
          textAlign: "center",
          fontSize: 13,
          color: "#6C7C97",
        }}
      >
        © 2026 Aliaxes Technologies. All rights reserved.
      </div>

      <style jsx>{`
        .link-anim {
          display: inline-block;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .link-anim:hover {
          color: ${colors.gold} !important;
          transform: translateX(4px);
        }

        .social-anim {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .social-anim:hover {
          background: rgba(212, 165, 55, 0.15) !important;
          border-color: ${colors.gold} !important;
          transform: translateY(-3px) scale(1.08);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .cw-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
            padding: 52px 24px 32px !important;
          }
        }

        @media (max-width: 560px) {
          .cw-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 44px 20px 28px !important;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}