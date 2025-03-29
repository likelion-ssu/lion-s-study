import React from "react";
import styles from "./EditorBlock.module.css";
import { EditorBlockList } from "@/constants/EditorBlockList";

const EditorBlock = () => {
  return (
    <div className={styles.container}>
      {EditorBlockList.map(block => (
        <div key={block.id} className={styles.block}>
          {block.name}
        </div>
      ))}
    </div>
  );
};

export default EditorBlock;
