import React, { useEffect } from "react";
import { useAuth } from "@/track/hooks/useAuth";
import { PageLoad } from "@/track/components/ui";
import { historyPush } from "@/utils";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { loading, isAuth } = useAuth();

  useEffect(() => {
    if (!loading && !isAuth) {
      historyPush("/login");
    }
  }, [loading, isAuth]);

  if (loading) {
    return <PageLoad />;
  } else if (isAuth) {
    return <>{children}</>; // ReactNode qaytarish
  } else {
    return null; // Foydalanuvchi avtorizatsiyadan o'tmagan bo'lsa, null qaytariladi
  }
};
