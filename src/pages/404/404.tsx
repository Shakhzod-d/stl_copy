import React from 'react'
import { Button, Result } from 'antd'
import { historyReplace } from '@/utils'
import { useTypePath } from '@/hooks/useTypePath'

const NotFound: React.FC = () => {
     const type = useTypePath()
     const goHome = () => {
          historyReplace(type)
     }
     return (
          <div>
               <Result
                    status="404"
                    title={<h2>404</h2>}
                    subTitle={<p className='medium-16'>Sorry, such a page does not exist!</p>}
                    extra={<Button className='mx-auto' type="primary" onClick={goHome}>MAIN PAGE</Button>}
               />
          </div>
     )
}

export default NotFound