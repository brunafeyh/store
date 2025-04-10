import { User } from "../schemas/person";
import store_API from "../shared";

class UserService {
    private apiUrl: string;

    constructor(apiUrl: string = `clients`) {
        this.apiUrl = apiUrl;
    }

    async listUsers(): Promise<User[]> {
        const response = await store_API.get(`users/${this.apiUrl}`)
        return response.data
    }

}

export default UserService
