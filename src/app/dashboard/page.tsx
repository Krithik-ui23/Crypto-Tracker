import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import LivePriceTicker from '@/components/LivePriceTicker'
import RealtimeDashboard from '@/components/RealtimeDashboard'
import { User } from 'lucide-react'

export default async function DashboardPage() {
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

        {/* Welcome header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700 }}>My Dashboard</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{user.email}</p>
          </div>
        </div>

        {/* Live price ticker */}
        <LivePriceTicker />

        {/* Realtime watchlist with live prices */}
        <RealtimeDashboard userId={user.id} />

        {/* Portfolio */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '16px', padding: '24px',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>💼 My Portfolio</h2>
          {portfolio && portfolio.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px' }}>
              <thead>
                <tr style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' as const }}>
                  <th style={{ textAlign: 'left' as const, padding: '8px 0' }}>Coin</th>
                  <th style={{ textAlign: 'right' as const, padding: '8px 0' }}>Quantity</th>
                  <th style={{ textAlign: 'right' as const, padding: '8px 0' }}>Buy Price</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item: any) => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--card-border)' }}>
                    <td style={{ padding: '12px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.coin_image && (
                          <img src={item.coin_image} width={24} height={24}
                            style={{ borderRadius: '50%' }} alt={item.coin_name} />
                        )}
                        <span style={{ fontWeight: 600 }}>{item.coin_name}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' as const, padding: '12px 0' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' as const, padding: '12px 0' }}>${item.buy_price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              No portfolio entries yet. Add coins from their detail pages!
            </p>
          )}
        </div>
      </main>
    </div>
  )
}