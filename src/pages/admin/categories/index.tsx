import { ColumnDef } from "@tanstack/react-table";
import PageAdminLayout from "../../../layout/page-admin-layout";
import Table from "../../../components/table";
import './Category.scss'
import PagesHeader from "../../../components/pages-header";
import { IoAddOutline, IoDownloadOutline } from "react-icons/io5";
import { useCategories } from "../../../hooks/categories/use-categories";
import { formatDateTime } from "../../../utils/formatDateTime";
import { Edit, TrashCan } from "@carbon/icons-react";
import { closeModal, Modal, openModal, useModal } from "../../../components/modal";
import CategoryForm from "../../../components/forms/category";
import { usePaginateArray } from "../../../hooks/use-paginate-array";
import { useState } from "react";
import { useCategoriesMutations } from "../../../hooks/categories/use-categories-mutations";
import ConfirmationModal from "../../../components/confirmation-modal";

export const CategoriesPage = () => {

    const { data, isLoading, error } = useCategories()

    const {deleteCategory} = useCategoriesMutations()

    const [id, setId] = useState<string>()

    const deleteModal = useModal()

    const addModal = useModal()

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
            accessorKey: 'description',
            header: 'Descrição',
            meta: {
                filterVariant: 'text',
            }
        },
        {
            accessorKey: 'createdAt',
            header: 'Data de criação',
            meta: {
                filterVariant: 'text',
            }
        },
        {
            accessorKey: 'updatedAt',
            header: 'Data de última atualização',
            meta: {
                filterVariant: 'text',
            }
        },
        {
            accessorKey: 'edit',
            header: '',
        },
    ]

    const handleOpenDelete = (id: string) =>{
        setId(id)
        openModal(deleteModal)
    }

    const handleOpenEdit = (id: string) =>{
        setId(id)
        openModal(editModal)
    }

    const handleDelete = async() =>{
        await deleteCategory.mutateAsync(id || '')
        setId(undefined)
        closeModal(deleteModal)
    }

    const paginatedData = usePaginateArray(data || [])

    return (
        <PageAdminLayout title='Categorias'>
            <PagesHeader
                title="Categorias"
                rightSideComponent={[
                    <button key="add" onClick={() => openModal(addModal)}>
                        <IoAddOutline style={{ marginRight: 8 }} />
                        Adicionar
                    </button>,
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
                        <td className="table-cell">{row.original.description}</td>
                        <td className="table-cell status">{formatDateTime(row.original.createdAt)}</td>
                        <td className="table-cell status">{formatDateTime(row.original.updatedAt)}</td>
                        <td className="table-cell"><button onClick={() => handleOpenEdit(row.original.id)}><Edit /></button><button onClick={() => handleOpenDelete(row.original.id)}><TrashCan /></button></td>
                    </tr>
                )}
            />
            <Modal ref={addModal}>
                <CategoryForm closeModal={() => closeModal(addModal)} />
            </Modal>

            <Modal ref={deleteModal}>
                <ConfirmationModal text="Você realmente deseja apagar?"  onConfirm={handleDelete}  onCancel={() => closeModal(deleteModal)}/>
            </Modal>

            <Modal ref={editModal}>
            <CategoryForm closeModal={() => closeModal(editModal)} id={id}/>
            </Modal>
        </PageAdminLayout>
    )
}
