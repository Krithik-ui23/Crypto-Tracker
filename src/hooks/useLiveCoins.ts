'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchCoins(page: number, perPage: number) {
  const res = await fetch(`/api/coins?page=${page}&perPage=${perPage}`)
  if (!res.ok) throw new Error('Failed to fetch coins')
  return res.json()
}

export function useLiveCoins(page = 1, perPage = 50) {
  return useQuery({
    queryKey: ['coins', page, perPage],
    queryFn: () => fetchCoins(page, perPage),
    refetchInterval: 30000, // refresh every 30 seconds
  })
}