import store_API from "../shared";
import { Category, CategoryForm } from "../schemas/categories";

class CategoriesService {
    private apiUrl: string;

    constructor(apiUrl: string = `categories`) {
        this.apiUrl = apiUrl;
    }

    async listCategories(): Promise<Category[]> {
        const response = await store_API.get(`${this.apiUrl}`)
        return response.data
    }

    async getCategoriesById(id: string): Promise<Category> {
        const response = await store_API.get(`${this.apiUrl}/${id}`)
        return response.data
    }

    async createCategory(form: CategoryForm): Promise<void> {
        await store_API.post(`${this.apiUrl}`, form)
    }

    async updateCategory(id: string, form: CategoryForm): Promise<void> {
        await store_API.put(`${this.apiUrl}/${id}`, form)
    }

    async deleteCategory(id: string): Promise<void> {
        await store_API.delete(`${this.apiUrl}/${id}`)
    }
}

export default CategoriesService;
