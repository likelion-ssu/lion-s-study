"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import commonStyles from "../../studyroom/CommonStyles.module.css";
import styles from "./ArticleList.module.css";
import { useArticles } from "@/hooks/useArticles";
import { ArticleItem as ArticleItemProp } from "@/types/studyRoomDetails/article";
import { useStudyroomDetail } from "@/hooks/useStudyroomDetail";

import Ic_back from "../../../../assets/icon/arrow_right.svg";
import Ic_article from "../../../../assets/icon/triangle.svg";
import BabyLion from "../../../../assets/image/babyLion.png";
import BigLion from "../../../../assets/image/bigLion.png";

interface ArticleListProps {
  articleId: string;
  studyroomId: string;
}

interface ArticleItemProps {
  articleProps: ArticleItemProp;
  onArticleItemClick: (articleId: string) => void;
  isSelected: boolean;
  refProp?: React.Ref<HTMLDivElement>;
}

const ArticleItem = React.forwardRef<HTMLDivElement, ArticleItemProps>(
  ({ articleProps, onArticleItemClick, isSelected }, ref) => {
    return (
      <div
        ref={ref}
        onClick={() => onArticleItemClick(articleProps.id)}
        className={styles.itemWholeContainer}
        id={isSelected ? styles.clickedItem : ""}
      >
        <div className={styles.tngleSvgContainer}>
          <Ic_article />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.itemTitleContainer} id={commonStyles.overflowEllipsisLine1}>
            {articleProps.title}
          </div>
          <div className={styles.profileContainer}>
            <div>
              <Image
                src={articleProps.creatorYear == 13 ? BabyLion : BigLion}
                alt="프로필 사진"
                unoptimized={true}
                style={{ width: 20, height: 20 }}
              ></Image>
            </div>
            <div className={styles.name}>{articleProps.creatorName}</div>
            <div className={styles.year}>{articleProps.creatorYear}기</div>
          </div>
          <div className={styles.contentPreview} id={commonStyles.overflowEllipsisLine1}>
            {articleProps.content}
          </div>
        </div>
      </div>
    );
  }
);
ArticleItem.displayName = "ArticleItem";

const ArticleList = ({ articleId, studyroomId }: ArticleListProps) => {
  const router = useRouter();

  // articleId: 현재 클릭한 아티클의 아이디
  const { studyroom } = useStudyroomDetail(studyroomId ?? "");

  // // 현재 들어와 있는 스터디룸의 아이디
  const { articles } = useArticles(studyroomId ?? ""); // 아티클 목록

  const selectedItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      selectedItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 50); // 0~50ms 사이에서 조정 가능

    return () => clearTimeout(timer);
  }, [articleId]);

  // // 아티클을 클릭한 경우
  const handleClick = (clickedArticleId: string) => {
    router.replace(`/studyroom/${studyroomId}/article/${clickedArticleId}`);
  };

  const handleBack = () => {
    router.push(`/studyroom/${studyroomId}`);
  };

  return (
    <div className={styles.wrapper}>
      {/* 타이틀 영역 - 고정 */}
      <div className={styles.titleContainer}>
        <div className={styles.iconContainer} id={styles.clickable} onClick={handleBack}>
          <Ic_back />
        </div>
        <div className={styles.title} id={commonStyles.overflowEllipsisLine1}>
          {" "}
          {studyroom?.title}
        </div>
      </div>
      <div className={styles.titleInvisibleContainer}>
        <div style={{ color: "#1a1a1a" }}> {studyroom?.title}</div>
      </div>
      {/* 스크롤 영역 */}
      <div className={styles.scrollContainer}>
        {articles.map(item => (
          <ArticleItem
            key={item.id}
            articleProps={item}
            onArticleItemClick={handleClick}
            isSelected={item.id === articleId}
            ref={item.id === articleId ? selectedItemRef : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
