import React from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
     component: React.FC;
     isAuth: boolean;
     exact?: boolean;
     path: string;
}

const PrivateRoute: React.FC<Props> = ({
     component: Component,
     isAuth,
     ...rest
}) => {
     return (
          <Route
               {...rest}
               render={({ location }) =>
                    isAuth ? (
                         <Component />
                    ) : (
                         <Redirect
                              to={{
                                   pathname: "/login",
                                   state: { from: location },
                              }}
                         />
                    )
               }
          />
     );
};

export default PrivateRoute;
