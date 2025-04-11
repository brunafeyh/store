import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import BrandsService from '../../service/brands'
import { Brand, FilterBrandParamns } from '../../schemas/brand'

const service = new BrandsService()

export const useBrands = (filters?: FilterBrandParamns) => {
    const { data, isLoading, error, refetch } = useQuery<Brand[]>({
        queryKey: ['brands', filters],
        queryFn: async () => {
            try {
                return await service.listAll(filters);
            } catch (error) {
                toast.error('Erro ao carregar as Marcas: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
