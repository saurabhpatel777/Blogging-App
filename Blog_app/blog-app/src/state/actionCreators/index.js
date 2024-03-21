import axios from "axios"

export const getPost=(id)=>{
  return (dispatch)=>{
    return axios.get("http://localhost:3001/blog/"+id).then((response)=>{
      console.log(response.data)
      dispatch(get(response.data));
    })
  }
}

export function get(post){
  return{
    type:"get",
    post:post
  }
}