import axios from 'axios'
import { ACCESS_TOKEN_KEY } from '../utils/constants/auth'

const token = localStorage.getItem(ACCESS_TOKEN_KEY)

const store_API = axios.create({
	baseURL: import.meta.env.VITE_STORE_API,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
		Authorization: `Bearer ${token ? JSON.parse(token) : ''}`,
	},
})

export default store_API