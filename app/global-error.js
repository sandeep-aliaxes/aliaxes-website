"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0F2847",
            padding: "32px",
            boxSizing: "border-box",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 520 }}>
            <div
              style={{
                fontSize: "clamp(64px, 12vw, 110px)",
                fontWeight: 700,
                color: "#D4A537",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              500
            </div>
            <h1
              style={{
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 14px",
              }}
            >
              A Critical Error Occurred
            </h1>
            <p
              style={{
                color: "#B7C2D4",
                fontSize: 15.5,
                lineHeight: 1.7,
                margin: "0 0 32px",
              }}
            >
              The application ran into a serious problem. Please try reloading.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "14px 32px",
                borderRadius: 9,
                background: "#D4A537",
                color: "#0F2847",
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}