import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import BrandsService from '../../service/brands'
import { Brand } from '../../schemas/brand'

const service = new BrandsService()

export const useBrandByid = (id?: string) => {
    const { data, isLoading, error, refetch } = useQuery<Brand>({
        queryKey: ['brand', id],
        queryFn: async () => {
            try {
                return await service.getBrandsById(id || '');
            } catch (error) {
                toast.error('Erro ao carregar a Marca: ' + error);
                throw error;
            }
        },
        enabled: !!id
    })

    return { data, isLoading, error, refetch }
}
