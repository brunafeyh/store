import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../../loading'
import { brandFormSchema, BrandForm as BrandFormType } from '../../../schemas/brand'
import { useBrandByid } from '../../../hooks/brands/use-brand-by-id'
import { useBrandsMutations } from '../../../hooks/brands/use-brands-mutations'
import { Box, Button, TextField, Typography } from '@mui/material'
import { THEME_COLORS } from '../../../theme/colors'

interface Props {
    onCloseModal: () => void
    id?: string
}

const BrandForm: FC<Props> = ({ onCloseModal, id }) => {
    const { data, isLoading } = useBrandByid(id)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<BrandFormType>({
        resolver: zodResolver(brandFormSchema),
        values: {
            name: data?.name || '',
            description: data?.description || ''
        }
    })

    const { createBrand, updateBrand } = useBrandsMutations()

    const onSubmit = async (data: BrandFormType) => {
        if (id) await updateBrand.mutateAsync({ id: id, form: data })
        else await createBrand.mutateAsync(data)
        onCloseModal()
    }
    
    if (createBrand.isPending || updateBrand.isPending || isLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography mb={2} fontWeight={'bold'} color={THEME_COLORS.neutral.c80}>{id ? 'Editar Marca' : 'Adicionar Marca'}</Typography>
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

export default BrandForm
