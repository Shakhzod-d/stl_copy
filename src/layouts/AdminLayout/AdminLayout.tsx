import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Tabs } from 'antd'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { RoleNames } from '@/App'

const { TabPane } = Tabs

interface Props {
     children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
     const { userData } = useSelector((state: RootState) => state.auth);

     const location = useLocation()
     const pathname = location.pathname
     const parentPath = '/admin'

     const [activePath, setActivePath] = useState('')

     useEffect(() => {
          const selectedPath = pathname.split(parentPath)[1] ?? ['/']
          const pathArr = selectedPath.split('/')
          setActivePath(pathArr[1])
     }, [pathname])

     return (
          <div className='admin-layout'>
               <div className="header">
                    <div className="tabs-wrapper">
                         {/* <Tabs activeKey={activePath}> */}
                              {
                                   userData?.role.roleName === RoleNames.SERVICE_ADMIN || userData?.role.roleName === RoleNames.SECOND_SERVICE_ADMIN ? 
                                   <Tabs activeKey={activePath}>
                                        <TabPane tab={<Link to={`${parentPath}/all-companies`}>All companies</Link>} key="all-companies" />
                                        <TabPane tab={<Link to={`${parentPath}/users`}>All users</Link>} key="users" />
                                   </Tabs> : 
                                  <Tabs activeKey={activePath}>
                                        <TabPane tab={<Link to={`${parentPath}/services`}>Services</Link>} key="services" />
                                        {/* <TabPane tab={<Link to={`${parentPath}/only-companies`}>Only companies</Link>} key="only-companies" /> */}
                                        <TabPane tab={<Link to={`${parentPath}/all-companies`}>All companies</Link>} key="all-companies" />
                                        <TabPane tab={<Link to={`${parentPath}/drivers`}>All drivers</Link>} key="drivers" />
                                        <TabPane tab={<Link to={`${parentPath}/users`}>All users</Link>} key="users" />
                                  </Tabs>
                              }
                              
                         {/* </Tabs> */}
                    </div>
               </div>
               <div className="routes">
                    {children}
               </div>
          </div>
     )
}

export default AdminLayout