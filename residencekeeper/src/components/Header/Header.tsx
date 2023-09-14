import React from "react";
import "./Header.css";
interface TitleProps {
  titleText: any;
}

function Titre({ titleText }: TitleProps) {
  return (
    <div className="header">
      <h1>{titleText}</h1>
    </div>
  );
}

export default Titre;
