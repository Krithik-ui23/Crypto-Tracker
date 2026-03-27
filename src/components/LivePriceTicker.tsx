'use client'

import { useLiveCoins } from '@/hooks/useLiveCoins'
import { useEffect, useState } from 'react'

export default function LivePriceTicker() {
  const { data: coins, dataUpdatedAt } = useLiveCoins(1, 10)
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    if (dataUpdatedAt) {
      setLastUpdated(new Date(dataUpdatedAt).toLocaleTimeString())
    }
  }, [dataUpdatedAt])

  if (!coins) return null

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--card-border)',
      borderRadius: '12px',
      padding: '16px 20px',
      marginBottom: '24px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <span style={{ fontSize: '13px', fontWeight: 600 }}>
          🔴 Live Prices
        </span>
        {lastUpdated && (
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
            Updated: {lastUpdated}
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '24px',
        overflowX: 'auto' as const,
        paddingBottom: '4px',
      }}>
        {coins.slice(0, 8).map((coin: any) => {
          const isPositive = coin.price_change_percentage_24h >= 0
          return (
            <div key={coin.id} style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '4px',
              minWidth: '80px',
            }}>
              <img src={coin.image} alt={coin.name} width={24} height={24}
                style={{ borderRadius: '50%' }} />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                {coin.symbol.toUpperCase()}
              </span>
              <span style={{ fontSize: '12px' }}>
                ${coin.current_price.toLocaleString()}
              </span>
              <span style={{
                fontSize: '11px',
                color: isPositive ? 'var(--green)' : 'var(--red)',
                fontWeight: 600,
              }}>
                {isPositive ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}