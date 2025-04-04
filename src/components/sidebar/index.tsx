import { FC, JSX, useState } from "react";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarItem = {
  icon?: JSX.Element;
  label: string;
  route?: string;
  badge?: number;
  children?: { label: string; route: string }[];
};

type SidebarProps = {
  menuItems: SidebarItem[];
};

const Sidebar: FC<SidebarProps> = ({ menuItems }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (label: string) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.title} onClick={() => navigate("/")}>
        STOREFRONT
      </div>

      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isActiveParent =
            location.pathname === item.route ||
            item.children?.some((child) => location.pathname === child.route);

          return (
            <li key={item.label} className={styles.menuItem}>
              <button
                className={`${styles.menuButton} ${
                  isActiveParent ? styles.active : ""
                }`}
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.label);
                  } else if (item.route) {
                    navigate(item.route);
                  }
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
                {item.children && (
                  <span className={styles.arrow}>
                    {activeMenu === item.label ? "▲" : "▼"}
                  </span>
                )}
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </button>

              {item.children && activeMenu === item.label && (
                <ul className={styles.submenu}>
                  {item.children.map((child) => {
                    const isActiveChild = location.pathname === child.route;

                    return (
                      <li key={child.label}>
                        <button
                          className={`${isActiveChild ? styles.active : ""}`}
                          onClick={() => navigate(child.route)}
                        >
                          {child.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
