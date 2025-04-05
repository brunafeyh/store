import { FC, PropsWithChildren, ReactNode } from 'react'
import styles from './PageAdminLayout.module.scss'
import { IoHomeOutline, IoPeopleCircleOutline, IoPeopleOutline, IoStorefrontOutline } from 'react-icons/io5'
import Sidebar from '../components/sidebar'
import { useSetTitle } from '../hooks/use-title'

interface Props {
  title: string
  children: ReactNode
}
const menuItems = [
  {
    icon: <IoHomeOutline />,
    label: "Dashboard",
    route: "/admin/dashboard"
  },
  {
    icon: <IoStorefrontOutline />,
    label: "Produtos",
    children: [
      { label: "Categorias", route: "/admin/products/categories" },
      { label: "Marcas", route: "/admin/products/branchs" },
      { label: "Itens", route: "/admin/products/items" },
      { label: "Estoque", route: "/admin/products/stock" },
    ],
  },
  {
    icon: <IoPeopleOutline />,
    label: "Clientes",
    route: "/admin/clients"
  },
  {
    icon: <IoPeopleCircleOutline />,
    label: "Funcionários",
    route: "/admin/employees"
  }
];

const PageAdminLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  useSetTitle(title)
  return (
    <div className={styles.pageLayout}>
      <div className={styles.contentWrapper}>
        <Sidebar menuItems={menuItems} />
        <main className={styles.mainContent}>
          <div className={styles.pageBody}>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default PageAdminLayout
