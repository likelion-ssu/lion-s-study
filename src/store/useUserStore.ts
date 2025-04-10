import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

interface UserState {
  uid: string | null;
  googleId: string | null;
  name: string | undefined;
  year: number | undefined;
  part: string | undefined;
  favorites: [] | undefined;
  isSignUpCompleted: boolean;
  isHydrated: boolean;

  setName: (name: string) => void;
  setYear: (year: number) => void;
  setPart: (part: string) => void;
  setUser: (uid: string, googleId: string) => void;
  setUserInfo: (name: string, year: number, part: string) => void;
  clearUser: () => void;
  loadUserInfo: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      uid: null,
      googleId: null,
      name: undefined,
      year: undefined,
      part: undefined,
      favorites: [],
      isSignUpCompleted: false,
      isHydrated: false,

      setName: name => set({ name }),
      setYear: year => set({ year }),
      setPart: part => set({ part }),
      setUser: (uid, googleId) => set({ uid, googleId, isSignUpCompleted: false }),
      setUserInfo: (name, year, part) => set({ name, year, part, isSignUpCompleted: true }),
      clearUser: () =>
        set({
          uid: null,
          googleId: null,
          name: undefined,
          year: undefined,
          part: undefined,
          isSignUpCompleted: false
        }),
      loadUserInfo: async uid => {
        const userDoc = await getDoc(doc(fireStore, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          set({
            name: userData.name,
            year: userData.year,
            part: userData.part,
            googleId: userData.googleId,
            isSignUpCompleted: true
          });
        }
      }
    }),
    {
      name: "user"
      // 전부 저장 (partialize 생략 가능)
    }
  )
);
