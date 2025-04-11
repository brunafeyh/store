import store_API from "../shared";
import { Category, CategoryForm, FilterCategoryParamns } from "../schemas/categories";
import { AxiosResponse } from "axios";

class CategoriesService {
    private apiUrl: string;

    constructor(apiUrl: string = `categories`) {
        this.apiUrl = apiUrl;
    }

    async listAll(
        filters?: FilterCategoryParamns,
    ): Promise<Category[]> {
        const response: AxiosResponse<Category[]> = await store_API.get(`${this.apiUrl}`, {
            params: { ...filters, },
        })
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
