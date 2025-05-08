import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { ArticleItem } from "@/types/studyRoomDetails/article";
import removeMarkdown from "remove-markdown";
import { sortArrByTime } from "@/utils/sortArrByTime";

export function useArticles(studyroomId: string) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesRef = collection(fireStore, `studyRooms/${studyroomId}/articles`);

  function getMarkdownPreview(markdown: string, maxLines: number = 10): string {
    const plainText = removeMarkdown(markdown);
    const lines = plainText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    return lines.slice(0, maxLines).join("\n");
  }

  useEffect(() => {
    const unsub = onSnapshot(articlesRef, snap => {
      const result: ArticleItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        const content = data.content ?? "";
        const preview = getMarkdownPreview(content);

        return {
          id: docSnap.id,
          title: data.title,
          content: preview, // 아예 preview로만 보냄 -> 추후 content, preview 분리 후 preview type 추가 리팩토링!
          creatorId: data.creatorId,
          createdAt: data.createdAt,
          creatorName: data.creatorName,
          creatorYear: data.creatorYear,
          tags: data.tags
        };
      });

      sortArrByTime(result, false);

      setArticles(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(fireStore, `studyRooms/${studyroomId}/articles/${id}`));
  };

  return {
    articles,
    deleteArticle
  };
}
