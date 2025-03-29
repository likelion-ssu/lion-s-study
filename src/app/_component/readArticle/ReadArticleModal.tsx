import React from "react";
import styles from "./ReadArticleModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";

const ReadArticleModal = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalBox}>
          <div className={styles.topSection}>
            <div>
              <h1>Article 읽기</h1>
              <h2>12기 박지효 | 25.02.11</h2>
            </div>

            <ICDelete className={styles.deleteIc} />
          </div>
          <div className={styles.bodySection}>
            <h1>1주차 - 마크다운이란?</h1>
            <p>
              마크다운(markdown)은 일반 텍스트 기반의 경량 마크업 언어다. 일반 텍스트로 서식이 있는
              문서를 작성하는 데 사용되며, 일반 마크업 언어에 비해 문법이 쉽고 간단한 것이 특징이다.
              HTML과 리치 텍스트(RTF) 등 서식 문서로 쉽게 변환되기 때문에 응용 소프트웨어와 함께
              배포되는 README 파일이나 온라인 게시물 등에 많이 사용된다. <br />
              <br />
              위키백과 <br />
              쉽게 읽을 수 있고, 쉽게 작성할 수 있게 만들어짐 <br />
              가독성이 제일 중요 <br />
              웹상에서 사용할 수 있는 글쓰기 도구 <br />
              html을 완전하게 대체하지는 못함 <br />
              <br />
              Block Elements <br />
              제목(headers) 넣어보기 <br />
              h1부터 h6을 이용해서 제목을 표현할 수 있다 <br />
              참고: 회색 박스로 감싸진 부분은 백틱(backtick)()`으로 감싸서 작성하면 된다. <br />
              입력 <br /># 첫 번째 수준 제목 (h1) <br />
              ## 두 번째 수준 제목 (h2) <br />
              ### 세 번째 수준 제목 (h3) <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadArticleModal;
