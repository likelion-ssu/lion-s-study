"use client";

import React from "react";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import { useHydration } from "@/hooks/useHydration";
import { useUserStore } from "@/store/useUserStore";

export default function UserBtn() {
  useHydration();

  const { isHydrated, isSignUpCompleted } = useUserStore();

  if (!isHydrated) return <p>로딩</p>;

  return <>{isSignUpCompleted ? <NameBtn /> : <LoginBtn />}</>;
}
