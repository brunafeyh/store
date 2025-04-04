import { FC, PropsWithChildren, ReactNode } from 'react'
import styles from './PageAdminLayout.module.scss'
import { IoHomeOutline, IoPeopleCircleOutline, IoPeopleOutline, IoStorefrontOutline } from 'react-icons/io5'
import Sidebar from '../components/sidebar'

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
      { label: "Categorias", route: "/admin/produtos/categorias" },
      { label: "Marcas", route: "/admin/produtos/marcas" },
      { label: "Itens", route: "/admin/produtos/itens" },
      { label: "Estoque", route: "/admin/produtos/estoque" },
    ],
  },
  {
    icon: <IoPeopleOutline />,
    label: "Clientes",
    route: "/admin/clientes"
  },
  {
    icon: <IoPeopleCircleOutline />,
    label: "Funcionários",
    route: "/admin/funcionarios"
  }
];

const PageAdminLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.contentWrapper}>
        <Sidebar menuItems={menuItems} />
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <div className={styles.pageBody}>{children}</div>
        </main>
      </div>
    </div>
  )
}

export default PageAdminLayout
