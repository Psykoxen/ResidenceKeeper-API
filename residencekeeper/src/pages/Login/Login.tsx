import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <div></div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <p className="brand">ResidenceKeeper©</p>
    </div>
  );
}

export default Login;
