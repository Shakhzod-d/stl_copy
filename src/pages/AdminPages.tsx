import React, { Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import { filterRoutes, historyPush, historyReplace } from "@/utils"
import AppLoader from '@/components/loaders/AppLoader'
import { RoleNames } from '@/App'
import { useSelector } from "react-redux";
import { RootState } from '@/store'
const AdminPages: React.FC = () => {
     const { userData } = useSelector((state: RootState) => state.auth);

     useEffect(()=>{
          changeUser(userData?.role.roleName)
     }, [userData])
     
     
     function changeUser(role: string | undefined){
          if(role === RoleNames.COMPANY_ADMIN){
               historyReplace("/main/dashboard")
          }
          if(role === RoleNames.LOGGER){
               historyReplace("/main/log/logs")
          }
          if(role === RoleNames.SERVICE_ADMIN || role === RoleNames.SECOND_SERVICE_ADMIN){
               historyPush("/admin/all-companies")
          }
         }
     return (
          <AdminLayout>
               <Suspense fallback={<AppLoader />}>
                    <Switch>
                         {
                              filterRoutes("admin").map((item, idx) => (
                                   <Route path={item.path} exact={item.exact} component={item.component} key={item.path} />
                              ))
                         }
                    </Switch>
               </Suspense>
          </AdminLayout>
     )
}

export default AdminPages
