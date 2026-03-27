'use client'

import { useRealtimeWatchlist } from '@/hooks/useRealtimeWatchlist'
import { useLiveCoins } from '@/hooks/useLiveCoins'
import Link from 'next/link'

interface Props {
  userId: string
}

export default function RealtimeDashboard({ userId }: Props) {
  const watchlist = useRealtimeWatchlist(userId)
  const { data: coins } = useLiveCoins(1, 50)

  // Match live prices to watchlist coins
  const watchlistWithPrices = watchlist.map(item => {
    const liveData = coins?.find((c: any) => c.id === item.coin_id)
    return { ...item, liveData }
  })

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--card-border)',
      borderRadius: '16px', padding: '24px', marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>⭐ My Watchlist</h2>
        <span style={{
          fontSize: '11px', color: 'var(--green)', fontWeight: 600,
          background: '#dcfce7', padding: '2px 8px', borderRadius: '20px',
        }}>
          🔴 LIVE
        </span>
      </div>

      {watchlistWithPrices.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
          {watchlistWithPrices.map(item => (
            <Link key={item.id} href={`/coin/${item.coin_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'var(--background)', border: '1px solid var(--card-border)',
                borderRadius: '10px', cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.coin_image && (
                    <img src={item.coin_image} width={28} height={28}
                      style={{ borderRadius: '50%' }} alt={item.coin_name} />
                  )}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.coin_name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' as const }}>
                      {item.coin_symbol}
                    </div>
                  </div>
                </div>

                {item.liveData && (
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>
                      ${item.liveData.current_price.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: item.liveData.price_change_percentage_24h >= 0 ? 'var(--green)' : 'var(--red)',
                    }}>
                      {item.liveData.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                      {Math.abs(item.liveData.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          No coins yet. Browse <Link href="/" style={{ color: '#f97316' }}>markets</Link> and add some!
        </p>
      )}
    </div>
  )
}