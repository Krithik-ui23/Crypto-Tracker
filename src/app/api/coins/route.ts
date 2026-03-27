import { NextRequest, NextResponse } from 'next/server'

const CG = 'https://api.coingecko.com/api/v3'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || '1'
  const perPage = searchParams.get('perPage') || '50'

  const res = await fetch(
    `${CG}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  return NextResponse.json(data)
}