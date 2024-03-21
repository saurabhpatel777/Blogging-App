import Base from "./Base";
import {Card,CardBody,Form,Input,Label,Container,Button} from "reactstrap";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { createPost as doCreatePost } from "../services/post-srvice";
import {toast} from "react-toastify";
import categoryContext from "../context/categoryContext";

const AddPost=()=>{

  const editor=useRef(null)
  const [content,setContent]=useState('')
  
  const[post,setPost]=useState({
    title:'',
    content:'',
    category_id:0
  })

  //field changed function
  const fieldChanged=(event)=>{
    setPost({...post,[event.target.name]:event.target.value})
  }

  //get changed content from field
  const contentFiledChanged=(data)=>{
    setPost({...post,'content':data})
  }

  //create post /add blog function
  const createPost=(event)=>{
    event.preventDefault();
    console.log("form submitted");
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

    //submit form on server
    doCreatePost(post).then(data=>{
      toast.success("Post created!")
    }).catch((error)=>{
      toast.error("Post is not created!")
    })
  }
  return(
    <Base>
      <div className="wrapper mx-5">
       <Card className="shadow-sm">
        <CardBody>
          <h3>What's goind on?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input type="text"id="title" name="title" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
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
              defaultValue={0}
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
              <Button type="submit" color="primary">Create Post</Button>
              <Button type="reset" color="danger" className="ms-2">Reset Content</Button>
            </Container>
          </Form>
        </CardBody>
       </Card>
    </div>
    </Base>
  );
};
export default AddPost;