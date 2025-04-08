import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ItemService from '../../service/item'
import { Item } from '../../schemas/item'

const service = new ItemService()

export const useItemByid = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery<Item>({
        queryKey: ['item', id],
        queryFn: async () => {
            try {
                return await service.getItemById(id);
            } catch (error) {
                toast.error('Erro ao carregar o Item: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
