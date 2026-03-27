import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import LogoutButton from "@/components/LogoutButton"
import SearchBar from "@/components/SearchBar"
import ThemeToggle from "@/components/ThemeToggle"

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--card-border)",
        background: "var(--background)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "var(--foreground)",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          <TrendingUp size={24} color="#f97316" />
          CryptoTrack
        </Link>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href="/"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Markets
          </Link>

          <Link
            href="/watchlist"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Watchlist
          </Link>

          <Link
            href="/portfolio"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Portfolio
          </Link>

          {/* Only ONE SearchBar */}
          <SearchBar />

          {/* Only ONE Theme Toggle */}
          <ThemeToggle />

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link
                href="/dashboard"
                style={{
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Dashboard
              </Link>

              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                background: "#f97316",
                color: "white",
                padding: "8px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}