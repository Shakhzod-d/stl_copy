import React, { Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/loaders/AppLoader'
import { filterRoutes, getLocalStorage, historyReplace } from "@/utils"

const AppPages: React.FC = () => {

     useEffect(()=>{
          changeUser()
     }, [])

     function changeUser(){
          if(!getLocalStorage('companyId')){
               historyReplace("/admin/services")
          }
    }
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
