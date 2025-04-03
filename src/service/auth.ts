import axios from 'axios'
import { CreateAccountSubmitFormData, LoginFormData } from '../schemas/auth'

export class AuthService {
	private apiUrl = import.meta.env.VITE_STORE_API

    private endpointUrl = 'auth'

	async createClient(form: CreateAccountSubmitFormData): Promise<void> {
		await axios.post(`${this.apiUrl}${this.endpointUrl}/register/client`, form)
	}

	async login(form: LoginFormData): Promise<string> {
		const response = await axios.post(`${this.apiUrl}${this.endpointUrl}/login`, form)
        return response.data.token
	}
}
