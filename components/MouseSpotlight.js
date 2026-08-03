"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [mouse, setMouse] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        style={{
          position: "fixed",
          left: mouse.x - 28,
          top: mouse.y - 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "2px solid rgba(212,165,55,0.6)",
          background: "rgba(212,165,55,0.08)",
          boxShadow: "0 0 25px rgba(212,165,55,0.25)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* Center Dot */}
      <div
        style={{
          position: "fixed",
          left: mouse.x - 4,
          top: mouse.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#d4a537",
          boxShadow: "0 0 12px rgba(212,165,55,0.8)",
          pointerEvents: "none",
          zIndex: 10000,
          transition: "left 0.03s linear, top 0.03s linear",
        }}
      />
    </>
  );
}