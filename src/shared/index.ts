import axios from 'axios'

const sao_API = axios.create({
	baseURL: import.meta.env.VITE_SAO_API,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
	},
})

export default sao_API
