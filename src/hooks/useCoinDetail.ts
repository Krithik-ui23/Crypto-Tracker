'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchCoinDetail(id: string) {
  const res = await fetch(`/api/coins/${id}`)
  if (!res.ok) throw new Error('Failed to fetch coin')
  return res.json()
}

export function useCoinDetail(id: string) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetail(id),
    refetchInterval: 30000,
  })
}