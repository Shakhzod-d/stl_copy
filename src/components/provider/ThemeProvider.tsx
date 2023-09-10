import React, { useEffect } from 'react'
import { ThemeProps } from "@/types"
import { getLocalStorage, compareWords, changeTheme } from "@/utils"

interface Props {
     children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {

     useEffect(() => {
          getInitialTheme()
     }, [])

     // get intial value from localStoreage and set it
     const getInitialTheme = () => {
          let theme = getLocalStorage('theme') as ThemeProps
          if (!compareWords(theme, ['dark', 'light'])) {
               theme = "light"
          }
          changeTheme(theme)
     }

     return (
          <React.Fragment>
               {children}
          </React.Fragment>
     )
}

export default ThemeProvider