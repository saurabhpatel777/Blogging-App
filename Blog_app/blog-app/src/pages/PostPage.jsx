import Base from "../components/Base"
import {useParams,Link, redirect} from "react-router-dom"
import { Container, Row, Col, Card, CardBody, CardText, Button} from "reactstrap"
import {TfiHeart,TfiMarkerAlt,TfiTrash} from "react-icons/tfi";
import { useEffect, useState} from "react"
import { getPost, updateLikes,deletePost as doDeletePost } from "../services/post-srvice"
import { getCategory } from "../services/category-service"
import { toast} from "react-toastify";
import userContext from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import{actionCreators} from "../state/index"

const PostPage=()=>{
  const{id}=useParams()
  //const [post,setPost]=useState([])
  const [categoryName,setCategoryName]=useState([])
  const [likes,setLikes]=useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(actionCreators.getPost(id))
   
    },[])
    //to print date
    const printDate=(numbers)=>{
      
      return new Date(numbers).toLocaleString()
    }

    const like=()=>{
      console.log("LIKES FUNCTION WORK"+post.id)
      updateLikes(post.id).then((data)=>{
        console.log(data);
        setLikes(data.likes)
        window.location='/post/'+id;
      }).catch(error=>{console.log(error)})
    }

    const error=()=>{
      toast.error("Login to edit or delete blog!");
      
    }

    const deletePost=()=>{
      doDeletePost(post.id).then((data)=>{
        console.log(data);
        window.location = '/all';
      }).catch(error=>{console.log(error)})
    }

    const getLikes=()=>{
      return post.likes;
    } 

    const postObject= useSelector(state=>state.post);
    const post = postObject.post;
  return(
    <Base>
      <Container className="mt-4">
        
        
        <Row>
          <Col md={{
            size:12
          }}>
            <Card className="mt-3">
              <Row>
                <Col md={10}>
                {
                (post)&&(
                  <CardBody>
                    <CardText>Posted on<b>{printDate(post.date)}</b></CardText>
                    <CardText>
                      <span className="text-muted">{post.category_name}</span>
                    </CardText>
                    <CardText>
                      <h3>{post.title}</h3>
                    </CardText>
                    <CardText className="mt-5" dangerouslySetInnerHTML={{__html:post.content}}></CardText>
                    <Button color="danger" onClick={like}><TfiHeart></TfiHeart></Button>
                    &nbsp;&nbsp; <span className="text-muted">{getLikes()}</span>
                  </CardBody>
                )
               }
               </Col>
               <userContext.Consumer>
                {(username)=>(       
                  (username)?(          
                  <Col className="mt-3" md={2} >
                  <Link  className="btn btn-warning btn-lg" to={'/edit/'+post.id}><TfiMarkerAlt></TfiMarkerAlt>Edit</Link>
                  <br></br><br></br>
                  <Button  className="btn" color="danger" onClick={deletePost}><TfiTrash></TfiTrash>Delete</Button>
               </Col>
                  )
                  :
                  (
                    <Col className="mt-3" md={2} >
                  <Button  className="btn" color="warning" onClick={error}><TfiMarkerAlt></TfiMarkerAlt>Edit</Button>
                  <br></br><br></br>
                  <Button  className="btn" color="danger" onClick={error}><TfiTrash></TfiTrash>Delete</Button>
               </Col>
                  )
                )}
               </userContext.Consumer>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  )
}

export default PostPage