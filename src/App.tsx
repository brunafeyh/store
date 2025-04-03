import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/query-client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer position="bottom-center" />
				<RouterProvider router={router} />
		</QueryClientProvider>
	)
}
