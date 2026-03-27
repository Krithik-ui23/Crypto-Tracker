'use client'

import { useLiveCoins } from '@/hooks/useLiveCoins'
import CoinRow from '@/components/layout/CoinRow'
import { CoinMarket } from '@/lib/api'

export default function CoinTableClient({ initialCoins }: { initialCoins: CoinMarket[] }) {
  const { data: liveCoins } = useLiveCoins(1, 50)
  const coins = liveCoins ?? initialCoins

  return (
    <div style={{
      border: '1px solid var(--card-border)',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 1fr 120px 120px',
        padding: '10px 20px',
        fontSize: '12px',
        color: 'var(--muted)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid var(--card-border)',
        background: 'var(--card)',
        gap: '8px',
      }}>
        <span>#</span>
        <span>Coin</span>
        <span style={{ textAlign: 'right' }}>Price</span>
        <span style={{ textAlign: 'right' }}>1h %</span>
        <span style={{ textAlign: 'right' }}>24h %</span>
        <span style={{ textAlign: 'right' }}>7d %</span>
        <span style={{ textAlign: 'right' }}>Market Cap</span>
        <span style={{ textAlign: 'right' }}>7d Chart</span>
      </div>

      {coins.map((coin) => (
        <CoinRow key={coin.id} coin={coin} />
      ))}
    </div>
  )
}