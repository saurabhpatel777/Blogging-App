import { myAxios } from "./helper"

//create post or add blog function
export const createPost=(postData)=>{
  return myAxios.post(`/blog/${postData.category_id}/`,postData).then(response=>{return response.data})
}

//update post /or blog
export const updatePost=(postData)=>{
  console.log(postData)
  return myAxios.put(`/blog/`,postData).then(response=>{return response.data})
}

//show all posts or all blog function
export const getAllPost=(postData)=>{
  return myAxios.get(`/blogs/`).then(response=>{return response.data})
}

//show post/blog by id
export const getPost=async(id)=>{
  const response = await myAxios.get("/blog/"+id).then(response=>{return response.data});
  return response;
}

//get likes count
export const updateLikes=(id)=>{
  return myAxios.put("/like/"+id).then((response)=>{return response.data})
}

//delete post/blog
export const deletePost=(id)=>{
  return myAxios.delete("/blog/"+id).then((response)=>{return response.dtaa})
}