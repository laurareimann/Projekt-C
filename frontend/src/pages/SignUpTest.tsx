import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


function Signup() {
   // const history=useNavigate();

    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8080/signup",{
                user,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    //history("/home",{state:{id:user}})
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
                <input type="email" onChange={(e) => { setUser(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
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