import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CategoriesService from '../../service/categories';
import { CategoryForm } from '../../schemas/categories';

const service = new CategoriesService();

export const useCategoriesMutations = () => {
    const queryClient = useQueryClient()

    const createCategory = useMutation({
        mutationFn: async (form: CategoryForm) => {
            return service.createCategory(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoria criada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Categoria:', error);
            toast.error('Erro ao criar Categoria.');
        },
    })

    const updateCategory = useMutation({
        mutationFn: async ({id, form}: {id: string, form: CategoryForm}) => {
            return service.updateCategory(id, form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoria atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Categoria:', error);
            toast.error('Erro ao atualizar Categoria.');
        },
    })

    const deleteCategory = useMutation({
        mutationFn: async (id: string) => {
            return service.deleteCategory(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoria deletada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao deletar Categoria:', error);
            toast.error('Erro ao deletar Categoria.');
        },
    })

    return {
        createCategory,
        deleteCategory,
        updateCategory
    }
}
