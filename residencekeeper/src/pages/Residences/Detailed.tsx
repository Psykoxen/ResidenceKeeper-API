// ResidenceDetail.tsx

import React from "react";
import { useResidence } from "./ResidenceProvider"; // Importez useResidence depuis le fichier du contexte
function ResidenceDetail() {
  console.log("ResidenceDetail rendered"); // Vérifiez si ce message est affiché dans la console
  const { selectedHomeId } = useResidence();

  return <div>Le détail de la résidence avec l'ID {selectedHomeId}</div>;
}

export default ResidenceDetail;
