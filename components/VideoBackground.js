export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          objectFit: 'cover', zIndex: -2, pointerEvents: 'none'
        }}
      >
        <source src="/motion.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(11,30,54,0.6), rgba(11,30,54,0.72))'
        }}
      />
    </>
  );
}