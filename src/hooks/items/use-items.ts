import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import ItemService from '../../service/item'
import { FilterItemParamns, Item } from '../../schemas/item'

const service = new ItemService()

export const useItems = (filters?: FilterItemParamns) => {
    const fetchItems = async (): Promise<Item[]> => {
        return await service.listAll(filters)
    }

    const options: UseQueryOptions<Item[], Error> = {
        queryKey: ['items', filters],
        queryFn: fetchItems,
    }

    return useQuery(options)
}
