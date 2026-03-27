// Server-side: calls CoinGecko directly
// Client-side: calls our own /api/* routes

const CG = 'https://api.coingecko.com/api/v3'

async function fetchCG<T>(path: string): Promise<T> {
  const res = await fetch(`${CG}${path}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function getTopCoins(page = 1, perPage = 50) {
  return fetchCG<CoinMarket[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`
  )
}

export async function getCoinDetail(coinId: string) {
  return fetchCG<CoinDetail>(
    `/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  )
}

export async function getCoinChart(coinId: string, days = 7) {
  return fetchCG<ChartData>(
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  )
}

export async function searchCoins(query: string) {
  return fetchCG<SearchResult>(`/search?query=${query}`)
}

export async function getGlobalData() {
  return fetchCG<GlobalData>(`/global`)
}

export async function getTrendingCoins() {
  return fetchCG<TrendingData>(`/search/trending`)
}

// ─── TYPES ────────────────────────────────────────────────

export interface CoinMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_7d_in_currency: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  sparkline_in_7d: { price: number[] }
  last_updated: string
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  image: { thumb: string; small: string; large: string }
  description: { en: string }
  market_cap_rank: number
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    price_change_percentage_1y: number
    ath: { usd: number }
    ath_change_percentage: number
    atl: { usd: number }
    circulating_supply: number
    total_supply: number
    max_supply: number
  }
}

export interface ChartData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export interface SearchResult {
  coins: {
    id: string
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    large: string
  }[]
}

export interface GlobalData {
  data: {
    active_cryptocurrencies: number
    total_market_cap: { usd: number }
    total_volume: { usd: number }
    market_cap_percentage: { btc: number; eth: number }
    market_cap_change_percentage_24h_usd: number
  }
}

export interface TrendingData {
  coins: {
    item: {
      id: string
      name: string
      symbol: string
      thumb: string
      market_cap_rank: number
      data: {
        price: number
        price_change_percentage_24h: { usd: number }
      }
    }
  }[]
}