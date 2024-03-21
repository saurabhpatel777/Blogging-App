import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { register as doRegister } from "../services/user-service";

const Register=()=>{
  const[user,setUser]=useState({
    username:'',
    password:'',
    fname:'',
    lname:''
  })

  //field changed function
  const fieldChanged=(event)=>{
    setUser({...user,[event.target.name]:event.target.value})
  }

  //login
  const register=(event)=>{
    event.preventDefault();
    if(user.username.trim()==''){
      toast.error("Username is required!!")
      return;
    }
    if(user.password.trim()==''){
      toast.error("Password is required!!")
      return;
    }
    if(user.fname.trim()==''){
      toast.error("Firstname is required!!")
      return;
    }

    //submit form on server
    doRegister(user).then(data=>{
      toast.success("User registered !")
    }).catch((error)=>{
      toast.error("User registeration unsuccessfull! <try unique username>")
    })
  }
  return (
    <Base>
      <Container>
        <Row>
          <Col sm={{size:6, offset: 3}}>
            <Card className="shadow-sm">
                <CardHeader>
                  <h3>Register</h3>
                </CardHeader>
              <CardBody>
                <Form onSubmit={register}>
                  <div className="my-3">
                    <Label for="title">Username</Label>
                    <Input required type="text"id="username" name="username" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                    <br></br>
                    <Label for="title">Password</Label>
                    <Input required type="text"id="password" name="password" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                    <br></br>
                    <Label for="title">Firstname</Label>
                    <Input required type="text"id="fname" name="fname" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                    <br></br>
                    <Label for="title">Lastname</Label>
                    <Input type="text"id="lname" name="lname" placeholder="Enter here" className="rounded-0" onChange={fieldChanged}/>
                  </div>
                  <Container className="text-center mt-4">
                    <Button type="submit" color="primary" >Register</Button>
                    <Button type="reset" color="danger" className="ms-3">Reset</Button>
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

export default Register