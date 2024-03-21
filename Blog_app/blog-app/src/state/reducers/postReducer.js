import { getPost } from "../../services/post-srvice";
let defaultState={
  post:{}
}
const reducer = (state=defaultState,action)=>{
  if(action.type==='get'){
    console.log("reducer "+action.post.title)
    return  {...state,
      post:action.post
    }
  }
  else
  return state;
}

export default reducer;