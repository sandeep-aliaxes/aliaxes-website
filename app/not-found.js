import Link from "next/link";
import { colors } from "../components/colors";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.navyDarkT || colors.navy,
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(64px, 12vw, 110px)",
            fontWeight: 700,
            color: colors.gold,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 14px",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "#B7C2D4",
            fontSize: 15.5,
            lineHeight: 1.7,
            margin: "0 0 32px",
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            borderRadius: 9,
            background: colors.gold,
            color: colors.navy,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}