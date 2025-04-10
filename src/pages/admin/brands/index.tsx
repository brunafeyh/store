import { IoAddOutline, IoDownloadOutline } from "react-icons/io5";
import { closeModal, Modal, ModalOptions, openModal, useModal } from "../../../components/modal";
import PagesHeader from "../../../components/pages-header";
import PageAdminLayout from "../../../layout/admin";
import { useBrands } from "../../../hooks/brands/use-brands";
import { ColumnDef } from "@tanstack/react-table";
import { usePaginateArray } from "../../../hooks/use-paginate-array";
import Table from "../../../components/table";
import { formatDateTime } from "../../../utils/formatDateTime";
import '../categories/Category.scss'
import { useState } from "react";
import { Edit, TrashCan } from "@carbon/icons-react";
import BrandForm from "../../../components/forms/brand";
import { useBrandsMutations } from "../../../hooks/brands/use-brands-mutations";
import ConfirmationModal from "../../../components/confirmation-modal";

export const BrandsPage = () => {
  const { data, isLoading, error } = useBrands()
  const { deleteBrand } = useBrandsMutations()
  const addModal = useModal()
  const paginatedData = usePaginateArray(data || [])

  const [id, setId] = useState<string>()

  const deleteModal = useModal()

  const editModal = useModal()

  const handleOpenModal = (id: string, modal: React.RefObject<ModalOptions | null>) => {
    setId(id)
    openModal(modal)
  }

  const handleCloseModal = (modal: React.RefObject<ModalOptions | null>) => {
    setId(undefined)
    closeModal(modal)
  }

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

  const handleDelete = async () => {
    await deleteBrand.mutateAsync(id || '')
    setId(undefined)
    closeModal(deleteModal)
  }

  return (
    <PageAdminLayout title='Marcas'>
      <PagesHeader
        title="Marcas"
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
            <td className="table-cell"><button onClick={() => handleOpenModal(row.original.id, editModal)}><Edit /></button><button onClick={() => handleOpenModal(row.original.id, deleteModal)}><TrashCan /></button></td>
          </tr>
        )}
      />

      <Modal ref={addModal}>
        <BrandForm onCloseModal={() => handleCloseModal(addModal)} />
      </Modal>
      <Modal ref={editModal}>
        <BrandForm id={id} onCloseModal={() => handleCloseModal(editModal)} />
      </Modal>
      <Modal ref={deleteModal}>
        <ConfirmationModal text={'Você realmente deseja apagar Marca?'} onConfirm={handleDelete} onCancel={() => closeModal(deleteModal)} />
      </Modal>
    </PageAdminLayout>
  )
}
