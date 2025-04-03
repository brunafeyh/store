import { useAtom } from "jotai"
import { FC } from "react"
import { showPromoAtom } from "../../contexts/showPromoAtom"
import { IoClose } from "react-icons/io5"
import './Header.scss'
import { useAuth } from "../../hooks/use-auth"

type HeaderProps = {
  rightComponents?: React.ReactNode
  tabs?: string[]
}

const Header: FC<HeaderProps> = ({ rightComponents, tabs }) => {
  const { isAuthenticated } = useAuth()
  const [showPromo, setShowPromo] = useAtom(showPromoAtom)

  const showPromoValue = showPromo && !isAuthenticated

  return (
    <header className="header">
      {showPromoValue && (
        <div className="header__promo">
          <p>
            Registre-se e ganhe 20% de desconto <a href="login">Registre-se aqui</a>
          </p>
          <button className="close-btn" onClick={() => setShowPromo(false)}>
            <IoClose size={14} />
          </button>
        </div>
      )}

      <div className="header__main">
        <div className="logo">STOREFRONT</div>

        {tabs && (<nav className="tabs">
          {tabs.map((tab) => (
            <a href="#" key={tab}>
              {tab}
            </a>
          ))}
        </nav>)}

        <div className="header__right">
          {rightComponents}
        </div>
      </div>
    </header>
  )
}

export default Header
