'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        background: 'transparent',
        color: 'var(--muted)',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 500,
      }}
    >
      Sign Out
    </button>
  )
}