import { FC, PropsWithChildren, ReactNode } from 'react'
import styles from '../admin/PageAdminLayout.module.scss'
import { useSetTitle } from '../../hooks/use-title'
import { useAuth } from '../../hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Popover, usePopover } from '../../components/popover'
import Header from '../../components/header'
import { IoCartOutline, IoPersonOutline, IoSearchOutline, IoSettingsOutline } from 'react-icons/io5'
import AccountPopoverContent from '../../components/account-popover-content'

interface Props {
    title: string
    children: ReactNode
}

const PageClientLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
    useSetTitle(title)
    const { user } = useAuth()
    const navigate = useNavigate()
    const popoverRef = usePopover()

    const handlePersonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (popoverRef.current) {
            popoverRef.current.openPopover(e.currentTarget);
        }
    }

    const goToAdminPage = () => navigate("/admin")

    const isAdminOrEmployee = user && (user.role === "ADMIN" || user.role === "EMPLOYEE");

    return (
        <div>
            <Header
                tabs={[
                    { label: "Home", href: "/" },
                    { label: "Marcas", href: "/brands" },
                    { label: "Categorias", href: "/categories" },
                    { label: "Sobre nós", href: "/about" },
                    { label: "Contato", href: "/contact" },
                ]}

                rightComponents={
                    <>
                        <div className="search-container">
                            <input type="text" placeholder="Search for products..." />
                            <IoSearchOutline className="search-icon" />
                        </div>

                        <button onClick={handlePersonClick} className={styles.iconButton}>
                            <IoPersonOutline size={22} className="icon" />
                        </button>

                        {isAdminOrEmployee ? (
                            <button onClick={goToAdminPage} className={styles.iconButton}>
                                <IoSettingsOutline size={22} className="icon" />
                            </button>
                        ) : (
                            <IoCartOutline size={22} className="icon" />
                        )}
                    </>
                }
            />
            {children}
            <Popover ref={popoverRef}>
                <AccountPopoverContent />
            </Popover>
        </div>
    )
}

export default PageClientLayout