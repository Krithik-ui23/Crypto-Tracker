import { getCoinDetail, getCoinChart } from '@/lib/api'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/layout/Navbar'
import PriceChart from '@/components/charts/PriceChart'
import WatchlistButton from '@/components/WatchlistButton'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default async function CoinPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [coin, chart] = await Promise.all([
    getCoinDetail(id),
    getCoinChart(id, 7),
  ])

  const price = coin.market_data.current_price.usd
  const change24h = coin.market_data.price_change_percentage_24h
  const isPositive = change24h >= 0

  // Check if user is logged in and watching this coin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let initialWatched = false
  if (user) {
    const { data } = await supabase
      .from('watchlists')
      .select('id')
      .match({ user_id: user.id, coin_id: id })
      .single()
    initialWatched = !!data
  }

  const fmt = (n: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2
  }).format(n)

  const fmtCompact = (n: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    notation: 'compact', maximumFractionDigits: 2
  }).format(n)

  const stats = [
    { label: 'Market Cap', value: fmtCompact(coin.market_data.market_cap.usd) },
    { label: '24h Volume', value: fmtCompact(coin.market_data.total_volume.usd) },
    { label: '24h High', value: fmt(coin.market_data.high_24h.usd) },
    { label: '24h Low', value: fmt(coin.market_data.low_24h.usd) },
    { label: 'All Time High', value: fmt(coin.market_data.ath.usd) },
    { label: '7d Change', value: `${coin.market_data.price_change_percentage_7d.toFixed(2)}%` },
    { label: '30d Change', value: `${coin.market_data.price_change_percentage_30d.toFixed(2)}%` },
    { label: 'Circulating Supply', value: `${(coin.market_data.circulating_supply / 1e6).toFixed(2)}M ${coin.symbol.toUpperCase()}` },
  ]

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
          <img src={coin.image.large} alt={coin.name} width={64} height={64} style={{ borderRadius: '50%' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const }}>
              <h1 style={{ fontSize: '32px', fontWeight: 700 }}>{coin.name}</h1>
              <span style={{
                background: 'var(--card)', border: '1px solid var(--card-border)',
                padding: '2px 10px', borderRadius: '6px',
                fontSize: '13px', color: 'var(--muted)', fontWeight: 600,
              }}>
                #{coin.market_cap_rank}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: '28px', fontWeight: 700 }}>{fmt(price)}</span>
              <span style={{
                color: isPositive ? 'var(--green)' : 'var(--red)',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '16px', fontWeight: 600,
              }}>
                {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                {Math.abs(change24h).toFixed(2)}% (24h)
              </span>
            </div>
          </div>

          {/* Watchlist Button */}
          <WatchlistButton
            coinId={coin.id}
            coinName={coin.name}
            coinSymbol={coin.symbol}
            coinImage={coin.image.large}
            initialWatched={initialWatched}
          />
        </div>

        {/* Chart */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '16px', padding: '24px', marginBottom: '24px',
        }}>
         <PriceChart data={chart.prices} isPositive={isPositive} coinId={id} />
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px', marginBottom: '24px',
        }}>
          {stats.map(stat => (
            <div key={stat.label} style={{
              background: 'var(--card)', border: '1px solid var(--card-border)',
              borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '6px' }}>{stat.label}</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        {coin.description.en && (
          <div style={{
            background: 'var(--card)', border: '1px solid var(--card-border)',
            borderRadius: '16px', padding: '24px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              About {coin.name}
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '14px' }}
              dangerouslySetInnerHTML={{
                __html: coin.description.en.split('. ').slice(0, 5).join('. ') + '.'
              }}
            />
          </div>
        )}
      </main>
    </div>
  )
}