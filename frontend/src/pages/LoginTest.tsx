import React, {useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function LoginTest() {

    const history=useNavigate();

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/",{
                user,password
            })
            .then((res: { data: string; })=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:user}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch((e: string)=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setUser(e.target.value) }} placeholder="Username"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>

        </div>
    )
}

export default LoginTest