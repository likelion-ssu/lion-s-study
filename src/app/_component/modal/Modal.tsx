"use client";

import { useEffect, useRef, MouseEvent } from "react";
import modalStyles from "./Modal.module.css";
import { useModalStore } from "@/store/useModalStore";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Modal() {
  const isMounted = useIsMounted();

  // 전역 모달 상태를 가져옴
  const { content, isOpen, close, onBackdropClick } = useModalStore();
  // 모달의 backdrop을 가리키는 ref
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 열리면 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  // 모달 backdrop 클릭 시 모달 닫음
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      // 사용자 정의 backdrop 클릭 동작 실행
      if (onBackdropClick) {
        onBackdropClick();
      }
      // 기본 닫기 동작 실행
      close();
    }
  };

  // 모달이 열려있지 않거나 서버에서 실행되는 경우를 차단
  if (!isOpen || typeof window === "undefined") return null;

  // Portal을 생성하고 내부에서 모달 content를 렌더링
  return createPortal(
    <div ref={modalRef} onClick={handleClickOutside} className={modalStyles.modalOverlay}>
      <div onClick={e => e.stopPropagation()}>{content}</div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
