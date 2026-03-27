"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CoinMarket } from "@/lib/api"

interface CoinRowProps {
  coin: CoinMarket
}

function Sparkline({ prices }: { prices: number[] }) {
  if (!prices || prices.length === 0) return null

  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  const w = 100
  const h = 36

  const filtered = prices.filter((_, i) => i % Math.ceil(prices.length / 20) === 0)

  const points = filtered
    .map((price, i) => {
      const x = (i / (filtered.length - 1)) * w
      const y = h - ((price - min) / range) * h
      return `${x},${y}`
    })
    .join(" ")

  const isPositive = prices[prices.length - 1] >= prices[0]

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "var(--green)" : "var(--red)"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PriceChange({ value }: { value: number }) {
  if (value === null || value === undefined || isNaN(value)) {
    return <span style={{ color: "var(--muted)", fontSize: "14px" }}>—</span>
  }

  const isPositive = value >= 0

  return (
    <span style={{ color: isPositive ? "var(--green)" : "var(--red)", fontSize: "14px" }}>
      {isPositive ? "▲" : "▼"} {Math.abs(value).toFixed(2)}%
    </span>
  )
}

export default function CoinRow({ coin }: CoinRowProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n)

  const fmtCompact = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(n)

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <Link href={`/coin/${coin.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 2fr 1fr 1fr 1fr 1fr 120px 120px",
          alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid var(--card-border)",
          transition: "background 0.15s",
          cursor: "pointer",
          gap: "8px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {/* Rank */}
        <span style={{ color: "var(--muted)", fontSize: "13px" }}>{coin.market_cap_rank}</span>

        {/* Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={coin.image} alt={coin.name} width={32} height={32} style={{ borderRadius: "50%" }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>{coin.name}</div>
            <div style={{ color: "var(--muted)", fontSize: "12px", textTransform: "uppercase" }}>
              {coin.symbol}
            </div>
          </div>
        </div>

        {/* Price */}
        <span style={{ fontWeight: 600, fontSize: "15px" }}>{fmt(coin.current_price)}</span>

        {/* Changes */}
        <PriceChange value={coin.price_change_percentage_1h_in_currency} />
        <PriceChange value={coin.price_change_percentage_24h} />
        <PriceChange value={coin.price_change_percentage_7d_in_currency} />

        {/* Market Cap */}
        <span style={{ color: "var(--muted)", fontSize: "13px" }}>{fmtCompact(coin.market_cap)}</span>

        {/* Sparkline */}
        <Sparkline prices={coin.sparkline_in_7d?.price || []} />
      </div>
    </Link>
  )
}