import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemFormSchema, ItemForm as ItemFormValues } from '../../../schemas/item';
import { useCategories } from '../../../hooks/categories/use-categories';
import { useBrands } from '../../../hooks/brands/use-brands';
import styles from './ItemForm.module.scss';
import { ImageUploader } from '../../image-uploader';

const ItemForm: FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const methods = useForm<ItemFormValues>({
        resolver: zodResolver(itemFormSchema),
        defaultValues: {
            sku: '',
            name: '',
            description: '',
            imageUrls: [],
            price: 0,
            stock: 0,
            categoryId: '',
            brandId: ''
        }
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = methods;

    const { data: categories } = useCategories();
    const { data: brands } = useBrands();

    const onSubmit = async (data: ItemFormValues) => {
        const fileList = getValues('imageUrls')
        const newItem: ItemFormValues = {
            ...data,
            imageUrls: fileList,
        }
        console.log('Item formatado para envio:', newItem);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.fieldGroup}>
                    <label>SKU</label>
                    <input type="text" {...register('sku')} />
                    {errors.sku && <span className={styles.error}>{errors.sku.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Nome</label>
                    <input type="text" {...register('name')} />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Descrição</label>
                    <textarea {...register('description')} />
                    {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Preço</label>
                    <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
                    {errors.price && <span className={styles.error}>{errors.price.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Estoque</label>
                    <input type="number" {...register('stock', { valueAsNumber: true })} />
                    {errors.stock && <span className={styles.error}>{errors.stock.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Categoria</label>
                    <select {...register('categoryId')}>
                        <option value="">Selecione</option>
                        {categories?.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.categoryId && <span className={styles.error}>{errors.categoryId.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Marca</label>
                    <select {...register('brandId')}>
                        <option value="">Selecione</option>
                        {brands?.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    {errors.brandId && <span className={styles.error}>{errors.brandId.message}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label>Imagens</label>
                    <ImageUploader name="imageUrls" />
                    {errors.imageUrls && <span className={styles.error}>Adicione pelo menos uma imagem.</span>}
                </div>

                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
                    <button type="submit" className={styles.submitButton}>Concluir</button>
                </div>
            </form>
        </FormProvider>
    )
}

export default ItemForm;
