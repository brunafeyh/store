import { FC } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemFormSchema, ItemForm as ItemFormValues } from '../../../schemas/item';
import { useCategories } from '../../../hooks/categories/use-categories'
import { useBrands } from '../../../hooks/brands/use-brands'
import { ImageUploader } from '../../image-uploader';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material'
import { useItemsMutations } from '../../../hooks/items/use-item-mutations';
import Loading from '../../loading'
import { useItemByid } from '../../../hooks/items/use-item-by-id'

type Props = {
    onCancel: () => void;
    id?: string;
}

const ItemForm: FC<Props> = ({ onCancel, id }) => {
    const { data: items, isLoading } = useItemByid(id || '')

    const methods = useForm<ItemFormValues>({
        resolver: zodResolver(itemFormSchema),
        values: {
            sku: items?.sku || '',
            name: items?.name || '',
            description: items?.description || '',
            imageUrls: items?.imageUrls || [],
            price: items?.price || 0,
            stock: items?.stock || 0,
            categoryId: items?.category?.id || '',
            brandId: items?.brand?.id || ''
        }
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = methods

    const { data: categories } = useCategories()
    const { data: brands } = useBrands()
    const { createItem, updateItem } = useItemsMutations()

    const onSubmit = async (data: ItemFormValues) => {
        if (id) await updateItem.mutateAsync({ id, form: data })
        else await createItem.mutateAsync(data)
        onCancel()
    }

    if (createItem.isPending || isLoading) return <Loading />

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>Adicionar Item</Typography>

                    <Box display="flex" flexDirection="row" gap={2}>
                        <TextField
                            variant="filled"
                            label="SKU"
                            fullWidth
                            error={!!errors.sku}
                            helperText={errors.sku?.message}
                            {...register('sku')}
                        />

                        <TextField
                            variant="filled"
                            label="Nome"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            {...register('name')}
                        />
                    </Box>

                    <Box display="flex" flexDirection="row" gap={2}>
                        <Controller
                            name="brandId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    select
                                    variant="filled"
                                    label="Marca"
                                    fullWidth
                                    error={!!errors.brandId}
                                    helperText={errors.brandId?.message}
                                    {...field}
                                >
                                    <MenuItem value="">Selecione</MenuItem>
                                    {brands?.map((b) => (
                                        <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <TextField
                            variant="filled"
                            type="number"
                            label="Preço"
                            fullWidth
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            {...register('price', { valueAsNumber: true })}
                        />
                    </Box>

                    <Box display="flex" flexDirection="row" gap={2}>
                        <TextField
                            variant="filled"
                            type="number"
                            label="Estoque"
                            fullWidth
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                            {...register('stock', { valueAsNumber: true })}
                        />

                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    select
                                    variant="filled"
                                    label="Categoria"
                                    fullWidth
                                    error={!!errors.categoryId}
                                    helperText={errors.categoryId?.message}
                                    {...field}
                                >
                                    <MenuItem value="">Selecione</MenuItem>
                                    {categories?.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Box>

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

                    <Box display="flex" flexDirection="column" gap={2}>
                        <label>Imagens</label>
                        <ImageUploader name="imageUrls" />
                        {errors.imageUrls && <span>Adicione pelo menos uma imagem.</span>}
                    </Box>

                    <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2}>
                        <Button variant="outlined" onClick={onCancel} fullWidth>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Concluir
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    )
}

export default ItemForm