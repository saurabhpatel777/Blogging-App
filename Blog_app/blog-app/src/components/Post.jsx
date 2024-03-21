import React from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import {Link} from "react-router-dom";

function Post({post={title:"This is default post titl",content:"default content"}}){
  return(
    <Card className='border-0 shadow-sm mt-3'>
      <CardBody>
        <h3>{post.title}</h3>
        <CardText dangerouslySetInnerHTML={{ __html:post.content.substring(0,60)+"..."}}>
        </CardText>
        <div>
          <Link className="btn btn-secondary" to={'/post/'+post.id}>Read More</Link>
        </div>
      </CardBody>
    </Card>
  )
}
export default Post