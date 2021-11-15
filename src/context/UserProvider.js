import React, { useState } from "react"
import axios from "axios"
import user from "../../../models/user"

export const UserContext = React.createContext()

export default function UserProvider(props){
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    todos: [],
    errMsg: ""
  }
  const [userState, setUserState] = useState(initState)

  function signup(credentials){
    axios.post("/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token")
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }
  function login(credentials){
    axios.get("/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token")
        localStorage.setItem("user", JSON.stringify(user))
        getUserTodos()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
  }
  function addTodo(newTodo){
    userAxios.get("/api/todo", newTodo)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: [...prevState.todos, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  function getUserTodos(){
    userAxios.get("/api/todo/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }
  function handleAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  return(
    <UserContext.Provider value={{
      ...userState,
      signup,
      login,
      logout,
      addTodo,
      resetAuthErr
    }}>
      {props.children}
    </UserContext.Provider>
  )
}