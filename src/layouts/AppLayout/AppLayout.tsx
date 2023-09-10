import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { getLocalStorage, historyReplace, localCollapsed, setCompanies } from "@/utils";
import { ICompanyData } from "@/types/company.type";
import useApi from "@/hooks/useApi";

interface Props {
     children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {


     const companyId = getLocalStorage("companyId")

     const { pathname } = useLocation();
     const [collapsed, setCollapsed] = useState<boolean>(localCollapsed);

     const { data: companies } = useApi<ICompanyData[]>("service/companies", {}, { suspense: true, enabled: Boolean(companyId) });

     useEffect(() => {
          if (companies) setCompanies(companies.data)
     }, [companies])

     // useEffect(() => {
     if (pathname === "/") historyReplace("/admin/services"); // ! here I deleted
     // }, []);

     useEffect(() => {
          localStorage.setItem("collapsed", JSON.stringify(collapsed));
     }, [collapsed]);

     return (
          <Layout style={{ minHeight: "100vh" }} className="app-layout">
               <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
               <Layout className="site-layout">
                    <Navbar />
                    <div className="pages">{children}</div>
               </Layout>
          </Layout>
     );
};

export default AppLayout;
