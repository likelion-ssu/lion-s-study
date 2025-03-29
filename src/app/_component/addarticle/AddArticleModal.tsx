import React from "react";
import styles from "./AddArticleModal.module.css";
import Titlebox from "./Titlebox";
import ArticleEditor from "./ArticleEditor";
import ShowArticle from "./ShowArticle";
import ICDelete from "@/assets/icon/delete.svg";

const AddArticleModal = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalBox}>
          <div className={styles.topSection}>
            <p>Article 생성하기</p>
            <ICDelete className={styles.cursorPointer} />
          </div>
          <div className={styles.bodySection}>
            <div className={styles.leftSection}>
              <Titlebox />
              <ArticleEditor />
            </div>
            <ShowArticle />
          </div>
          <div className={styles.buttonSection}>
            <button type="button">생성하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddArticleModal;
