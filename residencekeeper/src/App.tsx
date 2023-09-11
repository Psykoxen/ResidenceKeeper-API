import { useEffect, useState } from "react";
import AppRouter from "./router/Router";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Residence Keeper";
  }, []);
  return <AppRouter />;
}

export default App;
