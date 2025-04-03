import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/query-client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
		</QueryClientProvider>
	)
}
