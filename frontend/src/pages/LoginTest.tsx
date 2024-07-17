import React, {useState } from "react"
import axios from "axios"
import {Link } from "react-router-dom"

const setCookie = (name: string,value: unknown,days: number) =>{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()};path=/`

  }

  const getCookie = (name:string) =>{
    const cookies = document.cookie.split("; ").find((row)=> row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
  }


  const currentUser = getCookie("username");



function LoginTest() {

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/login",{
                user,password
            })
            .then((res: { data: string; })=>{
                if(res.data=="exist"){
                    setCookie("username",user,7);
                    console.log("Logged in");
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

            <p>Willkommen {currentUser}</p>

        </div>
    )
}

export default LoginTest