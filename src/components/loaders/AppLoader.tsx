import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
     loading?: boolean
}

const AppLoader: React.FC<Props> = ({ loading = true }) => {
     return (
          loading ?
               <div className='app-loader'>
                    <LoadingOutlined />
               </div>
               : null
     )
}

export default AppLoader