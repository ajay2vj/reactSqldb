import axios from "axios"
import { useState } from "react"
import { Link , useHistory } from "react-router-dom"
import  '../style.css';
import  swal from 'sweetalert';
import {Redirect} from "react-router-dom"



const Signin = () =>{
    
    const [Email , setUsername] = useState()
    const [Password , setPassword] = useState()

    const history = useHistory()
    

 

    async function loginUser(credentials) {
        return fetch('http://localhost:53535/api/AdminLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }
       const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          Email,
          Password
        });
        if ('tokenSuccess' in response) {
          swal("Success", response.result, "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            localStorage.setItem('tokenSuccess', response['tokenSuccess']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            history.push('/admin/view')
          });
        } else {
          swal("Failed", response.result, "error");
        }
      }

        if(localStorage.getItem("sid")){
            return( <Redirect to="/student"/> )
            }
        
        else if(localStorage.getItem("user")){
            return( <Redirect to="/admin/view"/> )
            }
            
    return (
      <div className="app">
      <div className="login-form">
        <div className="title">
      <div className="form"  align="center">
            <h1  align="center" >ADMIN LOGIN</h1>
            
            <div className="m">
                <label htmlFor=""className="username">Email</label>
                <input onChange={(event) =>{
                    setUsername(event.target.value)
                }}
                 type="text" className="form-control" placeholder="Enter Email" />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="u_password">Password</label>
                <input onChange={(event) =>{
                    setPassword(event.target.value)
                }}
                 type="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="mb-3" align="center">
                <button className="btn btn-primary " id="si" onClick={(e)=>handleSubmit(e)} >sign in</button>

                

                  
                 </div>
     </div></div></div>   </div>
    )
}


export default Signin 