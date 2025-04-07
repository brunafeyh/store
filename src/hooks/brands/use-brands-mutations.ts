import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import BrandsService from '../../service/brands';
import { BrandForm } from '../../schemas/brand';

const service = new BrandsService();

export const useBrandsMutations = () => {
    const queryClient = useQueryClient()

    const createBrand = useMutation({
        mutationFn: async (form: BrandForm) => {
            return service.createBrand(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Marca criada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Marca:', error);
            toast.error('Erro ao criar Marca.');
        },
    })

    const updateBrand = useMutation({
        mutationFn: async ({id, form}: {id: string, form: BrandForm}) => {
            return service.updateBrand(id, form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Marca atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Marca:', error);
            toast.error('Erro ao atualizar Marca.');
        },
    })

    const deleteBrand = useMutation({
        mutationFn: async (id: string) => {
            return service.deleteBrand(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Marca deletada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao deletar Marca:', error);
            toast.error('Erro ao deletar Marca.');
        },
    })

    return {
        createBrand,
        deleteBrand,
        updateBrand
    }
}
