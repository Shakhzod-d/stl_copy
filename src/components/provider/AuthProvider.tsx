import React from "react";
import SiteLoader from "../loaders/SiteLoader";
import useIsAuth from "@/hooks/useAuth";

type Props = {
   children: any;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
   const isIdentified = useIsAuth();

   if (!isIdentified) {
      //! here to disable loader
      return <SiteLoader />;
   }

   return children;
};

export default AuthProvider;
