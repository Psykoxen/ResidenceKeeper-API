import React, { useState, useEffect } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Effectuez ici votre appel API vers le serveur backend en utilisant fetch ou Axios.
    // Assurez-vous de gérer la réponse de l'API correctement.

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // La connexion est réussie, mettez à jour l'état ou redirigez l'utilisateur.
        setMessage("Connexion réussie !");
      } else {
        // La connexion a échoué, affichez un message d'erreur.
        setMessage("La connexion a échoué. Vérifiez vos informations.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
      setMessage("Erreur de réseau : Vérifiez la connexion au serveur.");
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="brand">{message}</p>
    </div>
  );
}

export default Login;
