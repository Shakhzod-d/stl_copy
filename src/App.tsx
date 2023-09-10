import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import AuthProvider from "./components/provider/AuthProvider";
import NetworkProvider from "./components/provider/NetworkProvider";
import ThemeProvider from "./components/provider/ThemeProvider";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import SiteLoader from "./components/loaders/SiteLoader";

const AppPages = lazy(() => import("./pages/AppPages"));
const AdminPages = lazy(() => import("./pages/AdminPages"));
const Login = lazy(() => import("./pages/Login"));

const App: React.FC = () => {
     const { isAuth } = useSelector((state: RootState) => state.auth);

     return (
          <ThemeProvider>
               <AuthProvider>
                    <NetworkProvider>
                         {/*  ! here to disable network error */}
                         <Suspense fallback={<SiteLoader />}>
                              <Switch>
                                   <PublicRoute
                                        path="/login"
                                        component={Login}
                                        isAuth={isAuth}
                                   />
                                   <PrivateRoute
                                        path="/admin"
                                        component={AdminPages}
                                        isAuth={isAuth}
                                   />
                                   <PrivateRoute
                                        path="/"
                                        component={AppPages}
                                        isAuth={isAuth}
                                   />
                              </Switch>
                         </Suspense>
                    </NetworkProvider>
               </AuthProvider>
          </ThemeProvider>
     );
};

export default App;
