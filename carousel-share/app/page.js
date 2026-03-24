export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      gap: '32px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{
          width: 64, height: 64,
          borderRadius: 18,
          background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366)',
          margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>
          📱
        </div>

        <h1 style={{
          fontSize: 32, fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 12,
          background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Carousel Share
        </h1>

        <p style={{ color: '#888', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Preview your Figma carousel designs in a realistic Instagram mockup —
          then share a link with anyone, no Figma account needed.
        </p>

        <div style={{
          background: '#141414',
          border: '1px solid #222',
          borderRadius: 16,
          padding: '24px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {[
            ['1', 'Install the Figma plugin', 'Load "Carousel Preview" from the plugin menu in your Figma file.'],
            ['2', 'Select your frames', 'Select the carousel slides you want to preview, in order.'],
            ['3', 'Click Share to Web', 'The plugin exports your frames and generates a shareable link.'],
            ['4', 'Send the link', 'Anyone with the link can view the Instagram mockup — no login required.'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8,
                background: '#0095f620',
                border: '1px solid #0095f640',
                color: '#0095f6',
                fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>{num}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: '#444' }}>
          Shared previews expire after 7 days.
        </p>
      </div>
    </main>
  )
}
