import { useAtom } from "jotai"
import { FC } from "react"
import { showPromoAtom } from "../../contexts/showPromoAtom"
import { IoClose } from "react-icons/io5"
import './Header.scss'

type HeaderProps = {
  rightComponents?: React.ReactNode
  tabs?: string[]
}

const Header: FC<HeaderProps> = ({ rightComponents, tabs }) => {
  const [showPromo, setShowPromo] = useAtom(showPromoAtom)

  return (
    <header className="header">
      {showPromo && (
        <div className="header__promo">
          <p>
            Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a>
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
