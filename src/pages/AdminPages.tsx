import React, { Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import { filterRoutes, historyPush, setLocalStorage } from "@/utils"
import AppLoader from '@/components/loaders/AppLoader'
import { RoleNames } from '@/App'
import { useSelector } from "react-redux";
import { RootState } from '@/store'
const AdminPages: React.FC = () => {
     const { userData } = useSelector((state: RootState) => state.auth);
     console.log(userData)
     

     useEffect(()=>{
          changeUser(userData?.role.roleName)
     }, [userData])
     
     
     function changeUser(role: string | undefined){
          if(role === RoleNames.COMPANY_ADMIN){
            historyPush("/main/dashboard")
          }
          if(role === RoleNames.SERVICE_ADMIN){
            historyPush("/admin/services")
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
