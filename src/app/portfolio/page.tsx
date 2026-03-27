import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import PortfolioClient from '@/components/PortfolioClient'
import { Briefcase } from 'lucide-react'

export default async function PortfolioPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .order('bought_at', { ascending: false })

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Briefcase size={28} color="#f97316" />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>My Portfolio</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              {portfolio?.length ?? 0} positions
            </p>
          </div>
        </div>
        <PortfolioClient portfolio={portfolio ?? []} />
      </main>
    </div>
  )
}