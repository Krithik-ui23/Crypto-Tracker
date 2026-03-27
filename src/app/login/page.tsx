'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleSignup() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setError('Check your email to confirm your account!')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '40px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
          <TrendingUp size={28} color="#f97316" />
          <span style={{ fontSize: '22px', fontWeight: 700 }}>CryptoTrack</span>
        </div>

        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
          Welcome back
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px', textAlign: 'center' }}>
          Sign in to access your watchlist and portfolio
        </p>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box' as const,
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box' as const,
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            background: error.includes('Check') ? '#dcfce7' : '#fee2e2',
            color: error.includes('Check') ? '#16a34a' : '#dc2626',
            fontSize: '13px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        {/* Buttons */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#f97316',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '12px',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--card-border)',
            background: 'transparent',
            color: 'var(--foreground)',
            fontSize: '15px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          Create Account
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: '#f97316', textDecoration: 'none' }}>
            ← Back to Markets
          </Link>
        </p>
      </div>
    </div>
  )
}