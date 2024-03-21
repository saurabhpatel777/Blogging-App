import React, { useEffect, useState } from 'react'
import { getUser } from '../services/user-service'
import userContext from './userContext'
function UserProvider({children}) {
  const[username,setUsername]=useState(['Guest'])
  useEffect(
    ()=>{
      getUser().then((data)=>{
        console.log(data);
        setUsername(data)
      }).catch(error=>{console.log(error)})
    },
    []
  )
  return (
    <userContext.Provider value={username}>
      {children}
    </userContext.Provider>
    
  )
}

export default UserProvider