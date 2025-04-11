import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CategoriesService from '../../service/categories'
import { Category, FilterCategoryParamns } from '../../schemas/categories'

const service = new CategoriesService()

export const useCategories = (filters?: FilterCategoryParamns) => {
    const { data, isLoading, error, refetch } = useQuery<Category[]>({
        queryKey: ['categories', filters],
        queryFn: async () => {
            try {
                return await service.listAll(filters);
            } catch (error) {
                toast.error('Erro ao carregar as Categorias: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
