import React from 'react'
import signupImg from "../assets/signup.jpg"
import Template from '../components/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Join our Community & Create Tests for Free"
      desc1="Build exams for today, tomorrow, and beyond"
      desc2="Easy interactive test"
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
