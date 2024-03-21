import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import userContext from "../context/userContext";

const Home=()=>{
  return (
    <Base>
         <Container>
         <Card className="shadow-sm">
           <Row>
             <Col className="mt-5" md={3}>
             <CardBody>
              <br></br>
             <Link  className="btn btn-outline-info btn-lg" to={'/addPost'}>Start writing post</Link>
            <br></br><br></br>
            <Link  className="btn btn-outline-secondary btn-lg" to={'/all'}>Read latest posts</Link>
             </CardBody>
             </Col>
             <Col md={9}>
             <img src="https://cdn.makespace.com/blog/wp-content/uploads/2016/01/15165317/nyc-apartment-moving-tip-purge-books-500x375.jpg" alt="no" width="80%"/>
             </Col>
           </Row>
         </Card>
        </Container>
    </Base>
  );
};

export default Home