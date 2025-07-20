import React, { useState } from "react";
import Button from "../components/Button";
import loginBg from "../assets/login_bg.jpg";
import axios from 'axios'


const URL = 'http://localhost:8000/api/auth';

// LoginFields={
//     email,
//     password
// }

// SignupField={

//     name,
//     email,
//     createPassword,
//     confirmPassword,


// }


const Logo = () => {
  return <img src={loginBg} className="w-full h-50 object-cover rounded-t-2xl" />;
};



const Card = (props) => {

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <Logo />
      <div className="p-4">
        <h1 className="text-2xl flex justify-center mb-2 mt-2 text-gray-800">Welcome</h1>

        <div className="flex justify-center items-center space-x-4 mb-4">
          <Button
            bgColor="bg-indigo-600"
            hoverBg="bg-indigo-700"
            textColor="text-white"
            rounded="rounded-2xl"
            text="Login"
            onClick = {()=>props.setLogin(true)}
          />
          <Button
            bgColor="bg-emerald-500"
            hoverBg="bg-emerald-600"
            textColor="text-white"
            rounded="rounded-2xl"
            text="SignUp"
            onClick= {()=>props.setLogin(false)}
          />
        </div>

        <form className="flex flex-col space-y-4">
          {props.login?
          <>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e)=>props.setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e)=>props.setPassword(e.target.value)}
          /> </>:
          <>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Create Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"></input>
              <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        
            </>
          }
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
   }

   catch(err) {
      console.log("Error Logging in ",err);
   }

  }
   
  const onSignup = async()=>{

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
      onLogin={onLogin}
      onSignup={onSignup}/>
    </div>
  );
};


export default Login;
