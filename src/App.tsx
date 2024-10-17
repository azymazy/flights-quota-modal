import { PageFlightsQuota } from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageFlightsQuota />
    </QueryClientProvider>
  )
}
