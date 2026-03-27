import { NextResponse } from "next/server"

const BASE_URL = "https://api.coingecko.com/api/v3"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const days = searchParams.get("days") || "7"

    const url = `${BASE_URL}/coins/${params.id}/market_chart?vs_currency=usd&days=${days}&interval=daily`

    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `CoinGecko error ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    )
  }
}