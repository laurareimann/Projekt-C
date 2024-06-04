import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


function Signup() {
   // const history=useNavigate();

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')
    const [passwordConfirm,setPasswordConfirm]=useState("");

    async function submit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/signup",{
                user,password,passwordConfirm
            })
            .then(res=>{
                if(res.data=="exists"){
                    alert("User already exists")
                }
                else if(res.data=="Passwords not matching"){
                    console.log("Passwords didn't match!")
                    alert("Passwords are not matching")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="signup">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setUser(e.target.value) }} placeholder="Username"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="password" onChange={(e) => {setPasswordConfirm(e.target.value)}} placeholder="Confirm password"/>
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup