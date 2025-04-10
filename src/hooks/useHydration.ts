import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export const useHydration = () => {
  useEffect(() => {
    const already = useUserStore.persist?.hasHydrated?.();

    if (already) {
      useUserStore.setState({ isHydrated: true });
    } else {
      useUserStore.persist?.onFinishHydration?.(() => {
        useUserStore.setState({ isHydrated: true });
      });
    }
  }, []);
};
