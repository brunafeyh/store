import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryForm as CategoryFormType, categoryFormSchema } from '../../../schemas/categories'
import { useCategoriesMutations } from '../../../hooks/categories/use-categories-mutations'
import Loading from '../../loading'
import { useCategorieByid } from '../../../hooks/categories/use-categorie-by-id'
import { Box, Button, TextField, Typography } from '@mui/material'
import { THEME_COLORS } from '../../../theme/colors'

interface Props {
    onCloseModal: () => void
    id?: string
}

const CategoryForm: FC<Props> = ({ onCloseModal, id }) => {

    const { data, isLoading } = id ? useCategorieByid(id) : {}

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CategoryFormType>({
        resolver: zodResolver(categoryFormSchema),
        values: {
            name: data?.name || '',
            description: data?.description || ''
        }
    })

    const { createCategory, updateCategory } = useCategoriesMutations()

    const onSubmit = async (data: CategoryFormType) => {
        if (id) await updateCategory.mutateAsync({ id: id, form: data })
        else await createCategory.mutateAsync(data)
        onCloseModal()
    }

    if (createCategory.isPending || updateCategory.isPending || isLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography mb={2} fontWeight={'bold'} color={THEME_COLORS.neutral.c80}>{id ? 'Editar Categoria' : 'Adicionar Categoria'}</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={2} mb={2}>
                <TextField
                    variant='filled'
                    type='text'
                    label='Nome'
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    variant="filled"
                    multiline
                    minRows={3}
                    label="Descrição"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register('description')}
                />
            </Box>

            <Box display={'flex'} flexDirection={'row'} gap={2}>
                <Button variant='outlined' onClick={onCloseModal} fullWidth>Cancelar</Button>
                <Button variant='contained' type="submit" onClick={onCloseModal} fullWidth>Concluir</Button>
            </Box>
        </form>
    )
}

export default CategoryForm
