import React, { useState } from "react";
import Button from "../components/Button";
import loginBg from "../assets/login_bg.jpg";
import axios from 'axios'
import ButtonGroup from "../components/ButtonGroup";

const URL = 'http://localhost:8000/api/auth';


const Logo = () => {
  return <img src={loginBg} className="w-full h-50 object-cover rounded-t-2xl" />;
};



const Card = (props) => {

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

{/* {!props.cross && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Warning</strong>
  <span className="block sm:inline"> Enter Email before login</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={props.setCross(true)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>} */}
      <Logo />
      <div className="p-4">
        <h1 className="text-2xl flex justify-center mb-2 mt-2 text-gray-800">Welcome</h1>

        <div className="flex justify-center items-center space-x-4 mb-4">


          <ButtonGroup items={["login","signup"] } togglelogin={props.setLogin} />
          
        </div>

        <form className="flex flex-col space-y-4">
        
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e)=>props.setUserName(e.target.value)}></input>
         
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e)=>props.setPassword(e.target.value)}></input>
          
          {!props.login && <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e)=>props.setConfirmPassword(e.target.value)}></input>}
          <Button
            bgColor="bg-indigo-600"
            hoverBg="bg-indigo-700"
            focusColor="ring-indigo-300"
            textColor="text-white"
            rounded="rounded-lg"
            text = {props.login?"Login":"SignUp"}
            onClick={props.login?props.onLogin:props.onSignup}
         />
        
          {!props.login && <p className=" text-center">Already have an account<span onClick={()=>props.setLogin(true)} className=" text-blue-500 pl-2 cursor-pointer">Login</span></p>}
 
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const[login,setLogin] = useState(true);
  const[userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [cross,setCross] = useState(false);

  const onLogin = async()=>{

  try{
    if(!userName || !password){
      return;
    }

    const response = await axios.post(
      URL+'/login',
      {
        email: userName,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // withCredentials: true, // use this only if backend uses cookies
      }
    
    );
    console.log(response.data);
    
   }

   catch(err) {
      console.log("Error Logging in ",err);
   }

  }
   
  const onSignup = async()=>{

    if(password!==confirmPassword){
      alert("no")
      return
    }
    const res = await axios.post(URL+'/signup',{
      email:userName,
      password:password
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
      console.log(res)
  }
   
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <Card 
      login={login} 
      setLogin={setLogin} 
      userName={userName} 
      setUserName={setUserName} 
      password={password} 
      setPassword={setPassword} 
      setConfirmPassword = {setConfirmPassword}
      onLogin={onLogin}
      onSignup={onSignup}
      setCross = {setCross}
      cross={cross}/>
     




    </div>

  );
};


export default Login;
