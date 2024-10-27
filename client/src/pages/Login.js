import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.jpg"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build exams for today, tomorrow, and beyond."
      desc2="Easy interactive test"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
