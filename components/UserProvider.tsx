
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    } else {
      clearUser();
    }
  }, [session, setUser, clearUser]);

  return <>{children}</>;
}
