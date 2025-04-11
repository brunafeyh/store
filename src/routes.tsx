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
import { BrandsItemsPage } from './pages/client/brands'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'categories',
				element: <CategoriesItems />,
			},
			{
				path: 'brands',
				element: <BrandsItemsPage />,
			},
			{
				path: 'admin',
				children: [
					{
						index: true,
						element: <AdminHome />,
					},
					{
						path: 'dashboard',
						element: <AdminHome />,
					},
					{
						path: 'products',
						children: [
							{
								path: 'categories',
								element: <CategoriesPage />,
							},
							{
								path: 'brands',
								element: <BrandsPage />,
							},
							{
								path: 'items',
								element: <ItemsPage />,
							},
							{
								path: 'stock',
								element: <StockPage />,
							},
						],
					},
					{
						path: 'clients',
						element: <ClientsPage />,
					},
					{
						path: 'employees',
						element: <EmployeesPage />,
					},
				],
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
