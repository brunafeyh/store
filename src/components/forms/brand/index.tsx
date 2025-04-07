import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from '../category/CategoryForm.module.scss'
import Loading from '../../loading'
import { brandFormSchema, BrandForm as BrandFormType } from '../../../schemas/brand'
import { useBrandByid } from '../../../hooks/brands/use-brand-by-id'
import { useBrandsMutations } from '../../../hooks/brands/use-brands-mutations'

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.fieldGroup}>
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={errors.name ? styles.errorInput : ''}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="description">Descrição</label>
                <input
                    id="description"
                    type="text"
                    {...register('description')}
                    className={errors.description ? styles.errorInput : ''}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.buttonGroup}>
                <button type="button" className={styles.cancelButton} onClick={onCloseModal}>
                    Cancelar
                </button>

                <button type="submit" className={styles.submitButton}>
                    Concluir
                </button>
            </div>
        </form>
    )
}

export default BrandForm
