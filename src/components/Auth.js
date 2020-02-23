import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    Container,Badge,Link,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row,

  } from 'reactstrap';

const Auth=()=>{
    const []
    const [usr,setUsr]=React.useState(null)
    const [login,setLogin]=React.useState(true)
    let getLogin=(login)=>{
        let data={}
        if(login){
            fetch('http://localhost:5000/auth/login',
            {method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)}
            )
            .then((response) => {
              return response.json();
            })
            .then((myJson) => {
              console.log(myJson);
            });
        }
    }
    return (
        <Container>
            {login?<h1>Login </h1>:<h1>Register </h1>}
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="example@gmail.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="******" />
                </FormGroup>
            {login?'':<FormGroup>
                    <Label for="repassword">Re enter password</Label>
                    <Input type="password" name="repassword" id="repassword" placeholder="******" />
                </FormGroup>
            }
            </Form>
            <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={getLogin}>
                {login?'Login':'Signup'}
            </Button>
            <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                {!login ? (
                    <a href="#login" onClick={()=>{setLogin(!login)}}>
                    Login
                    </a>
                ) : (
                    <a href="#sigup" onClick={()=>{setLogin(!login)}}>
                    Signup
                    </a>
                )}
                </h6>
            </div> 
        </Container>
    )
}

export default Auth