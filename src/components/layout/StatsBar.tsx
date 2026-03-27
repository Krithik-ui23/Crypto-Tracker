"use client"

import { GlobalData } from "@/lib/api"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface StatsBarProps {
  data: GlobalData
}

export default function StatsBar({ data }: StatsBarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    active_cryptocurrencies,
    total_market_cap,
    total_volume,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
  } = data.data

  const isPositive = market_cap_change_percentage_24h_usd >= 0

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(n)

  if (!mounted) return null

  return (
    <div
      style={{
        borderBottom: "1px solid var(--card-border)",
        background: "var(--card)",
        padding: "8px 0",
        fontSize: "12px",
        color: "var(--muted)",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <span>
          Coins:{" "}
          <strong style={{ color: "var(--foreground)" }}>
            {active_cryptocurrencies.toLocaleString()}
          </strong>
        </span>

        <span>
          Market Cap:{" "}
          <strong style={{ color: "var(--foreground)" }}>
            {fmt(total_market_cap.usd)}
          </strong>
        </span>

        <span>
          24h Vol:{" "}
          <strong style={{ color: "var(--foreground)" }}>
            {fmt(total_volume.usd)}
          </strong>
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          24h Change:{" "}
          <strong
            style={{
              color: isPositive ? "var(--green)" : "var(--red)",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(market_cap_change_percentage_24h_usd).toFixed(2)}%
          </strong>
        </span>

        <span>
          BTC Dom:{" "}
          <strong style={{ color: "var(--foreground)" }}>
            {market_cap_percentage.btc.toFixed(1)}%
          </strong>
        </span>

        <span>
          ETH Dom:{" "}
          <strong style={{ color: "var(--foreground)" }}>
            {market_cap_percentage.eth.toFixed(1)}%
          </strong>
        </span>
      </div>
    </div>
  )
}