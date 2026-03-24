import './globals.css'

export const metadata = {
  title: 'Carousel Share',
  description: 'Preview and share Figma carousel designs in an Instagram mockup',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
