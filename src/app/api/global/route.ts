import { NextResponse } from 'next/server'

const CG = 'https://api.coingecko.com/api/v3'

export async function GET() {
  const res = await fetch(`${CG}/global`, { next: { revalidate: 60 } })
  const data = await res.json()
  return NextResponse.json(data)
}