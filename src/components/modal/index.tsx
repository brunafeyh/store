import {
    ForwardRefRenderFunction,
    ReactNode,
    RefObject,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import styles from './Modal.module.scss';

interface Props {
    children: ReactNode;
}

export interface ModalOptions {
    openModal: () => void;
    closeModal: () => void;
}

const ModalComponent: ForwardRefRenderFunction<ModalOptions, Props> = (
    { children },
    ref
) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsOpened(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpened(false);
    }, []);

    useImperativeHandle(ref, () => ({
        openModal,
        closeModal,
    }));

    if (!isOpened) return null;

    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export const closeModal = (modal: RefObject<ModalOptions | null>) => {
    modal?.current?.closeModal();
}
export const openModal = (modal: RefObject<ModalOptions | null>) => {
    modal?.current?.openModal()
}

export const useModal = () => useRef<ModalOptions>(null);

export const Modal = forwardRef(ModalComponent);
