import React, { useEffect, useState } from 'react'
import { loadAllCategories } from '../services/category-service'
import categoryContext from './categoryContext'

function CategoryProvider({children}) {
const [categories,setCategories]=useState([{}]);
  useEffect(
    ()=>{
      loadAllCategories().then((data)=>{
        console.log(data);
        setCategories(data);
      }).catch(error=>{console.log(error)})
    },
    []
  )
  return (
    <categoryContext.Provider value={categories}>
      {children}
    </categoryContext.Provider>
    
  )
}

export default CategoryProvider