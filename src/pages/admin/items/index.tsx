import { FC } from "react";
import PageAdminLayout from "../../../layout/page-admin-layout";
import PagesHeader from "../../../components/pages-header";
import ClothingItem from "../../../components/clothing-item";
import { useItems } from "../../../hooks/items/use-items";
import Loading from "../../../components/loading";

export const ItemsPage: FC = () => {
    const { data, isLoading } = useItems()

    if (isLoading) return <Loading />

    return (
        <PageAdminLayout title='Itens'>
            <PagesHeader
                title="Itens"
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                {data?.map((item) => (
                    <ClothingItem key={item.id} item={item} />
                ))}
            </div>
        </PageAdminLayout>
    )
}