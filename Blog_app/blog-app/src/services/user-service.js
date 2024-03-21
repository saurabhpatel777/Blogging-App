import { myAxios } from "./helper"

//login
export const login=(userData)=>{
  return myAxios.post(`/login`,userData).then(response=>{return response.data})
}

//register
export const register=(userData)=>{
  return myAxios.post(`/register`,userData).then(response=>{return response.data})
}

//current-user
export const getUser=()=>{
  return myAxios.get(`/user`).then(response=>{return response.data})
}

//logout
export const logout=()=>{
  return myAxios.get(`/logout`).then(response=>{return response.data})
}