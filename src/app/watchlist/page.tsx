import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import WatchlistClient from '@/components/WatchlistClient'
import { Star } from 'lucide-react'

export default async function WatchlistPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: watchlist } = await supabase
    .from('watchlists')
    .select('*')
    .order('added_at', { ascending: false })

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Star size={28} color="#f97316" fill="#f97316" />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>My Watchlist</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              {watchlist?.length ?? 0} coins tracked
            </p>
          </div>
        </div>
        <WatchlistClient watchlist={watchlist ?? []} />
      </main>
    </div>
  )
}