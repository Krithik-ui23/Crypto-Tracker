'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  name: string
  symbol: string
  thumb: string
  market_cap_rank: number
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.coins?.slice(0, 6) ?? [])
      } catch {
        setResults([])
      }
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  function handleSelect(id: string) {
    setQuery('')
    setResults([])
    setOpen(false)
    router.push(`/coin/${id}`)
  }

  return (
    <div ref={ref} style={{ position: 'relative', width: '280px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--card)', border: '1px solid var(--card-border)',
        borderRadius: '8px', padding: '8px 12px',
      }}>
        <Search size={15} color="var(--muted)" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search coins..."
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: 'var(--foreground)', fontSize: '14px', width: '100%',
          }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--muted)' }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (query || results.length > 0) && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: '4px', background: 'var(--card)',
          border: '1px solid var(--card-border)', borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 100,
          overflow: 'hidden',
        }}>
          {loading && (
            <div style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '13px' }}>
              Searching...
            </div>
          )}
          {!loading && results.length === 0 && query && (
            <div style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '13px' }}>
              No results for "{query}"
            </div>
          )}
          {results.map(coin => (
            <div
              key={coin.id}
              onClick={() => handleSelect(coin.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 16px', cursor: 'pointer',
                borderBottom: '1px solid var(--card-border)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--background)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {coin.thumb && (
                <img src={coin.thumb} alt={coin.name} width={24} height={24}
                  style={{ borderRadius: '50%' }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{coin.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                  {coin.symbol}
                </div>
              </div>
              {coin.market_cap_rank && (
                <span style={{
                  fontSize: '11px', color: 'var(--muted)',
                  background: 'var(--background)', padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  #{coin.market_cap_rank}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}