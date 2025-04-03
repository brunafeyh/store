import React from "react";
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loading
