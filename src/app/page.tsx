import LoginButton from "./_component/login/LoginButton";
import LoginModal from "./_component/login/LoginModal";

export default function Home() {
  return (
    <div>
      <LoginModal />
      <LoginButton />
      <p> Main 페이지</p>
    </div>
  );
}
