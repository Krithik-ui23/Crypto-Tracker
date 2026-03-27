'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Star } from 'lucide-react'

interface Props {
  coinId: string
  coinName: string
  coinSymbol: string
  coinImage: string
  initialWatched: boolean
}

export default function WatchlistButton({ coinId, coinName, coinSymbol, coinImage, initialWatched }: Props) {
  const [watched, setWatched] = useState(initialWatched)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function toggle() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    if (watched) {
      await supabase.from('watchlists').delete().match({ user_id: user.id, coin_id: coinId })
      setWatched(false)
    } else {
      await supabase.from('watchlists').insert({
        user_id: user.id,
        coin_id: coinId,
        coin_name: coinName,
        coin_symbol: coinSymbol,
        coin_image: coinImage,
      })
      setWatched(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '10px 20px', borderRadius: '8px',
        border: `1px solid ${watched ? '#f97316' : 'var(--card-border)'}`,
        background: watched ? '#fff7ed' : 'transparent',
        color: watched ? '#f97316' : 'var(--muted)',
        cursor: 'pointer', fontSize: '14px', fontWeight: 600,
        transition: 'all 0.15s',
      }}
    >
      <Star size={16} fill={watched ? '#f97316' : 'none'} />
      {watched ? 'Watching' : 'Add to Watchlist'}
    </button>
  )
}