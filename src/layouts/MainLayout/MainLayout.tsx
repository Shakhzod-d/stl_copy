import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";

interface Props {
     children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {

     return (
          <React.Fragment>
               <ul className="custom-tabs">
                    <NavLink to="/main/dashboard" className="custom-tabs-item" activeClassName="active">dashboard</NavLink>
                    <NavLink to="/main/log/logs" className="custom-tabs-item" activeClassName="active">logs</NavLink>
                    <NavLink to="/main/log/driver" className="custom-tabs-item" activeClassName="active">logs by driver</NavLink>
                    <NavLink to="/main/log/errors" className="custom-tabs-item" activeClassName="active">errors</NavLink>
                    <NavLink to="/main/trackings" className="custom-tabs-item" activeClassName="active">trackings</NavLink>
               </ul>
               <Suspense>
                    {children}
               </Suspense>
          </React.Fragment>
     );
};

export default MainLayout
