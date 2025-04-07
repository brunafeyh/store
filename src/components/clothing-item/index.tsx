import { FC, useState } from 'react'
import styles from './ClothingItem.module.scss'
import { Continue, TriangleLeftOutline } from '@carbon/icons-react'
import { Item } from '../../schemas/item'

const ClothingItem: FC<{ item: Item }> = ({ item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % item.imageUrls.length);
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? item.imageUrls.length - 1 : prev - 1
        )
    }

    const isLast = item.imageUrls.length === (currentImageIndex + 1 )

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
                        {!isLast && <button onClick={handleNextImage} className={`${styles.navButton} ${styles.right}`}>{<Continue />}</button>}
                    </>
                )}

            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.price}>R$ {item.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ClothingItem
