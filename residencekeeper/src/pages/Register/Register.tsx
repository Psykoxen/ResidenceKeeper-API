import React, { useState, useEffect } from "react";
import "./Register.css";
import User from "../../types/User";
import { Link } from "react-router-dom";
import Brand from "../../components/Brand/Brand";

function Register() {
  const [user, setUserData] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [keypass, setPassword] = useState("");
  const [keypassConfirm, setKeypassConfirm] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Effectuez ici votre appel API vers le serveur backend en utilisant fetch ou Axios.
    // Assurez-vous de gérer la réponse de l'API correctement.
    if (email === emailConfirm && keypass === keypassConfirm) {
      try {
        const response = await fetch(
          "http://192.168.0.128:8080/api/user/register",
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ username, email, keypass }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
    }
  };

  return (
    <div className="register">
      <div></div>
      <div className="page-content">
        <h1>Join the team 🤙</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm your email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={keypass}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={keypassConfirm}
            onChange={(e) => setKeypassConfirm(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p className="register-link">
          Already a member ? <Link to="/login">Login</Link>
        </p>
      </div>
      <Brand />
    </div>
  );
}

export default Register;
