import { FC, useState } from 'react'
import styles from './ClothingItem.module.scss'
import { Continue, Edit, TrashCan, TriangleLeftOutline } from '@carbon/icons-react'
import { closeModal, Modal, openModal, useModal } from '../modal'
import { useAuth } from '../../hooks/use-auth'
import { Box, Chip, IconButton } from '@mui/material'
import { useItemsMutations } from '../../hooks/items/use-item-mutations'
import { THEME_COLORS } from '../../theme/colors'
import ConfirmationModal from '../confirmation-modal'
import ItemForm from '../forms/item'

export type ClothingItemData = {
    id: string
    name: string
    price: number
    imageUrls: string[]
    stock: number
  }

  
const ClothingItem: FC<{ item: ClothingItemData }> = ({ item }) => {
    const { user } = useAuth()

    const notClient = user.role !== 'CLIENT' && user.role

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const { deleteItem } = useItemsMutations()

    const deleteModal = useModal()

    const editModal = useModal()

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % item.imageUrls.length);
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? item.imageUrls.length - 1 : prev - 1
        )
    }

    const handleDeleleItem = async () => {
        await deleteItem.mutateAsync(item.id)
        closeModal(deleteModal)
    }

    const isSoldOut = item.stock === 0

    const isLastItem = item.stock === 1

    const isLastimage = item.imageUrls.length === (currentImageIndex + 1)

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={item.imageUrls[currentImageIndex]}
                    alt={item.name}
                    className={styles.image}
                />
                {item.imageUrls.length > 1 && (
                    <>
                        <button onClick={handlePrevImage} className={`${styles.navButton} ${styles.left}`}>{<TriangleLeftOutline />}</button>
                        {!isLastimage && <button onClick={handleNextImage} className={`${styles.navButton} ${styles.right}`}>{<Continue />}</button>}
                    </>
                )}

            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.price}>R$ {item.price.toFixed(2)}</p>
            </div>
            {notClient && (
                <Box display={'flex'} flexDirection={'row'} gap={2}>
                    <IconButton onClick={() => openModal(editModal)}>
                        <Edit style={{ color: THEME_COLORS.neutral.c60 }} />
                    </IconButton>
                    <IconButton onClick={() => openModal(deleteModal)}>
                        <TrashCan style={{ color: THEME_COLORS.error.c50 }} />
                    </IconButton>
                </Box>
            )}
            {isSoldOut && <Chip label="Esgotado" />}
            {isLastItem && <Chip label="Último Item em Estoque" color="primary" variant="outlined" />}

            <Modal ref={deleteModal}>
                <ConfirmationModal text='Tem certeza que deseja deletar Item?' onConfirm={handleDeleleItem} onCancel={() => closeModal(deleteModal)} />
            </Modal>

            <Modal ref={editModal}>
                <ItemForm onCancel={() => closeModal(editModal)} id={item.id} />
            </Modal>
        </div>
    )
}

export default ClothingItem
