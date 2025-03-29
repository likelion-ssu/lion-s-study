import React from "react";
import styles from "./ShowArticle.module.css";
import commonstyles from "./Titlebox.module.css";

const ShowArticle = () => {
  return (
    <div className={commonstyles.container}>
      <p className={commonstyles.title}>아티클 미리보기</p>
      <div className={commonstyles.inputBoxLarge} style={{ height: "47.8rem" }}></div>
    </div>
  );
};

export default ShowArticle;
