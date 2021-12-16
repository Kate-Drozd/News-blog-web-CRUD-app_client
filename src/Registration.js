import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Registration(props) {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [regStatus, setRegStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      usernameReg: usernameReg,
      passwordReg: passwordReg,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        setRegStatus(response.data.message);
        
      }
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);              
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
    props.onChangeAdmin(loginStatus);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <h3>Registration</h3>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <input
          type="password"
           placeholder="Password..."
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
        <h3>result:{regStatus}</h3>
      </div>
      <div className="login">
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
         <h3> Hello, {loginStatus?loginStatus:'visitor'} </h3>
      </div> 

     
    </div>
  );
}
