import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Residences from "../pages/Residences/Residences";
import Detailed from "../pages/Residences/Detailed";
import Register from "../pages/Register/Register";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/residences" element={<Residences />} />
        <Route path="/residences/detail" element={<Detailed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
