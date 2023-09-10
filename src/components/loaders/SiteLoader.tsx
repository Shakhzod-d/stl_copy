import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
     loading?: boolean
}

const SiteLoader: React.FC<Props> = ({ loading = true }) => {
     return (
          loading ?
               <div className='site-loader' >
                    <LoadingOutlined />
               </div>
               : null
     )
}

export default SiteLoader