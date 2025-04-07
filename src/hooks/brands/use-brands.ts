import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import BrandsService from '../../service/brands'
import { Brand } from '../../schemas/brand'

const service = new BrandsService()

export const useBrands = () => {
    const { data, isLoading, error, refetch } = useQuery<Brand[]>({
        queryKey: ['brands'],
        queryFn: async () => {
            try {
                return await service.listBrands();
            } catch (error) {
                toast.error('Erro ao carregar as Marcas: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
