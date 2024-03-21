import Base from "../components/Base";
import {Card,CardBody,Form,Input,Label,Container,Button} from "reactstrap";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { updatePost as doUpdatePost, getPost } from "../services/post-srvice";
import {toast} from "react-toastify";
import { Link, useParams } from "react-router-dom";
import categoryContext from "../context/categoryContext";
import { useSelector } from "react-redux/es/exports";

const EditPostPage=()=>{
  const{id}=useParams()
  const editor=useRef(null)
  const [content,setContent]=useState('')
  
  const[post,setPost]=useState([])

  const postObject= useSelector(state=>state.post);
  useEffect(
    ()=>{
      setPost(postObject.post)
      setContent(postObject.post.content)
    },
    []
  )

  //field changed function
  const fieldChanged=(event)=>{console.log("changing")
    setPost({...post,[event.target.name]:event.target.value})
  }

  //get changed content from field
  const contentFiledChanged=(data)=>{
    setPost({...post,'content':data})
  }

  //create post /add blog function
  const updatePost=(event)=>{
    event.preventDefault();
    console.log(post);
    if(post.title.trim()==''){
      toast.error("Title is required!!")
      return;
    }
    if(post.content.trim()==''){
      toast.error("content is required!!")
      return;
    }
    if(post.category_id==''){
      toast.error("select some category")
      return;
    }
    console.log(post);
    //submit form on server
    doUpdatePost(post).then(data=>{
      toast.success("Post update!")
    }).catch((error)=>{
      toast.error("Post is not update!")
    })
  }

  return(
    <Base>
      <div className="wrapper mx-5">
       <Card className="shadow-sm">
        <CardBody>
          <h3>Edit Blog here !</h3>
          <Form onSubmit={updatePost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input type="text"
               id="title" 
               name="title" 
               defaultValue={post.title} 
               className="rounded-0" 
               onChange={fieldChanged}/>
            </div>
            <div className="my-3">
              <Label for="content">Post content</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={contentFiledChanged}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
              type="select"
              id="category"
              placeholder="Select"
              className="rounded-0"
              name="category_id"
              onChange={fieldChanged}
              value={0}
              >
                <option disabled value={0}>--SELECT CATEGORY--</option>
                {
                <categoryContext.Consumer>
                {(categories)=>(
                        categories.map((category)=>(
                          <option value={category.id} key={category.id}>
                            {category.categoryName}
                          </option>
                        ))
                )}
                </categoryContext.Consumer>
                }
              </Input>
            </div>
            <Container className="text-center">
              <Button type="submit" color="primary">Update</Button>
              <Link  className="btn btn-danger ms-3" to={'/post/'+post.id} >Back</Link>
            </Container>
          </Form>
        </CardBody>
       </Card>
    </div>
    </Base>
  )
}

export default EditPostPage