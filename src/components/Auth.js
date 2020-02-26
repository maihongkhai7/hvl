import React from 'react';
import {Link} from 'react-router-dom'

const Auth=({u})=>{
    let login=window.location.pathname=='/login'
    const [email,setEmail]=React.useState('')
    const [pass,setPass]=React.useState('')
    const [repass,setRepass]=React.useState('')
    console.log(u)
    let getLogin=(login)=>{
        let data={
            email:email,
            pass:pass,
            repass:repass
        }
        console.log(email)
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
        <div>
            {login?<h1>Login </h1>:<h1>Register </h1>}
            <form>
                <div>
                    <label for="email">Email</label>
                    <input value={email} onChange={(event)=>{console.log(email);setEmail(event.value)}} type="email" name="email" id="email" placeholder="example@gmail.com" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input value={pass} onChange={(event)=>setPass(event.value)} type="password" name="password" id="password" placeholder="******" />
                </div>
                {login?'':<div>
                    <label for="repassword">Re enter password</label>
                    <input value={repass} onChange={(event)=>setRepass(event.value)} type="password" name="repassword" id="repassword" placeholder="******" />
                </div>}
            </form>
            <button onClick={getLogin}>
                {login?'Login':'Signup'}
            </button>
            <div>
                <h6>or</h6>
                <h6>
                {!login ? (
                    <Link to="/login">
                    Login
                    </Link>
                ) : (
                    <Link to="/sigup">
                    Signup
                    </Link>
                )}
                </h6>
            </div> 
        </div>
    )
}

export default Auth