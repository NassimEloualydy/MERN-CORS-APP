import React,{useState,useEffect} from 'react'
import Menu from './Menu'
import {API_URL} from '../config/config'
import toastr from 'toastr'
import { useNavigate } from 'react-router-dom'
const Login = () => {
        const [menu,setMenu]=useState(false);
        const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
      const [user,setUser]=useState({
        email:"",
        pw:"",
      })
      const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})

      }
      const login=()=>{
        fetch(`${API_URL}/user/login`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
            
        }).then(res=>res.json()).then(res=>{
            if(res.token){
                localStorage.setItem("user",JSON.stringify(res))
                toastr.success("Log In with success !!","Success",{positionClass:"toast-bottom-right"})
            }
            else if(res.err)
                toastr.warning(res.err,"Warning",{positionClass:"toast-bottom-right"})
            else
                console.log(res)


        }).catch(err=>console.log(err))      }

  return (
    <>
                    <div className={menu?"menu":"hide_menu"}>
              <span onClick={MenuSwitch.bind(this,false)} className="close_menu">
              {/* <ion-icon name="close-outline"></ion-icon> */}
              </span>
              <br />
              <br />
              <Menu/>
              <span className="iconmenu" onClick={MenuSwitch.bind(this,true)}>

<ion-icon name="menu-outline"></ion-icon>
    </span>
        </div>
                <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
            <div className="p-2">
                <h3 className='fw-bolder'>Login</h3>

            </div>
        </div>

    </div>
        <section className="m-3">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 mx-auto">
            <div className="card-body">
              <div className="card-title">
                <h3>Login Form</h3>
              </div>
              <form action="">

                <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email" onChange={handleChange}  value={user.email} className="form-control" />
                </div>

                <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="pw" onChange={handleChange}  value={user.pw} className="form-control" />
                </div>


                <div className="row col-md mt-2">
                  <input type="button" value="Login" onClick={login} className="btn btn-dark" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default Login