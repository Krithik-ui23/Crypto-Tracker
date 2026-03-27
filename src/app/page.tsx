import { getTopCoins, getGlobalData } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import StatsBar from '@/components/layout/StatsBar'
import CoinTableClient from '@/components/layout/CoinTableClient'

export default async function HomePage() {
  const [coins, global] = await Promise.all([
    getTopCoins(1, 50),
    getGlobalData(),
  ])

  return (
    <div>
      <Navbar />
      <StatsBar data={global} />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
            Cryptocurrency Prices
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            Top 50 coins by market cap — updates every 30s
          </p>
        </div>
        <CoinTableClient initialCoins={coins} />
      </main>
    </div>
  )
}