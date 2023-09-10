import React, { useState } from 'react'
import { Button, Table } from 'antd'
import Icon from '@/components/icon/Icon'
import useColumns from './components/columns'
import SearchByQuery from '@/components/elements/SearchByQuery'
import ActionModal from './components/ActionModal'
import { useQueryParams } from '@/hooks/useQueryParams'

const IftaReports = () => {

     // Query params  
     const [search, setSearch] = useQueryParams('search', '')

     const [isOpen, setIsOpen] = useState<boolean>(false)

     // Get all drivers data
     // const queryParams: any = ["/drivers", {}]
     // const { data, isLoading } = useApi(queryParams[0], queryParams[1])

     // Generate table columns
     const columns = useColumns()

     // // Map drivers data to table
     // const tableData: any = useMemo(() => {
     //      if (data) {
     //           const drivers = data.data
     //           return mapDrivers(drivers)
     //      }
     //      return []
     // }, [data])

     // Handle modal function
     const handleModal = () => {
          setIsOpen(prev => !prev)
     }

     return (
          <div className='ifta-reports page'>
               <div className="ifta-reports-header">
                    <h4 className="medium-18">IFTA REPORTS</h4>
                    <div className="right">
                         <SearchByQuery
                              className="mw-250 mr-8"
                              placeholder={"Search"}
                              query={search}
                              setQuery={setSearch}
                         />
                         <Button type="primary" onClick={handleModal}>
                              <Icon icon="plus" />
                              New Report
                         </Button>
                    </div>
               </div>
               <div className="page-line" />
               <div className="ifta-reports-main">
                    <Table
                         scroll={{ x: "max-content" }}
                         columns={columns}
                         // loading={isLoading}
                         // dataSource={tableData}
                         className="action"
                         pagination={false}
                    />
               </div>
               {isOpen && <ActionModal toggle={handleModal} />}
          </div>
     )
}

export default IftaReports