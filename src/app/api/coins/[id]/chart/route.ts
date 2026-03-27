import { NextRequest, NextResponse } from 'next/server'

const CG = 'https://api.coingecko.com/api/v3'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await fetch(
    `${CG}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  return NextResponse.json(data)
}