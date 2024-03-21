import { useState } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { login as doLogin } from "../services/user-service";

const Login=()=>{
  const[user,setUser]=useState({
    username:'',
    password:''
  })

  //field changed function
  const fieldChanged=(event)=>{
    setUser({...user,[event.target.name]:event.target.value})
  }

  //login
  const login=(event)=>{
    event.preventDefault();
    console.log("form submitted");
    console.log(user);
    if(user.username.trim()==''){
      toast.error("Username is required!!")
      return;
    }
    if(user.password.trim()==''){
      toast.error("Password is required!!")
      return;
    }

    //submit form on server
    doLogin(user).then(data=>{
      toast.success("User loggedin !")
      window.location="/";
    }).catch((error)=>{
      toast.error("User can't login!")
    })
  }
  return (
    <Base>
      <Container>
        <Row>
          <Col sm={{size:6, offset: 3}}>
            <Card className="shadow-sm">
                <CardHeader>
                  <h3>Login</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={login}>
                      <Label for="title">Username</Label>
                      <Input type="text"id="username" name="username" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                      <br></br>
                      <Label for="title">Password</Label>
                      <Input type="text"id="password" name="password" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                    
                    <Container className="text-center mt-4">
                      <Button type="submit" color="primary">Login</Button>
                    </Container>
                  </Form>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login