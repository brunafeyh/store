import { FC } from 'react'
import './Header.scss'
import { useAtom } from 'jotai'

import { IoClose, IoCartOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { showPromoAtom } from '../../contexts/showPromoAtom'

const Header: FC = () => {
  const [showPromo, setShowPromo] = useAtom(showPromoAtom)

  const tabs = ['Home', 'Shop', 'Collections', 'About', 'Contact']

  return (
    <header className="header">
      {showPromo && (
        <div className="header__promo">
          <p>
            Sign up and get 20% off to your first order.{' '}
            <a href="#">Sign Up Now</a>
          </p>
          <button className="close-btn" onClick={() => setShowPromo(false)}>
            <IoClose size={18} />
          </button>
        </div>
      )}

      <div className="header__main">
        <div className="logo">storefront</div>

        <nav className="tabs">
          {tabs.map((tab) => (
            <a href="#" key={tab}>
              {tab}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <div className="search-container">
            <input type="text" placeholder="Search for products..." />
            <IoSearchOutline className="search-icon" />
          </div>

          <IoPersonOutline size={22} className="icon" />
          <IoCartOutline size={22} className="icon" />
        </div>
      </div>
    </header>
  )
}

export default Header
