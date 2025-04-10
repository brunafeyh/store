import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { AdminHome } from './pages/admin/home'
import { CategoriesPage } from './pages/admin/categories'
import { BrandsPage } from './pages/admin/brands'
import { ItemsPage } from './pages/admin/items'
import { StockPage } from './pages/admin/stock'
import { ClientsPage } from './pages/admin/clients'
import { EmployeesPage } from './pages/admin/employees'
import { HomePage } from './pages/client/home'
import { CategoriesItems } from './pages/client/categories'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/admin',
				element: <AdminHome />,
			},

			{
				path: '/categories',
				element: <CategoriesItems />,
			},

			{
				path: '/admin/dashboard',
				element: <AdminHome />,
			},
			{
				path: '/admin/products/categories',
				element: <CategoriesPage />,
			},
			{
				path: '/admin/products/brands',
				element: <BrandsPage />,
			},

			{
				path: '/admin/products/items',
				element: <ItemsPage />,
			},
			{
				path: '/admin/products/stock',
				element: <StockPage />,
			},
			{
				path: '/admin/clients',
				element: <ClientsPage />,
			},
			{
				path: '/admin/employees',
				element: <EmployeesPage />,
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
