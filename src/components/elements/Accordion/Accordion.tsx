import React, { useState } from 'react'
import { Button } from 'antd'
import Icon from '../../icon/Icon'

interface Props {
     title: string,
     content: React.ReactNode | undefined,
     subButtons?: React.ReactNode | undefined,
     isClosable?: boolean | undefined,
     className?: string | undefined
}

const Accordion: React.FC<Props> = ({ title, content, subButtons, isClosable = true, className }) => {

     const [isOpen, setOpen] = useState<boolean>(true)

     const handleOpen = () => {
          setOpen(p => !p)
     }

     return (
          <div className={`accordion box ${className || ''}`}>
               <div className="accordion-header">
                    <h4 className="medium-18 uppercase">{title}</h4>
                    <div className="buttons">
                         {isOpen && subButtons}
                         {isClosable &&
                              <Button className='rounded' onClick={handleOpen}>
                                   <Icon icon={`drop-${isOpen ? 'up' : 'down'}`} />
                              </Button>}
                    </div>
               </div>
               {isOpen && <div className="content">
                    <div className="page-line" />
                    {content}
               </div>}
          </div>
     )
}

export default Accordion