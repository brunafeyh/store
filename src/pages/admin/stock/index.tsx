import { ColumnDef } from "@tanstack/react-table";
import PageAdminLayout from "../../../layout/page-admin-layout";
import Table from "../../../components/table";
import '../categories/Category.scss'
import PagesHeader from "../../../components/pages-header";
import { IoDownloadOutline } from "react-icons/io5";
import { Edit } from "@carbon/icons-react";
import { closeModal, Modal, ModalOptions, openModal, useModal } from "../../../components/modal";
import { usePaginateArray } from "../../../hooks/use-paginate-array";
import { useState } from "react";
import { useItems } from "../../../hooks/items/use-items";
import StockItemForm from "../../../components/forms/stock";

export const StockPage = () => {
    const { data, isLoading, error } = useItems()

    const [id, setId] = useState<string>()

    const editModal = useModal()

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: 'name',
            header: 'Nome',
            meta: {
                filterVariant: 'text'
            }
        },
        {
            accessorKey: 'stock',
            header: 'Estoque',
            meta: {
                filterVariant: 'text',
            }
        },
        {
            accessorKey: 'edit',
            header: '',
        },
    ]

    const handleOpenModal = (id: string, modal: React.RefObject<ModalOptions | null>) => {
        setId(id)
        openModal(modal)
    }

    const paginatedData = usePaginateArray(data || [])

    return (
        <PageAdminLayout title='Estoque'>
            <PagesHeader
                title="Estoque"
                rightSideComponent={[
                    <button key="export">
                        <IoDownloadOutline style={{ marginRight: 8 }} />
                        Exportar
                    </button>
                ]}
            />

            <Table
                columns={columns}
                data={paginatedData || []}
                totalRows={data?.length || 0}
                isLoading={isLoading}
                error={error}
                renderData={(row) => (
                    <tr key={row.original.id} className="table-row">
                        <td className="table-cell">{row.original.name}</td>
                        <td className="table-cell">{row.original.stock}</td>
                        <td className="table-cell"><button onClick={() => handleOpenModal(row.original.id, editModal)}><Edit /></button></td>
                    </tr>
                )}
            />

            <Modal ref={editModal}>
                <StockItemForm id={id} onCloseModal={() => closeModal(editModal)} />
            </Modal>
        </PageAdminLayout>
    )
}
