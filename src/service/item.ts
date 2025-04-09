import store_API from "../shared";
import { FilterItemParamns, Item, ItemForm, StockItemForm } from "../schemas/item";
import { AxiosResponse } from "axios";

class ItemService {
    private apiUrl: string;

    constructor(apiUrl: string = `items`) {
        this.apiUrl = apiUrl;
    }

    async listAll(
		filters?: FilterItemParamns,
	): Promise<Item[]> {
		const response: AxiosResponse<Item[]> = await store_API.get(`${this.apiUrl}`, {
			params: { ...filters, },
		})
		return response.data
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

    async updateStockItem(id: string, form: StockItemForm): Promise<void> {
        await store_API.patch(`${this.apiUrl}/${id}`, form)
    }

    async deleteItem(id: string): Promise<void> {
        await store_API.delete(`${this.apiUrl}/${id}`)
    }
}

export default ItemService;
