import { FC } from "react"
import Header from "../../components/header"
import { IoCartOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5"
import { Banner } from "../../components/banner"
import { Popover, usePopover } from "../../components/popover"
import AccountPopoverContent from "../../components/account-popover-content"
import styles from "./HomePage.module.scss";

export const HomePage: FC = () => {
  const popoverRef = usePopover();

  const handlePersonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (popoverRef.current) {
      popoverRef.current.openPopover(e.currentTarget);
    }
  };
  return (
    <div>
      <Header tabs={['Home', 'Shop', 'Collections', 'About', 'Contact']}
        rightComponents={
          <>
            <div className="search-container">
              <input type="text" placeholder="Search for products..." />
              <IoSearchOutline className="search-icon" />
            </div>
            <button onClick={handlePersonClick} className={styles.iconButton}>
              <IoPersonOutline size={22} className="icon" />
            </button>
            <IoCartOutline size={22} className="icon" />
          </>
        }
      />
      <Banner />
      <Popover ref={popoverRef}>
        <AccountPopoverContent />
      </Popover>
    </div>
  )
}