import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './CategoryForm.module.scss'
import { CategoryForm as CategoryFormType, categoryFormSchema } from '../../../schemas/categories'
import { useCategoriesMutations } from '../../../hooks/categories/use-categories-mutations'
import Loading from '../../loading'
import { useCategorieByid } from '../../../hooks/categories/use-categorie-by-id'

interface Props {
    closeModal: () => void
    id?: string
}

const CategoryForm: FC<Props> = ({ closeModal, id }) => {
    
    const {data, isLoading} = id ? useCategorieByid(id) : {}

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CategoryFormType>({
        resolver: zodResolver(categoryFormSchema),
        values: {
            name: data?.name || ''
        }
    })

    const { createCategory, updateCategory } = useCategoriesMutations()

    const onSubmit = async (data: CategoryFormType) => {
        if(id) await updateCategory.mutateAsync({id: id, form: data})
        else await createCategory.mutateAsync(data)
        closeModal()
    }

    if (createCategory.isPending || isLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.fieldGroup}>
                <label htmlFor="name">Nome da Categoria</label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={errors.name ? styles.errorInput : ''}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.buttonGroup}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                    Cancelar
                </button>

                <button type="submit" className={styles.submitButton}>
                    Concluir
                </button>
            </div>
        </form>
    )
}

export default CategoryForm
