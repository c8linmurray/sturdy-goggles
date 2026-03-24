import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

// POST /api/share
// Body: { frames: [{name, data (base64 PNG), aspectRatio}], username, caption }
// Returns: { id, url }

export async function POST(request) {
  try {
    const body = await request.json()
    const { frames, username, caption } = body

    if (!frames || !Array.isArray(frames) || frames.length === 0) {
      return NextResponse.json({ error: 'No frames provided' }, { status: 400 })
    }

    if (frames.length > 20) {
      return NextResponse.json({ error: 'Max 20 slides per carousel' }, { status: 400 })
    }

    // Generate a short random ID
    const id = randomBytes(5).toString('hex') // e.g. "a3f9c2"

    const payload = {
      id,
      frames: frames.map(f => ({
        name: f.name,
        data: f.data,         // base64 data URL
        aspectRatio: f.aspectRatio || 1,
      })),
      username: username || 'yourhandle',
      caption: caption || '',
      createdAt: Date.now(),
    }

    // Store with 7-day TTL (604800 seconds)
    await kv.set(`carousel:${id}`, JSON.stringify(payload), { ex: 604800 })

    const origin = request.headers.get('origin') || ''
    const url = `${origin}/view/${id}`

    return NextResponse.json({ id, url })
  } catch (err) {
    console.error('Share API error:', err)
    return NextResponse.json({ error: 'Failed to save carousel' }, { status: 500 })
  }
}
