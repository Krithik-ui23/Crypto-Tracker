'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  data: [number, number][]
  isPositive: boolean
  coinId: string
}

const RANGES = [
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
]

function formatData(raw: [number, number][]) {
  if (!raw || !Array.isArray(raw)) return []
  return raw.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: parseFloat(price.toFixed(2)),
  }))
}

export default function PriceChart({ data, isPositive, coinId }: PriceChartProps) {
  const [activeRange, setActiveRange] = useState('7D')
  const [formatted, setFormatted] = useState(() => formatData(data))
  const [loading, setLoading] = useState(false)

  const color = isPositive ? '#22c55e' : '#ef4444'

  async function handleRangeChange(range: { label: string; days: number }) {
    if (range.label === activeRange) return

    setActiveRange(range.label)
    setLoading(true)

    try {
      const res = await fetch(`/api/coins/${coinId}/chart?days=${range.days}`)
      const json = await res.json()

      if (json.prices) {
        setFormatted(formatData(json.prices))
      }
    } catch (e) {
      console.error('Chart fetch failed', e)
    }

    setLoading(false)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'var(--background)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '13px',
          }}
        >
          <div style={{ color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
          <div style={{ fontWeight: 700 }}>${payload[0].value.toLocaleString()}</div>
        </div>
      )
    }
    return null
  }

  if (!formatted.length) {
    return (
      <div
        style={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
        }}
      >
        No chart data available
      </div>
    )
  }

  return (
    <div>
      {/* Title + Range selector */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>
          Price Chart ({activeRange})
        </h2>

        <div style={{ display: 'flex', gap: '8px' }}>
          {RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => handleRangeChange(range)}
              disabled={loading}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
                background: activeRange === range.label ? color : 'transparent',
                color: activeRange === range.label ? 'white' : 'var(--muted)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.15s',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {range.label}
            </button>
          ))}

          {loading && (
            <span style={{ color: 'var(--muted)', fontSize: '13px', alignSelf: 'center' }}>
              Loading...
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={formatted} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v.toLocaleString()}`}
            width={80}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}