import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/shared'

// fails in 25% of requests
const MOCK_API_URL = 'https://httpstat.us/random/200,200,200,503?sleep=500'

const MOCK_BACKEND = {
  flightsQuota: 2,
}

const flightsQuotaFetch = async () => {
  const response = await fetch(MOCK_API_URL)
  if (!response.ok) throw new Error('Unable to fetch Flights Quota')
  return MOCK_BACKEND.flightsQuota
}

type FlightQuota = {
  quota: number
  motive: string
}

const flightsQuotaUpdate = async ({ quota, motive }: FlightQuota) => {
  const response = await fetch(MOCK_API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quota, motive }),
  })
  if (!response.ok) throw new Error('Unable to update Flights Quota')
  MOCK_BACKEND.flightsQuota = quota
  return MOCK_BACKEND.flightsQuota
}

export const useFlightsQuotaQuery = () =>
  useQuery({
    queryKey: [QUERY_KEYS.flightsQuota],
    queryFn: flightsQuotaFetch,
  })

export const useFlightsQuotaMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: flightsQuotaUpdate,
    onMutate: async ({ quota }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.flightsQuota] })
      const previousQuota = queryClient.getQueryData([QUERY_KEYS.flightsQuota])
      queryClient.setQueryData([QUERY_KEYS.flightsQuota], () => quota)

      return { previousQuota }
    },
    onError: (_err, _newQuota, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.flightsQuota],
        context?.previousQuota
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.flightsQuota] })
    },
  })
}
