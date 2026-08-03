"use client";

import { colors } from "./colors";
import FxLayer from "./FxLayer";

const INSTITUTION_LOGOS = [
  { img: "/SRM.jpg", alt: "SRM" },
  { img: "/KCT.png", alt: "KCT" },
  { img: "/LBS.png", alt: "LBS" },
  { img: "/cusat.png", alt: "Cochin University of Science and Technology" },
  { img: "/nit-calicut.png", alt: "NIT Calicut" },
  { img: "/nit-suratkal.jpg", alt: "NIT Karnataka Surathkal" },
  { img: "/nit-meghalaya.jpg", alt: "NIT Meghalaya" },
  { img: "/nit-arunachal.png", alt: "NIT Arunachal Pradesh" },
  { img: "/nit-ap.jpg", alt: "NIT Andhra Pradesh" },
];

export default function Institute() {
  return (
    <section
      className="cw-institute-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.bgLightT,
        padding: "80px 0",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <FxLayer
        orbs={[
          {
            size: 380,
            color: "rgba(70,120,190,0.13)",
            bottom: -140,
            right: -100,
            anim: "floatSlow2",
            duration: "14s",
          },
        ]}
      />

      <div
        style={{
          maxWidth: 1120,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          padding: "0 32px",
          boxSizing: "border-box",
        }}
      >
        <h2
          data-reveal-text="1"
          className="cw-institute-heading"
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            color: colors.navy,
            margin: "0 0 44px",
          }}
        >
          Trusted by Leading Institutions
        </h2>
      </div>

      <div
        className="marquee-mask"
        style={{
          maxWidth: 1180,
          margin: "0 auto",        /* <-- was missing: this is what actually centers the strip */
          display: "flex",
          alignItems: "center",
          justifyContent: "center", /* keeps a single (non-looping) row visually centered too */
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 72,
            width: "max-content",
          }}
        >
          {[...INSTITUTION_LOGOS, ...INSTITUTION_LOGOS].map((logo, index) => (
            <img
              key={index}
              src={logo.img}
              alt={logo.alt}
              className="marquee-logo"
              style={{
                height: 68,
                width: "auto",
                maxWidth: 160,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Component Styles */}
      <style jsx>{`
        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marqueeScroll 36s linear infinite;
          gap: 72px;
        }

        .marquee-mask:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
          mask-image: linear-gradient(
            90deg,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
        }

        .marquee-logo {
          transition: transform 0.35s ease, filter 0.35s ease;
          filter: drop-shadow(0 2px 6px rgba(15, 40, 71, 0.08));
          height: 68px;
        }

        .marquee-logo:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 6px 14px rgba(15, 40, 71, 0.18));
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 860px) {
          .cw-institute-section {
            padding: 60px 0 !important;
          }
          .cw-institute-heading {
            font-size: 25px !important;
            margin-bottom: 32px !important;
          }
          .marquee-track {
            gap: 48px !important;
          }
          .marquee-logo {
            height: 52px !important;
            max-width: 130px !important;
          }
        }

        @media (max-width: 480px) {
          .cw-institute-section {
            padding: 48px 0 !important;
          }
          .cw-institute-heading {
            font-size: 21px !important;
            margin-bottom: 26px !important;
            padding: 0 16px !important;
          }
          .marquee-track {
            gap: 32px !important;
          }
          .marquee-logo {
            height: 40px !important;
            max-width: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}