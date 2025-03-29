import React from "react";
import styles from "./Titlebox.module.css";

const Titlebox = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>제목</p>
      <input type="text" className={styles.inputBox} />
    </div>
  );
};

export default Titlebox;
