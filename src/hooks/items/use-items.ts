import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ItemService from '../../service/item'
import { Item } from '../../schemas/item'

const service = new ItemService()

export const useItems = () => {
    const { data, isLoading, error, refetch } = useQuery<Item[]>({
        queryKey: ['items'],
        queryFn: async () => {
            try {
                return await service.listItems();
            } catch (error) {
                toast.error('Erro ao carregar os Itens: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
