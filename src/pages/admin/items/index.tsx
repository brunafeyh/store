import { FC, useState } from "react";
import PageAdminLayout from "../../../layout/admin";
import PagesHeader from "../../../components/pages-header";
import ClothingItem from "../../../components/clothing-item";
import { useItems } from "../../../hooks/items/use-items";
import Loading from "../../../components/loading";
import { useCategories } from "../../../hooks/categories/use-categories";
import { useBrands } from "../../../hooks/brands/use-brands";
import styles from './ItemsPage.module.scss';
import { TextField, MenuItem, Button, InputAdornment } from '@mui/material';
import { closeModal, Modal, openModal, useModal } from "../../../components/modal";
import ItemForm from "../../../components/forms/item";
import { AddLarge, Search } from "@carbon/icons-react";

export const ItemsPage: FC = () => {
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [name, setName] = useState('');

    const addModal = useModal();

    const { data, isLoading } = useItems({ categoryId, brandId, name });
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const { data: brands, isLoading: isLoadingBrands } = useBrands();

    if (isLoading || isLoadingCategories || isLoadingBrands) return <Loading />;

    return (
        <PageAdminLayout title="Itens">
            <PagesHeader
                title="Itens"
                rightSideComponent={
                    <div className={styles.filters}>
                        <Button
                            startIcon={<AddLarge />}
                            variant="contained"
                            onClick={() => openModal(addModal)}
                            sx={{ marginRight: 4 }}
                        >
                            Adicionar Item
                        </Button>
                        <TextField
                            variant="filled"
                            type="text"
                            sx={{ width: 250 }}
                            label="Buscar por nome..."
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Search />
                                  </InputAdornment>
                                ),
                                disableUnderline: true,
                              }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="filled"
                            select
                            label="Categoria"
                            value={categoryId}
                            sx={{ width: 200 }}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <MenuItem value="">Todas categorias</MenuItem>
                            {categories?.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            variant="filled"
                            select
                            label="Marca"
                            value={brandId}
                            sx={{ width: 200 }}
                            onChange={(e) => setBrandId(e.target.value)}
                        >
                            <MenuItem value="">Todas marcas</MenuItem>
                            {brands?.map((brand) => (
                                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                            ))}
                        </TextField>

                    </div>
                }
            />
            <div className={styles.grid}>
                {data?.map((item) => (
                    <ClothingItem key={item.id} item={item} />
                ))}
            </div>
            <Modal ref={addModal}>
                <ItemForm onCancel={() => closeModal(addModal)} />
            </Modal>
        </PageAdminLayout>
    )
}

export default ItemsPage