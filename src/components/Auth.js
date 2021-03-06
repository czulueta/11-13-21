import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from "./context/UserProvider.js"

const initInputs = {username: "", password: ""}

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }
  function handleSignup(e){
    e.preventDefault()
    signup()
  }
  function handleLogin(e){
    e.preventDefault()
    login()
  }
  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return(
    <div>
      {!toggle ?
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Signup"
            errMsg={errMsg} />
          <p onClick={toggleForm}>Already a Member?</p>
        </>
        :
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg} />
          <p onClick={toggleForm}>Not a Member?</p>
        </>
      }
    </div>
  )
}