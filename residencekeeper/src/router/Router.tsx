import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Residences from "../pages/Residences/Residences";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/residences" element={<Residences />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
