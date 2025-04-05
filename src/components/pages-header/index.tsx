import { FC, ReactNode } from 'react'
import styles from './PagesHeader.module.scss'

type PagesHeaderProps = {
  title: string
  rightSideComponent?: ReactNode | ReactNode[]
}

const PagesHeader: FC<PagesHeaderProps> = ({ title, rightSideComponent }) => {
  return (
    <div className={styles.headerWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rightContent}>
        {Array.isArray(rightSideComponent)
          ? rightSideComponent.map((component, index) => (
              <div key={index} className={styles.rightItem}>
                {component}
              </div>
            ))
          : rightSideComponent}
      </div>
    </div>
  )
}

export default PagesHeader
