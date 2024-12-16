import React, { useEffect } from "react";

import { Route, Switch, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "./store";

import routes from "./routes";

import { Layout } from "./track/components/shared/layout";

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/theme";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Login, NotFound } from "./track/pages";
import { getLocalStorage, historyPush } from "./utils";
import { NotificationModal } from "./track/components/shared/notification-modal/notification-modal";
import { Body } from "./track/utils/constants";

export enum RoleNames {
  SUPER_ADMIN = "superAdmin",
  SERVICE_ADMIN = "serviceAdmin",
  SECOND_SERVICE_ADMIN = "secondServiceAdmin",
  COMPANY_ADMIN = "companyAdmin",
  LOGGER = "logger",
}
const App: React.FC = () => {
  const { pathname } = useLocation();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const modal = useSelector((state: RootState) => state.booleans.modal);
  const company =
    useSelector((state: RootState) => state.company.company) ||
    getLocalStorage("company");
  const dark = useSelector((state: RootState) => state.booleans.darkMode);
  useEffect(() => {
    if (!company && pathname === "/") {
      historyPush("/company");
    }
    if (company && pathname === "/") {
      historyPush(`/main/dashboard`);
    }
  }, [pathname]);

  const FilterRoutes = routes.filter((item) =>
    item.admin.includes(userData ? userData?.role.roleName : "")
  );

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Body>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute>
            {modal && <NotificationModal />}
            <Layout>
              <Switch>
                {" "}
                {/* Place Switch inside the Layout for proper route nesting */}
                {FilterRoutes.map((item, i) => {
                  const Component = item.component;

                  if (item.route) {
                    return (
                      <Route
                        key={i}
                        path={item.path}
                        render={(props) => (
                          <Component {...props}>
                            <Switch>
                              {item.route.map((nestedRoute, j) => (
                                <Route
                                  key={j}
                                  path={`${item.path}/${nestedRoute.path}`}
                                  component={nestedRoute.component}
                                />
                              ))}
                              <Route component={NotFound} />{" "}
                              {/* Catch any unrecognized nested paths */}
                            </Switch>
                          </Component>
                        )}
                      />
                    );
                  } else {
                    return (
                      <Route key={i} path={item.path} component={Component} />
                    );
                  }
                })}
                <Route component={NotFound} />{" "}
                {/* Catch unmatched paths within PrivateRoute */}
              </Switch>
            </Layout>
          </PrivateRoute>
          <Route path="*" component={NotFound} />{" "}
          {/* Final fallback for all other unmatched paths */}
        </Switch>
      </Body>
    </ThemeProvider>
  );
};

export default App;
