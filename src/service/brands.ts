import store_API from "../shared";
import { Brand, BrandForm } from "../schemas/brand";

class BrandsService {
    private apiUrl: string;

    constructor(apiUrl: string = `brands`) {
        this.apiUrl = apiUrl;
    }

    async listBrands(): Promise<Brand[]> {
        const response = await store_API.get(`${this.apiUrl}`)
        return response.data
    }

    async getBrandsById(id: string): Promise<Brand> {
        const response = await store_API.get(`${this.apiUrl}/${id}`)
        return response.data
    }

    async createBrand(form: BrandForm): Promise<void> {
        await store_API.post(`${this.apiUrl}`, form)
    }

    async updateBrand(id: string, form: BrandForm): Promise<void> {
        await store_API.put(`${this.apiUrl}/${id}`, form)
    }

    async deleteBrand(id: string): Promise<void> {
        await store_API.delete(`${this.apiUrl}/${id}`)
    }
}

export default BrandsService;
