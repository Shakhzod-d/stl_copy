import React, { Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/loaders/AppLoader'
import { filterRoutes, historyPush } from "@/utils"
import { useSelector } from 'react-redux'
import { RoleNames } from '@/App'
import { RootState } from '@/store'


const AppPages: React.FC = () => {
//      const { userData } = useSelector((state: RootState) => state.auth);

//      useEffect(()=>{
//           changeUser(userData?.role.roleName)
//      }, [userData])

//      function changeUser(role: string | undefined){
     
//      if(role === RoleNames.COMPANY_ADMIN){
//        historyPush("/main/dashboard")
//      }
//     }
     return (
          <AppLayout>
               <Suspense fallback={<AppLoader />}>
                    <Switch>
                         {
                              filterRoutes("app").map((item, idx) => (
                                   <Route path={item.path} exact={item.exact} component={item.component} key={idx} />
                              ))
                         }
                    </Switch>
               </Suspense>
          </AppLayout>
     )
}

export default AppPages
