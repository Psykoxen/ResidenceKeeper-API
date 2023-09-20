import React, { useState, useEffect } from "react";
import "./Residences.css";
import { Link } from "react-router-dom";
import Home from "../../types/Home";
import Header from "../../components/Header/Header";

function Residences() {
  const [homesData, setHomesData] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://192.168.0.128:8080/api/home/gethomesresident",
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
    window.sessionStorage.setItem("currentHome", homeId.toString());
  }

  return (
    <div>
      <Header titleText="My Residences" />
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
