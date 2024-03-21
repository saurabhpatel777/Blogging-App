import { getAllPost } from "../services/post-srvice";
import { useEffect,useState } from "react";
import Base from "./Base";
import Post from "./Post";
const All=()=>{
  const [allPosts,setAllPosts]=useState([])
  useEffect(
    ()=>{
      getAllPost().then((data)=>{
        console.log(data);
        setAllPosts(data);
      }).catch(error=>{console.log(error)})
    },
    []
  )
  return(
    <Base>
    <div className="container-fluid p-0 m-0">
      <h1>All</h1>
      {
        allPosts.map((post)=>(
          <Post post={post} key={post.id}/>
        ))
      }
    </div>
    </Base>
  );
};

export default All;