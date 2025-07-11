import React, { useState } from "react";
import Button from "../components/Button";
import loginBg from "../assets/login_bg.jpg";


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

const Card = ({ children }) => {
    const[login,setLogin] = useState(true)
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
            onClick = {()=>setLogin(true)}
          />
          <Button
            bgColor="bg-emerald-500"
            hoverBg="bg-emerald-600"
            textColor="text-white"
            rounded="rounded-2xl"
            text="SignUp"
            onClick= {()=>setLogin(false)}
          />
        </div>

        <form className="flex flex-col space-y-4">
          {login?
          <>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            text = {login?"Login":"SignUp"}
         />
        
          {!login && <p className=" text-center">Already have an account<span onClick={()=>setLogin(true)} className=" text-blue-500 pl-2 cursor-pointer">Login</span></p>}
 
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <Card />
    </div>
  );
};

export default Login;
