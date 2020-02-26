import React from 'react';
import {Switch,Redirect,Route,Link} from 'react-router-dom'
import { Typography, Alert, Divider,Card, Input,Form, Icon, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

const { Title, Paragraph, Text } = Typography;
function App(props) {
  const [m,sm]=React.useState('')
  const [l,sl]=React.useState(true)
  const [u,su]=React.useState({
    email:'',
    pass:'',
    repass:''
  })
  const handleSubmit = e => {
    e.preventDefault();
    if(l){
      fetch('http://localhost:5000/auth/login',
      {method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(u)}
      )
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        sm(r.status)
      });
    }else{
      fetch('http://localhost:5000/auth/signup',
      {method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(u)}
      )
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        sm(r.status)
      });
    }
  };
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center',}}>
    
      <Card style={{ width: 400, padding: '30px' }}>
      <Title>{l?'Đăng Nhập':'Đăng Ký'}</Title>
      {m?<Form.Item><Alert message={m} type="error" style={{with:'100%'}} /></Form.Item>:''}
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            value={u.email}
            onChange={(e)=>su({...u,email:e.target.value})}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={u.pass}
            onChange={(e)=>su({...u,pass:e.target.value})}
          />
        </Form.Item>
        {l?'':
         <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={u.repass}
            onChange={(e)=>su({...u,repass:e.target.value})}
          />
        </Form.Item>
        }
        
        
        <Form.Item>
          <Button onClick={handleSubmit} type="primary" size='large' block className="login-form-button">
          {l?'Đăng Nhập':'Đăng Ký'}
          </Button>
          <Button onClick={()=>sl(!l)} type="link" block className="login-form-button">
            {l?'Đăng ký ngay!':'Đăng Nhập'}
          </Button>
        </Form.Item>
        
      </Form>
     </Card>
    <Typography>
    
    </Typography>
    </div>
    
  );
}

export default App;
