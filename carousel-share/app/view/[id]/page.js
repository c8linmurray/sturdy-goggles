import { kv } from '@vercel/kv'
import CarouselViewer from '../../components/CarouselViewer'

export async function generateMetadata({ params }) {
  return {
    title: 'Carousel Preview',
    description: 'View this carousel design in an Instagram mockup.',
    openGraph: {
      title: 'Carousel Preview',
      description: 'View this carousel design in an Instagram mockup.',
    },
  }
}

export default async function ViewPage({ params }) {
  const { id } = params

  let data = null
  let error = null

  try {
    const raw = await kv.get(`carousel:${id}`)
    if (!raw) {
      error = 'not-found'
    } else {
      data = typeof raw === 'string' ? JSON.parse(raw) : raw
    }
  } catch (e) {
    console.error('KV fetch error:', e)
    error = 'error'
  }

  if (error === 'not-found') {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 40 }}>🔍</div>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Preview not found</h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          This link may have expired. Previews last 7 days.
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 40 }}>⚠️</div>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Please try again later.</p>
      </main>
    )
  }

  return <CarouselViewer data={data} />
}
