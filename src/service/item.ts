import store_API from "../shared";
import { Item, ItemForm } from "../schemas/item";

class ItemService {
    private apiUrl: string;

    constructor(apiUrl: string = `items`) {
        this.apiUrl = apiUrl;
    }

    async listItems(): Promise<Item[]> {
        const response = await store_API.get(`${this.apiUrl}`)
        return response.data
    }

    async getItemById(id: string): Promise<Item> {
        const response = await store_API.get(`${this.apiUrl}/${id}`)
        return response.data
    }

    async createItem(form: ItemForm): Promise<void> {
        await store_API.post(`${this.apiUrl}`, form)
    }

    async updateItem(id: string, form: ItemForm): Promise<void> {
        await store_API.put(`${this.apiUrl}/${id}`, form)
    }

    async deleteItem(id: string): Promise<void> {
        await store_API.delete(`${this.apiUrl}/${id}`)
    }
}

export default ItemService;
