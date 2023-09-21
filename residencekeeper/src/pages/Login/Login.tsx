import React, { useState, useEffect } from "react";
import "./Login.css";
import User from "../../types/User";
import { Link } from "react-router-dom";
import Brand from "../../components/Brand/Brand";

function Login() {
  const [user, setUserData] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [keypass, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Effectuez ici votre appel API vers le serveur backend en utilisant fetch ou Axios.
    // Assurez-vous de gérer la réponse de l'API correctement.

    try {
      const response = await fetch("http://192.168.0.128:8080/api/user/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, keypass }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.ok) {
        const data: User = await response.json();
        setUserData(data);
        console.log(data);

        console.log("Connexion Success !");
        window.location.href = "/residences";
        window.sessionStorage.setItem("userId", data.id.toString());
      } else {
        // La connexion a échoué, affichez un message d'erreur.
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
  };

  return (
    <div className="login">
      <div></div>
      <div className="page-content">
        <h1>Login 👋</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={keypass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register" className="login-link">
          Not a member yet ? <span>Register</span>
        </Link>
      </div>
      <Brand />
    </div>
  );
}

export default Login;
