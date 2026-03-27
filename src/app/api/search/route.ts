import { NextRequest, NextResponse } from 'next/server'

const CG = 'https://api.coingecko.com/api/v3'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''
  const res = await fetch(`${CG}/search?query=${query}`, { next: { revalidate: 60 } })
  const data = await res.json()
  return NextResponse.json(data)
}