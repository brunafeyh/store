import { FC, useState } from "react";
import PageAdminLayout from "../../../layout/page-admin-layout"
import PagesHeader from "../../../components/pages-header"
import ClothingItem from "../../../components/clothing-item";
import { useItems } from "../../../hooks/items/use-items"
import Loading from "../../../components/loading"
import { useCategories } from "../../../hooks/categories/use-categories"
import { useBrands } from "../../../hooks/brands/use-brands"
import styles from './ItemsPage.module.scss'
import { closeModal, Modal, openModal, useModal } from "../../../components/modal";
import ItemForm from "../../../components/forms/item";

export const ItemsPage: FC = () => {
    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [name, setName] = useState('')

    const addModal = useModal()

    const { data, isLoading } = useItems({ categoryId, brandId, name })
    const { data: categories, isLoading: isLoadingCategories } = useCategories()
    const { data: brands, isLoading: isLoadingBrands } = useBrands()

    if (isLoading || isLoadingCategories || isLoadingBrands) return <Loading />

    return (
        <PageAdminLayout title="Itens">
            <PagesHeader
                title="Itens"
                rightSideComponent={
                    <div className={styles.filters}>
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Todas categorias</option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <select
                            value={brandId}
                            onChange={(e) => setBrandId(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Todas marcas</option>
                            {brands?.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                        <button onClick={() => openModal(addModal)} >
                            Adicionar Item
                        </button>
                    </div>
                }
            />

            <div className={styles.grid}>
                {data?.map((item) => (
                    <ClothingItem key={item.id} item={item} />
                ))}
            </div>
            <Modal ref={addModal}>
            <ItemForm onCancel={() => closeModal(addModal)}/>
            </Modal>
        </PageAdminLayout>
    )
}

export default ItemsPage