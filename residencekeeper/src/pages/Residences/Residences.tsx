import React, { useState, useEffect } from "react";
import "./Residences.css";
import { Link } from "react-router-dom";
import { useResidence } from "./ResidenceProvider";

function Residences() {
  interface Home {
    id: number;
    name: string;
    // Autres propriétés de l'objet Home
  }
  const [homesData, setHomesData] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedHomeId } = useResidence();

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

        const data: Home[] = await response.json();
        setHomesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la requête API : ", error);
      }
    }

    fetchData();
  }, []);

  function openResidence(homeId: number) {
    console.log(homeId);
    setSelectedHomeId(homeId);
  }

  return (
    <div>
      <div className="header">
        <h1>My Residences</h1>
      </div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="residences">
          {homesData.map((home) => (
            <Link
              key={home.id}
              onClick={() => openResidence(home.id)}
              to={`/residences/detail`}
            >
              <div className="ico">
                <p>🏠</p>
              </div>
              <h2>{home.name}</h2>
              <div className="setting">
                <p>●●●</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Residences;
