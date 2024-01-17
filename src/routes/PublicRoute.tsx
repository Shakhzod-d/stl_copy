import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useTypePath } from "@/hooks/useTypePath";

interface Props {
     component: React.FC;
     isAuth: boolean;
     exact?: boolean;
     path: string;
}

const PublicRoute: React.FC<Props> = ({
     component: Component,
     isAuth,
     ...rest
}) => {
     const path = useTypePath();
     return (
          <Route
               {...rest}
               render={({ location }) =>
                    !isAuth ? (
                         <Component />
                    ) : (
                         <Redirect
                              to={{
                                   pathname: path,
                                   state: { from: location },
                              }}
                         />
                    )
               }
          />
     );
};

export default PublicRoute;
