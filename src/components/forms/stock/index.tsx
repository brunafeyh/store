import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../../loading'
import { Box, Button, TextField, Typography } from '@mui/material'
import { THEME_COLORS } from '../../../theme/colors'
import { useItemByid } from '../../../hooks/items/use-item-by-id'
import { StockItemForm as StockItemFormValues, stockItemFormSchema } from '../../../schemas/item'
import { useItemsMutations } from '../../../hooks/items/use-item-mutations'

interface Props {
    onCloseModal: () => void
    id?: string
}

const StockItemForm: FC<Props> = ({ onCloseModal, id }) => {
    const { data, isLoading } = id ? useItemByid(id) : {}

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StockItemFormValues>({
        resolver: zodResolver(stockItemFormSchema),
        values: {
            stock: data?.stock || 0,
        }
    })

    const { updateStockItem } = useItemsMutations()

    const onSubmit = async (data: StockItemFormValues) => {
        console.log(data)
        console.log(id)
        if (id) {
            await updateStockItem.mutateAsync({ id: id, form: data })
            onCloseModal()
        }
    }

    if (updateStockItem.isPending || isLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography mb={2} fontWeight={'bold'} color={THEME_COLORS.neutral.c80}>{`Editar Estoque de Item ${data?.name}`}</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={2} mb={2}>
                <TextField
                    variant='filled'
                    type='number'
                    label='Quantidade em Estoque'
                    {...register('stock', { valueAsNumber: true })}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                />
            </Box>

            <Box display={'flex'} flexDirection={'row'} gap={2}>
                <Button variant='outlined' onClick={onCloseModal} fullWidth>Cancelar</Button>
                <Button variant='contained' type="submit" fullWidth>Concluir</Button>
            </Box>
        </form>
    )
}

export default StockItemForm
