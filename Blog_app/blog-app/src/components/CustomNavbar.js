import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import {NavLink as ReactLink} from "react-router-dom";
import { useState } from 'react';
import userContext from "../context/userContext";
import { logout  as doLogout } from '../services/user-service';
import {toast} from "react-toastify"

const CustomNavbar = ()=>{
  const[isOpen,setIsOpen]=useState(false)
  const logout=()=>{
    doLogout().then(data=>{
      toast.success("User logged out !")
      window.location='/';
    }).catch((error)=>{
      toast.error("User can't logout!")
    })
  }
  return(
    <div>
      <Navbar 
        color="dark"
        dark
        expand="md"
        fxed=""
      >
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/addPost">
                New Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/all">
                All
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu dark right>
                <DropdownItem>
                  <NavLink tag={ReactLink} to="/login">Login</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={ReactLink} to="/register">Register</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <userContext.Consumer>
            {(username)=>(
          (username)?(<NavItem><Button color='secondary' onClick={logout}>Logout</Button></NavItem>):(<NavbarText>Guest</NavbarText>)
          )}
        </userContext.Consumer>
        </Collapse>
      </Navbar>
    </div>
  )
}
export default CustomNavbar;