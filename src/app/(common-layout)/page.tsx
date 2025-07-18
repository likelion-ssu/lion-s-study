import Image from "next/image";
import backgroundImg from "@/assets/image/background_mask.png";
import styles from "./page.module.css";
import StudySection from "../_component/domain/main/StudySection";

export default function Main() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.pageContent}>
        <StudySection />
      </section>
      <div className={styles.column} />
      <hr className={styles.row} />
      <div className={styles.imgWrapper}>
        <Image src={backgroundImg} alt="배경 이미지" unoptimized={true} />
      </div>
    </div>
  );
}
