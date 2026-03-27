'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'

interface WatchlistItem {
  id: string
  coin_id: string
  coin_name: string
  coin_symbol: string
  coin_image: string
  added_at: string
}

export default function WatchlistClient({ watchlist }: { watchlist: WatchlistItem[] }) {
  if (watchlist.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 24px',
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
      }}>
        <Star size={48} color="var(--muted)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
          Your watchlist is empty
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
          Browse the markets and click "Add to Watchlist" on any coin
        </p>
        <Link href="/" style={{
          background: '#f97316', color: 'white',
          padding: '10px 24px', borderRadius: '8px',
          textDecoration: 'none', fontSize: '14px', fontWeight: 600,
        }}>
          Browse Markets
        </Link>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid var(--card-border)', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        padding: '10px 20px',
        fontSize: '12px',
        color: 'var(--muted)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid var(--card-border)',
        background: 'var(--card)',
      }}>
        <span>Coin</span>
        <span style={{ textAlign: 'right' }}>Added</span>
      </div>

      {watchlist.map((item) => (
        <Link key={item.id} href={`/coin/${item.coin_id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid var(--card-border)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--card)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {item.coin_image && (
                <img src={item.coin_image} alt={item.coin_name} width={36} height={36}
                  style={{ borderRadius: '50%' }} />
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.coin_name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                  {item.coin_symbol}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '13px' }}>
              {new Date(item.added_at).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}