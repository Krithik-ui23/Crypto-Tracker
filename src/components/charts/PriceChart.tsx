'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  data: [number, number][]
  isPositive: boolean
}

const RANGES = [
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
]

export default function PriceChart({ data, isPositive }: PriceChartProps) {
  const [activeRange, setActiveRange] = useState('7D')

  const chartData = data.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: parseFloat(price.toFixed(2)),
  }))

  const color = isPositive ? '#22c55e' : '#ef4444'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px',
        }}>
          <div style={{ color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
          <div style={{ fontWeight: 700 }}>
            ${payload[0].value.toLocaleString()}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      {/* Range selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {RANGES.map(range => (
          <button
            key={range.label}
            onClick={() => setActiveRange(range.label)}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              background: activeRange === range.label ? color : 'transparent',
              color: activeRange === range.label ? 'white' : 'var(--muted)',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            {range.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
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