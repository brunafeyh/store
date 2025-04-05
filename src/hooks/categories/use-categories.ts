import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CategoriesService from '../../service/categories'
import { Category } from '../../schemas/categories'

const service = new CategoriesService()

export const useCategories = () => {
    const { data, isLoading, error, refetch } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                return await service.listCategories();
            } catch (error) {
                toast.error('Erro ao carregar as Categorias: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
