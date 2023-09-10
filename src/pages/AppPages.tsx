import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import AppLoader from '@/components/loaders/AppLoader'
import { filterRoutes } from "@/utils"

const AppPages: React.FC = () => {
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
