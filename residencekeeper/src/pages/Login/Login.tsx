import React, { useState, useEffect } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [keypass, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Effectuez ici votre appel API vers le serveur backend en utilisant fetch ou Axios.
    // Assurez-vous de gérer la réponse de l'API correctement.

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, keypass }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Connexion Success !");
        window.location.href = "/residences";
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
      <h1>Login</h1>
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
      <p className="brand">Residence Keeper®</p>
    </div>
  );
}

export default Login;
