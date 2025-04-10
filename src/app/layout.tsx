import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/reset.css";
import Modal from "./_component/modal/Modal";

export const metadata: Metadata = {
  title: "사자의 서재",
  description: "[멋쟁이사자처럼] 사자의 서재"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ fontFamily: "Pretendard, sans-serif" }}>
      <body>
        <div id="modal-root" />
        <Modal />
        {children}
      </body>
    </html>
  );
}
