import { FC } from 'react'
import styles from './ConfirmationModal.module.scss'
import { Warning } from '@carbon/icons-react'

type ConfirmationModalProps = {
  text: string
  description?: string
  conclusionText?: string
  header?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  text,
  onConfirm,
  onCancel,
  header,
  description,
  conclusionText
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <Warning className={styles.icon} />
        <h2>{header || 'Confirmação de Exclusão'}</h2>
      </div>
      <p className={styles.text}>{text}</p>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
        <button className={styles.confirmButton} onClick={onConfirm}>
          {conclusionText || 'Excluir'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal