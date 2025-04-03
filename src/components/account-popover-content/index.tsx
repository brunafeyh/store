import { FC } from "react";
import styles from "./AccountPopover.module.scss";
import { useAuth } from "../../hooks/use-auth";

const AccountPopoverContent: FC = () => {
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <p className={styles.name}><strong>{user.name}</strong></p>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.role}>{user.role}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </>
      ) : (
        <button className={styles.loginButton} onClick={handleLogin}>
          Fazer Login
        </button>
      )}
    </div>
  )
}

export default AccountPopoverContent