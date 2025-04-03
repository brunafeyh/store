import { FC } from "react"
import Header from "../../components/header"
import { IoCartOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5"
import { Banner } from "../../components/banner"

export const HomePage: FC = () => {
    return (
        <div>
        <Header tabs={['Home', 'Shop', 'Collections', 'About', 'Contact']}
        rightComponents={
            <>
              <div className="search-container">
                <input type="text" placeholder="Search for products..." />
                <IoSearchOutline className="search-icon" />
              </div>
              <IoPersonOutline size={22} className="icon" />
              <IoCartOutline size={22} className="icon" />
            </>
          }
           />
           <Banner/>
           </div>
    )
}