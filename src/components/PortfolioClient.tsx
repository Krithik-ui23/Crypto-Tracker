'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Briefcase, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface PortfolioItem {
  id: string
  coin_id: string
  coin_name: string
  coin_symbol: string
  coin_image: string
  quantity: number
  buy_price: number
  bought_at: string
}

export default function PortfolioClient({ portfolio: initial }: { portfolio: PortfolioItem[] }) {
  const [portfolio, setPortfolio] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [coinId, setCoinId] = useState('')
  const [coinName, setCoinName] = useState('')
  const [coinSymbol, setCoinSymbol] = useState('')
  const [coinImage, setCoinImage] = useState('')
  const [quantity, setQuantity] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleAdd() {
    if (!coinId || !quantity || !buyPrice) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data, error } = await supabase.from('portfolios').insert({
      user_id: user.id,
      coin_id: coinId,
      coin_name: coinName || coinId,
      coin_symbol: coinSymbol || coinId,
      coin_image: coinImage,
      quantity: parseFloat(quantity),
      buy_price: parseFloat(buyPrice),
    }).select().single()

    if (!error && data) {
      setPortfolio(prev => [data, ...prev])
      setCoinId(''); setCoinName(''); setCoinSymbol('')
      setCoinImage(''); setQuantity(''); setBuyPrice('')
      setShowForm(false)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('portfolios').delete().eq('id', id)
    setPortfolio(prev => prev.filter(p => p.id !== id))
  }

  const totalValue = portfolio.reduce((sum, p) => sum + p.quantity * p.buy_price, 0)

  return (
    <div>
      {/* Summary card */}
      {portfolio.length > 0 && (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '12px', padding: '20px', marginBottom: '24px',
          display: 'flex', gap: '32px',
        }}>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>Total Invested</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>Positions</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{portfolio.length}</div>
          </div>
        </div>
      )}

      {/* Add button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 20px', borderRadius: '8px', border: 'none',
            background: '#f97316', color: 'white',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Add Position
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '12px', padding: '20px', marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Add New Position</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Coin ID (e.g. bitcoin)', value: coinId, set: setCoinId },
              { label: 'Coin Name (e.g. Bitcoin)', value: coinName, set: setCoinName },
              { label: 'Symbol (e.g. BTC)', value: coinSymbol, set: setCoinSymbol },
              { label: 'Image URL (optional)', value: coinImage, set: setCoinImage },
              { label: 'Quantity', value: quantity, set: setQuantity },
              { label: 'Buy Price (USD)', value: buyPrice, set: setBuyPrice },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px', color: 'var(--muted)' }}>
                  {field.label}
                </label>
                <input
                  value={field.value}
                  onChange={e => field.set(e.target.value)}
                  style={{
                    width: '100%', padding: '8px 12px', borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)', color: 'var(--foreground)',
                    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button
              onClick={handleAdd}
              disabled={loading}
              style={{
                padding: '8px 20px', borderRadius: '8px', border: 'none',
                background: '#f97316', color: 'white',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: '8px 20px', borderRadius: '8px',
                border: '1px solid var(--card-border)',
                background: 'transparent', color: 'var(--muted)',
                fontSize: '14px', cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Portfolio table */}
      {portfolio.length > 0 ? (
        <div style={{ border: '1px solid var(--card-border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
            padding: '10px 20px', fontSize: '12px', color: 'var(--muted)',
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
            borderBottom: '1px solid var(--card-border)', background: 'var(--card)',
          }}>
            <span>Coin</span>
            <span style={{ textAlign: 'right' }}>Quantity</span>
            <span style={{ textAlign: 'right' }}>Buy Price</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span />
          </div>
          {portfolio.map(item => (
            <div key={item.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
              alignItems: 'center', padding: '14px 20px',
              borderBottom: '1px solid var(--card-border)',
            }}>
              <Link href={`/coin/${item.coin_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.coin_image && (
                    <img src={item.coin_image} width={32} height={32}
                      style={{ borderRadius: '50%' }} alt={item.coin_name} />
                  )}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.coin_name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      {item.coin_symbol}
                    </div>
                  </div>
                </div>
              </Link>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>{item.quantity}</div>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>${item.buy_price.toLocaleString()}</div>
              <div style={{ textAlign: 'right', fontSize: '14px', fontWeight: 600 }}>
                ${(item.quantity * item.buy_price).toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '4px' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '16px',
        }}>
          <Briefcase size={48} color="var(--muted)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No positions yet</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            Click "Add Position" to start tracking your holdings
          </p>
        </div>
      )}
    </div>
  )
}