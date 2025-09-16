// import React, { createContext, useContext, useState, ReactNode } from "react"
// import Loader from "@/components/Loader"
//
// interface LoaderContextType {
//   showLoader: () => void
//   hideLoader: () => void
// }
//
// const LoaderContext = createContext<LoaderContextType | undefined>(undefined)
//
// export const LoaderProvider = ({ children }: { children: ReactNode }) => {
//   const [visible, setVisible] = useState(false)
//
//   const showLoader = () => setVisible(true)
//   const hideLoader = () => setVisible(false)
//
//   return (
//     <LoaderContext.Provider value={{ showLoader, hideLoader }}>
//       {children}
//       <Loader visible={visible} />
//     </LoaderContext.Provider>
//   )
// }
//
// export const useLoader = () => {
//   const context = useContext(LoaderContext)
//   if (!context) throw new Error("useLoader must be used within LoaderProvider")
//   return context
// }
import React, { createContext, useContext, useState, ReactNode } from "react"

interface LoaderContextType {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const showLoader = () => setIsLoading(true)
  const hideLoader = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider")
  }
  return context
}