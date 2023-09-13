import React, { useState, useEffect } from "react";
import "./Residences.css";

function Residences() {
  interface Home {
    id: number;
    name: string;
    // Autres propriétés de l'objet Home
  }
  const [homesData, setHomesData] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/home/gethomesresident",
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ userId: 1 }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("La requête a échoué.");
        }

        const data: Home[] = await response.json(); // Indiquez le type de données ici
        setHomesData(data);
        setLoading(false);
        console.log(data);
        // Indique que les données ont été chargées avec succès
      } catch (error) {
        console.error("Erreur lors de la requête API : ", error);
        // Vous pouvez gérer l'erreur ici si nécessaire
      }
    }

    fetchData(); // Appelez la fonction fetchData au chargement de la page
  }, []); // Les crochets vides [] indiquent que cette fonction doit être exécutée une seule fois au chargement du composant

  return (
    <div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="residences">
          {/* Affichez ici les données récupérées, par exemple : */}
          {homesData.map((home) => (
            <div key={home.id}>{home.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Residences;
