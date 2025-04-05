import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CategoriesService from '../../service/categories'
import { Category } from '../../schemas/categories'

const service = new CategoriesService()

export const useCategorieByid = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery<Category>({
        queryKey: ['category', id],
        queryFn: async () => {
            try {
                return await service.getCategoriesById(id);
            } catch (error) {
                toast.error('Erro ao carregar a Categoria: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
