'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export interface WatchlistItem {
  id: string
  coin_id: string
  coin_name: string
  coin_symbol: string
  coin_image: string
}

export function useRealtimeWatchlist(userId: string | null) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    // Initial fetch
    supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) setWatchlist(data)
      })

    // Realtime subscription
    const channel = supabase
      .channel('watchlist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'watchlists',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setWatchlist(prev => [...prev, payload.new as WatchlistItem])
          } else if (payload.eventType === 'DELETE') {
            setWatchlist(prev => prev.filter(item => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return watchlist
}