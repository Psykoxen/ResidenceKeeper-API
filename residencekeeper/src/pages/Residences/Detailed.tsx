import React, { useEffect, useState } from "react"; // Importez useEffect, useState depuis "react"
import Header from "../../components/Header/Header";
import Residence from "../../types/Residence";
import "./Detailed.css";

function ResidenceDetail() {
  const [residenceData, setResidenceData] = useState<Residence | null>(null); // Initialisez l'état homesData et setLoading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://192.168.0.128:8080/api/home/getresidence", // Assurez-vous que l'URL est correcte
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
              homeId: window.sessionStorage.getItem("currentHome"),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("La requête a échoué.");
        }

        const data: Residence = await response.json();
        setResidenceData(data);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la requête API : ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : residenceData ? (
        <div>
          <Header titleText={residenceData.home.name} />
          <div className="residenceInfo">
            {residenceData.balance.balance < 0 ? (
              <div className="residenceBudget negative">
                <p>Budget</p>
                <p>{residenceData.balance.balance.toFixed(2)}€</p>
              </div>
            ) : (
              <div className="residenceBudget positive">
                <p>Budget</p>
                <p>{residenceData.balance.balance.toFixed(2)}€</p>
              </div>
            )}

            {residenceData.balance.users.map((user) => {
              if (
                user.userId === Number(window.sessionStorage.getItem("userId"))
              ) {
                return (
                  <div
                    key={user.userId}
                    className={
                      user.balance < 0
                        ? "myBudget negative"
                        : "myBudget positive"
                    }
                  >
                    <p>My Balance</p>
                    <p>
                      {user.balance < 0
                        ? user.balance.toFixed(2)
                        : "+" + user.balance.toFixed(2)}
                      €
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <h2>🪙Last expenses</h2>
          <div className="paymentList">
            {residenceData.payments.map((payment) => (
              <div key={payment.id} className="payment">
                <div className="paymentCategory">
                  <p>🏠</p>
                </div>
                <div className="paymentInfo">
                  <p>{payment.name}</p>

                  <p>{payment.date}</p>
                </div>
                {payment.expense === "false" ? (
                  <div className="paymentAmount positive">
                    <p>+{payment.amount.toFixed(2)}€</p>
                  </div>
                ) : (
                  <div className="paymentAmount negative">
                    <p>-{payment.amount.toFixed(2)}€</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Impossible de charger les données de la résidence.</p>
      )}
    </div>
  );
}

export default ResidenceDetail;
