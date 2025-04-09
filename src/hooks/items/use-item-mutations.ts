import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ItemService from '../../service/item';
import { ItemForm, StockItemForm } from '../../schemas/item';

const service = new ItemService();

export const useItemsMutations = () => {
    const queryClient = useQueryClient()

    const createItem = useMutation({
        mutationFn: async (form: ItemForm) => {
            return service.createItem(form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item criado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao criar Item:', error);
            toast.error('Erro ao criar Item.');
        },
    })

    const updateItem = useMutation({
        mutationFn: async ({ id, form }: { id: string, form: ItemForm }) => {
            return service.updateItem(id, form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item atualizado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Item:', error);
            toast.error('Erro ao atualizar Item.');
        },
    })
    const updateStockItem = useMutation({
        mutationFn: async ({ id, form }: { id: string, form: StockItemForm }) => {
            return service.updateStockItem(id, form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Estoque de Item atualizado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar Estoque de Item:', error);
            toast.error('Erro ao atualizar Estoque de Item.');
        },
    })

    const deleteItem = useMutation({
        mutationFn: async (id: string) => {
            return service.deleteItem(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            toast.success('Item deletado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao deletar Item:', error);
            toast.error('Erro ao deletar Item.');
        },
    })

    return {
        createItem,
        deleteItem,
        updateItem,
        updateStockItem
    }
}
