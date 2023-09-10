import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import { filterRoutes } from "@/utils"
import AppLoader from '@/components/loaders/AppLoader'

const AdminPages: React.FC = () => {
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
