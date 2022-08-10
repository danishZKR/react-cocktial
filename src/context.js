import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([])
  const [searchTerm, setSearchTerm] = useState('a')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(url + searchTerm)
      const data = await res.json()
      if (data.drinks) {
        const drinks = data.drinks.map(drink => {
          return {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            info: drink.strAlcoholic,
            glass: drink.strGlass
          }
        })
        setCocktails(drinks)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }, [searchTerm])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AppContext.Provider
      value={{
        cocktails,
        setSearchTerm,
        loading,
      }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
